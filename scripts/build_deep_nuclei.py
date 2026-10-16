"""
build_deep_nuclei.py
====================
Genera las submallas disecables de:
  * Tálamo (9 núcleos por hemisferio: ATN, MD, VA, VL, VPL, VPM, CGL, CGM, Pulvinar)
  * Subtálamo (Núcleo Subtalámico de Luys, Zona Incierta, Sustancia Negra)
  * Tronco encefálico (Bulbo: pirámides, decusación, olivas, surcos pre/retroolivar,
    tubérculos grácil y cuneiforme; Protuberancia: surco basilar;
    Mesencéfalo: pedúnculos cerebrales y colículos superiores/inferiores)

Metodología (honesta respecto a la fuente de datos):
  - El tálamo se toma del atlas Harvard-Oxford (sub-maxprob-thr25-1mm, etiquetas 4 / 15)
    y se particiona en núcleos mediante una teselación de Voronoi ponderada anclada en los
    centroides MNI publicados del atlas talámico (Morel / Krauth). No es una segmentación
    histológica voxel a voxel, pero respeta la topografía real de cada núcleo.
  - STN, zona incierta y sustancia negra se modelan como elipsoides en coordenadas MNI
    (centros y radios según el atlas DISTAL / Morel).
  - Las estructuras del tronco se colocan sobre la superficie real de la máscara de tronco
    de Harvard-Oxford (etiqueta 8), de modo que quedan ancladas a la anatomía existente.

Salidas:
  public/models/deep_nuclei.glb
  src/data/deepNucleiCatalog.json
"""
import os
import sys
import json
import numpy as np
import trimesh
from nilearn import datasets, image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_anatomyka_brain import (  # noqa: E402
    mni_to_three_coords,
    hex_to_rgb,
    extract_smoothed_subcortical_mesh,
)

OUT_GLB = "public/models/deep_nuclei.glb"
OUT_CATALOG = "src/data/deepNucleiCatalog.json"

catalog = []  # lista de dicts {id, name, category, color, group}
meshes = {}


# ---------------------------------------------------------------------------
# Utilidades de malla
# ---------------------------------------------------------------------------
def finalize_mesh(tm, hex_color, name):
    """Colorea y asegura normales coherentes."""
    try:
        trimesh.repair.fix_normals(tm)
    except Exception as e:  # pragma: no cover
        print(f"    aviso: fix_normals falló en {name}: {e}")
    _ = tm.vertex_normals
    rgb = hex_to_rgb(hex_color)
    colors = np.zeros((len(tm.vertices), 4), dtype=np.uint8)
    colors[:, :3] = rgb
    colors[:, 3] = 255
    tm.visual.vertex_colors = colors
    tm.metadata["name"] = name
    return tm


def mni_mesh_to_three(verts_mni, faces):
    """MNI -> espacio Three.js (el cambio de ejes es impropio: invertimos el winding)."""
    verts_three = mni_to_three_coords(np.asarray(verts_mni, float))
    faces_flipped = np.asarray(faces)[:, [0, 2, 1]].copy()
    return trimesh.Trimesh(vertices=verts_three, faces=faces_flipped, process=False)


def ellipsoid(center, radii, hex_color, name, rot_z_deg=0.0, subdivisions=3):
    sph = trimesh.creation.icosphere(subdivisions=subdivisions, radius=1.0)
    v = sph.vertices * np.asarray(radii, float)
    if rot_z_deg:
        a = np.deg2rad(rot_z_deg)
        R = np.array([[np.cos(a), -np.sin(a), 0], [np.sin(a), np.cos(a), 0], [0, 0, 1]])
        v = v @ R.T
    v = v + np.asarray(center, float)
    tm = mni_mesh_to_three(v, sph.faces)
    return finalize_mesh(tm, hex_color, name)


def tube(path, radii, hex_color, name, sections=14):
    path = np.asarray(path, float)
    n = len(path)
    radii = np.broadcast_to(np.asarray(radii, float), (n,)).copy()
    T = np.gradient(path, axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True)
    ang = np.linspace(0, 2 * np.pi, sections, endpoint=False)
    rings = []
    for i in range(n):
        t = T[i]
        ref = np.array([1.0, 0, 0]) if abs(t @ np.array([1.0, 0, 0])) < 0.9 else np.array([0, 1.0, 0])
        u = np.cross(t, ref)
        u /= np.linalg.norm(u)
        w = np.cross(t, u)
        rings.append(path[i] + radii[i] * (np.outer(np.cos(ang), u) + np.outer(np.sin(ang), w)))
    verts = np.vstack(rings)
    faces = []
    for i in range(n - 1):
        for j in range(sections):
            a = i * sections + j
            b = i * sections + (j + 1) % sections
            c = (i + 1) * sections + j
            d = (i + 1) * sections + (j + 1) % sections
            faces += [[a, b, c], [b, d, c]]
    s_c = len(verts)
    verts = np.vstack([verts, path[0], path[-1]])
    e_c = s_c + 1
    last = (n - 1) * sections
    for j in range(sections):
        faces.append([s_c, (j + 1) % sections, j])
        faces.append([e_c, last + j, last + (j + 1) % sections])
    tm = mni_mesh_to_three(verts, np.array(faces))
    return finalize_mesh(tm, hex_color, name)


def crop_and_mesh(mask, affine, hex_color, name):
    """Recorta la máscara a su bounding box (marching cubes mucho más rápido)."""
    idx = np.argwhere(mask)
    lo = np.maximum(idx.min(0) - 3, 0)
    hi = np.minimum(idx.max(0) + 4, mask.shape)
    sub = mask[lo[0]:hi[0], lo[1]:hi[1], lo[2]:hi[2]]
    aff = affine.copy()
    aff[:3, 3] = affine[:3, :3] @ lo + affine[:3, 3]
    return extract_smoothed_subcortical_mesh(sub, aff, hex_color, name)


def register(mesh_id, name, category, color, group, tm):
    meshes[mesh_id] = tm
    catalog.append({"id": mesh_id, "name": name, "category": category, "color": color, "group": group})


# ---------------------------------------------------------------------------
# Datos fuente
# ---------------------------------------------------------------------------
print("Cargando Harvard-Oxford subcortical (1 mm)...")
ho = datasets.fetch_atlas_harvard_oxford("sub-maxprob-thr25-1mm")
img = image.load_img(ho.maps)
data = img.get_fdata()
A = img.affine


def mni_points(mask):
    idx = np.argwhere(mask)
    homo = np.hstack([idx, np.ones((len(idx), 1))])
    return idx, (A @ homo.T).T[:, :3]


# ---------------------------------------------------------------------------
# 1. Núcleos talámicos (Voronoi ponderado sobre el tálamo Harvard-Oxford)
# ---------------------------------------------------------------------------
# (id, nombre ES, color, centroide MNI hemisferio izquierdo, radio de ponderación mm)
THALAMIC_NUCLEI = [
    ("Thal_ATN", "Núcleo Anterior (ATN)", "#ff6b6b", (-5, -6, 11), 3.5),
    ("Thal_MD", "Núcleo Mediodorsal (MD)", "#ffa94d", (-6, -18, 8), 6.0),
    ("Thal_VA", "Núcleo Ventral Anterior (VA)", "#ffd43b", (-10, -8, 6), 4.5),
    ("Thal_VL", "Núcleo Ventral Lateral (VL)", "#a9e34b", (-14, -15, 4), 5.5),
    ("Thal_VPL", "Núcleo Ventral Posterolateral (VPL)", "#38d9a9", (-17, -24, 2), 5.0),
    ("Thal_VPM", "Núcleo Ventral Posteromedial (VPM)", "#22b8cf", (-9, -24, 0), 3.5),
    ("Thal_LGN", "Cuerpo Geniculado Lateral (CGL, vía visual)", "#4dabf7", (-22, -28, -3), 3.5),
    ("Thal_MGN", "Cuerpo Geniculado Medial (CGM, vía auditiva)", "#9775fa", (-14, -29, -3), 3.0),
    ("Thal_Pulvinar", "Pulvinar (posterior)", "#f783ac", (-14, -32, 7), 7.0),
]

for label, side, side_name, sign in [(4, "L", "Izq", -1), (15, "R", "Der", +1)]:
    mask = data == label
    idx, mni = mni_points(mask)
    centroids = np.array([[sign * abs(c[0]), c[1], c[2]] for _, _, _, c, _ in THALAMIC_NUCLEI], float)
    radii = np.array([r for *_, r in THALAMIC_NUCLEI], float)
    # Voronoi aditivamente ponderado: argmin(d_i - r_i)
    d = np.linalg.norm(mni[:, None, :] - centroids[None, :, :], axis=2) - radii[None, :]
    owner = d.argmin(axis=1)
    for k, (nid, nname, color, _, _) in enumerate(THALAMIC_NUCLEI):
        sel = idx[owner == k]
        nuc_mask = np.zeros(mask.shape, bool)
        nuc_mask[sel[:, 0], sel[:, 1], sel[:, 2]] = True
        print(f"  {nid}_{side}: {len(sel)} vóxeles")
        tm = crop_and_mesh(nuc_mask, A, color, f"{nid}_{side}")
        register(
            f"{nid}_{side}",
            f"Tálamo: {nname} ({side_name})",
            "Tálamo",
            color,
            "thalamus",
            tm,
        )

# ---------------------------------------------------------------------------
# 2. Subtálamo: STN, Zona Incierta, Sustancia Negra  (elipsoides MNI)
# ---------------------------------------------------------------------------
SUBTHALAMIC = [
    # id, nombre, color, centro (x>0), radios, rot_z (° en plano axial)
    ("STN", "Núcleo Subtalámico de Luys (STN)", "#ff9f1c", (10.5, -13.5, -4.5), (5.2, 3.0, 2.2), 35),
    ("ZI", "Zona Incierta (ZI)", "#e5989b", (13.5, -13.0, 0.0), (6.0, 1.6, 1.1), 20),
    ("SN", "Sustancia Negra (pars compacta y reticulata)", "#4a3550", (10.0, -17.5, -11.5), (7.0, 3.4, 1.7), 20),
]
for sid, sname, color, c, r, rot in SUBTHALAMIC:
    for side, sign, side_name in [("L", -1, "Izq"), ("R", +1, "Der")]:
        center = (sign * c[0], c[1], c[2])
        rz = -rot * sign  # espejo
        tm = ellipsoid(center, r, color, f"{sid}_{side}", rot_z_deg=rz)
        register(f"{sid}_{side}", f"Subtálamo: {sname} ({side_name})", "Subtálamo", color, "subthalamus", tm)

# ---------------------------------------------------------------------------
# 3. Tronco encefálico anclado a la superficie de la máscara HO (etiqueta 8)
# ---------------------------------------------------------------------------
_, stem = mni_points(data == 8)


def surf_y(x, z, side):
    """Superficie anterior (max y) o posterior (min y) del tronco en (x, z)."""
    for tol in (1.5, 2.5, 4.0):
        sel = stem[(np.abs(stem[:, 0] - x) <= tol) & (np.abs(stem[:, 2] - z) <= tol)]
        if len(sel):
            return sel[:, 1].max() if side == "ant" else sel[:, 1].min()
    sel = stem[np.abs(stem[:, 2] - z) <= 4]
    return sel[:, 1].max() if side == "ant" else sel[:, 1].min()


def zline(x_fn, z0, z1, n, y_fn):
    zs = np.linspace(z0, z1, n)
    return np.array([[x_fn(z), y_fn(z), z] for z in zs])


# ---- 3a. BULBO RAQUÍDEO (z < -40 MNI) -------------------------------------
print("Modelando bulbo raquídeo...")
for side, sign, sname in [("L", -1, "Izq"), ("R", +1, "Der")]:
    # Pirámides bulbares: cordones anteriores convergiendo hacia la decusación
    path = zline(
        lambda z, s=sign: s * np.interp(z, [-42, -66], [4.2, 1.4]),
        -41, -66, 14,
        lambda z, s=sign: surf_y(s * np.interp(z, [-42, -66], [4.2, 1.4]), z, "ant") - 2.2,
    )
    register(f"Medulla_Pyramid_{side}", f"Bulbo: Pirámide Bulbar ({sname}, haz corticoespinal)", "Bulbo Raquídeo",
             "#ecc9c4", "medulla", tube(path, 2.3, "#ecc9c4", f"Medulla_Pyramid_{side}"))

    # Oliva bulbar (núcleo olivar inferior)
    ox = sign * 8.0
    oz = -49.0
    oy = surf_y(ox, oz, "ant") - 3.2
    register(f"Medulla_Olive_{side}", f"Bulbo: Oliva Bulbar ({sname}, núcleo olivar inferior)", "Bulbo Raquídeo",
             "#d9a3a0", "medulla", ellipsoid((ox, oy, oz), (3.4, 4.2, 7.5), "#d9a3a0", f"Medulla_Olive_{side}"))

    # Surco preolivar (entre pirámide y oliva): emergencia del XII
    pre = zline(lambda z, s=sign: s * 5.6, -42, -57, 8,
                lambda z, s=sign: surf_y(s * 5.6, z, "ant") - 0.6)
    register(f"Medulla_PreolivarGroove_{side}", f"Bulbo: Surco Preolivar ({sname}, emergencia del XII)",
             "Bulbo Raquídeo", "#3a2430", "medulla", tube(pre, 0.55, "#3a2430", f"Medulla_PreolivarGroove_{side}"))

    # Surco retroolivar: emergencia de IX, X y XI
    retro = zline(lambda z, s=sign: s * 11.0, -42, -57, 8,
                  lambda z, s=sign: surf_y(s * 11.0, z, "ant") - 4.5)
    register(f"Medulla_RetroolivarGroove_{side}", f"Bulbo: Surco Retroolivar ({sname}, emergencia de IX, X y XI)",
             "Bulbo Raquídeo", "#3a2430", "medulla", tube(retro, 0.55, "#3a2430", f"Medulla_RetroolivarGroove_{side}"))

    # Tubérculos grácil (medial) y cuneiforme (lateral) en la cara posterior
    gx, gz = sign * 2.6, -58.0
    gy = surf_y(gx, gz, "post") + 1.0
    register(f"Medulla_Gracile_{side}", f"Bulbo: Tubérculo Grácil ({sname}, núcleo de Goll)", "Bulbo Raquídeo",
             "#c9b0d8", "medulla", ellipsoid((gx, gy, gz), (2.0, 2.0, 4.2), "#c9b0d8", f"Medulla_Gracile_{side}"))
    cx, cz = sign * 6.4, -55.0
    cy = surf_y(cx, cz, "post") + 1.0
    register(f"Medulla_Cuneate_{side}", f"Bulbo: Tubérculo Cuneiforme ({sname}, núcleo de Burdach)", "Bulbo Raquídeo",
             "#b79ad0", "medulla", ellipsoid((cx, cy, cz), (2.5, 2.1, 4.6), "#b79ad0", f"Medulla_Cuneate_{side}"))

# Decusación piramidal (cruce de los haces corticoespinales)
for side, sign in [("a", +1), ("b", -1)]:
    path = np.array([
        [sign * 3.8, surf_y(sign * 3.8, -60, "ant") - 2.6, -60],
        [sign * 2.0, surf_y(0, -63, "ant") - 3.6, -63],
        [0.0, surf_y(0, -65, "ant") - 4.4, -65],
        [-sign * 2.0, surf_y(0, -67, "ant") - 5.0, -67],
        [-sign * 3.0, surf_y(0, -69, "ant") - 5.4, -69],
    ])
    tm = tube(path, 1.3, "#f3d6cf", f"Medulla_Decussation_{side}")
    register(f"Medulla_Decussation_{side}", "Bulbo: Decusación Piramidal Motora", "Bulbo Raquídeo",
             "#f3d6cf", "medulla", tm)

# ---- 3b. PROTUBERANCIA: surco basilar --------------------------------------
print("Modelando protuberancia...")
basil = zline(lambda z: 0.0, -23, -40, 12, lambda z: surf_y(0, z, "ant") - 0.4)
register("Pons_BasilarGroove", "Protuberancia: Surco Basilar (arteria basilar)", "Protuberancia", "#8b1a1a",
         "pons", tube(basil, 1.5, "#8b1a1a", "Pons_BasilarGroove"))

# ---- 3c. MESENCÉFALO: pedúnculos cerebrales y colículos -------------------
print("Modelando mesencéfalo...")
for side, sign, sname in [("L", -1, "Izq"), ("R", +1, "Der")]:
    ped = zline(lambda z, s=sign: s * 8.5, -4, -20, 10,
                lambda z, s=sign: surf_y(s * 8.5, z, "ant") - 3.4)
    register(f"Midbrain_Peduncle_{side}", f"Mesencéfalo: Pedúnculo Cerebral ({sname}, pie peduncular)",
             "Mesencéfalo", "#e5b3ba", "midbrain", tube(ped, 3.6, "#e5b3ba", f"Midbrain_Peduncle_{side}"))

    scx, scz = sign * 4.2, -3.0
    scy = surf_y(scx, scz, "post") + 1.6
    register(f"Midbrain_SC_{side}", f"Mesencéfalo: Colículo Superior ({sname}, reflejo visual)", "Mesencéfalo",
             "#c9a2d0", "midbrain", ellipsoid((scx, scy, scz), (3.3, 3.2, 2.7), "#c9a2d0", f"Midbrain_SC_{side}"))

    icx, icz = sign * 4.8, -10.0
    icy = surf_y(icx, icz, "post") + 1.6
    register(f"Midbrain_IC_{side}", f"Mesencéfalo: Colículo Inferior ({sname}, vía auditiva)", "Mesencéfalo",
             "#a98bc2", "midbrain", ellipsoid((icx, icy, icz), (3.6, 3.3, 3.0), "#a98bc2", f"Midbrain_IC_{side}"))

# ---------------------------------------------------------------------------
# Exportación
# ---------------------------------------------------------------------------
os.makedirs(os.path.dirname(OUT_GLB), exist_ok=True)
scene = trimesh.Scene()
for mid, tm in meshes.items():
    scene.add_geometry(tm, node_name=mid, geom_name=mid)
glb = scene.export(file_type="glb")
with open(OUT_GLB, "wb") as f:
    f.write(glb)
with open(OUT_CATALOG, "w", encoding="utf-8") as f:
    json.dump(catalog, f, ensure_ascii=False, indent=1)
print(f"\nOK  {len(meshes)} piezas -> {OUT_GLB} ({len(glb)/1024/1024:.2f} MB)")
print(f"Catálogo -> {OUT_CATALOG}")
