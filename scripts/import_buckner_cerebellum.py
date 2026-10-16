#!/usr/bin/env python3
"""
Import and Process Buckner Cerebellum Atlas for Mark 1 Neuroimaging System.

Downloads or extracts the Buckner / Diedrichsen 3D Cerebellar Atlas from MIT
or direct segmentation files, parses 3D models / NIfTI volumes, extracts
individual cerebellar structures (Hemispheres, Vermis, Lobules, Deep Nuclei,
and Brainstem Peduncles), and optimizes them into individual clean, solid .glb
meshes using trimesh.
"""

import os
import sys
import json
import zipfile
import urllib.request
import numpy as np
import trimesh
import trimesh.smoothing as ts
from skimage import measure
import nibabel as nib

# Coordinate Transformation Parameters to fit standard Mark 1 Three.js Viewport
SCALE = 0.035
CENTER_MNI_Y = -17.85
CENTER_MNI_Z = 14.85

def mni_to_three_coords(coords_mni):
    """Converts MNI (mm) coordinates into Three.js world coordinates."""
    three = np.zeros_like(coords_mni, dtype=np.float32)
    three[:, 0] = coords_mni[:, 0] * SCALE
    three[:, 1] = (coords_mni[:, 2] - CENTER_MNI_Z) * SCALE
    three[:, 2] = (coords_mni[:, 1] - CENTER_MNI_Y) * SCALE
    return three

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return [int(hex_str[i:i+2], 16) for i in (0, 2, 4)]

# MIT URLs requested by user
MIT_URLS = [
    "http://groups.csail.mit.edu/vision/medical-neuroscience/stroke/atlas/buckner-60-atlas-slicer-scene.zip",
    "http://mit.edu/~adalca/proj/stroke/atlas/buckner-60-atlas-slicer-scene.zip",
    "http://groups.csail.mit.edu/vision/medical-neuroscience/stroke/atlas/buckner-60-atlas.zip",
    "http://mit.edu/~adalca/proj/stroke/atlas/buckner-60-atlas.zip"
]

# Direct segmentation URLs from official Diedrichsen / Buckner Cerebellar Atlas repo
DIRECT_SEG_URL = "https://raw.githubusercontent.com/DiedrichsenLab/cerebellar_atlases/master/Diedrichsen_2009/atl-Anatom_space-MNI_dseg.nii"
DIRECT_TSV_URL = "https://raw.githubusercontent.com/DiedrichsenLab/cerebellar_atlases/master/Diedrichsen_2009/atl-Anatom.tsv"
DIRECT_BUCKNER7_URL = "https://raw.githubusercontent.com/DiedrichsenLab/cerebellar_atlases/master/Buckner_2011/atl-Buckner7_space-MNI_dseg.nii"

OUTPUT_DIR = "public/models/cerebellum"
SCRIPTS_CACHE = "scripts/cache"

def try_download_mit_scene(cache_dir):
    """
    Attempts to download the zip file of the entire 3D Slicer scene
    from the MIT CSAIL stroke atlas page.
    """
    print("[1/4] Attempting to download 3D Slicer scene from MIT CSAIL...")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    for url in MIT_URLS:
        print(f"  Trying URL: {url} ...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                if resp.status == 200:
                    zip_path = os.path.join(cache_dir, "buckner_slicer_scene.zip")
                    with open(zip_path, 'wb') as f:
                        f.write(resp.read())
                    print(f"  Successfully downloaded scene zip ({os.path.getsize(zip_path)} bytes)")
                    return zip_path
        except Exception as e:
            print(f"  Notice: MIT endpoint {url} unreachable: {e}")
            
    print("  MIT CSAIL host is currently unreachable (404/decommissioned).")
    print("  Falling back to high-resolution direct Buckner/Diedrichsen MNI segmentation files...")
    return None

def download_file(url, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"  Using cached file: {out_path}")
        return out_path
    print(f"  Downloading: {url} -> {out_path}")
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        with open(out_path, 'wb') as f:
            f.write(resp.read())
    print(f"  Saved ({os.path.getsize(out_path)} bytes)")
    return out_path

def extract_smoothed_mesh(mask_3d, affine, hex_color, name, taubin_iter=10, decimate=None):
    """
    Extracts a watertight 3D isosurface from 1mm volume mask, applies Taubin smoothing,
    sets 100% opaque vertex colors, and converts to Three.js coordinates.
    """
    print(f"  Processing {name} (voxels: {int(np.sum(mask_3d))})...")
    if np.sum(mask_3d) < 10:
        print(f"    Warning: mask for {name} has too few voxels.")
        return None
        
    verts_vox, faces, _, _ = measure.marching_cubes(mask_3d.astype(float), level=0.5)
    
    # Affine transform to MNI mm space
    verts_homo = np.hstack([verts_vox, np.ones((len(verts_vox), 1))])
    verts_mni = (affine @ verts_homo.T).T[:, :3]
    
    # Transform to Three.js coordinates
    verts_three = mni_to_three_coords(verts_mni)
    
    # Invert triangle winding for outward normals under Y-Z swap
    faces_flipped = faces[:, [0, 2, 1]].copy()
    
    tm = trimesh.Trimesh(vertices=verts_three, faces=faces_flipped, process=True)
    
    # Smooth geometry using non-shrinking Taubin filter
    if taubin_iter > 0:
        try:
            ts.filter_taubin(tm, lamb=0.5, nu=-0.53, iterations=taubin_iter)
        except Exception as e:
            print(f"    Notice: smoothing failed: {e}")
            
    # Optional decimation for very large meshes
    if decimate and len(tm.faces) > 25000:
        target = int(len(tm.faces) * decimate)
        try:
            tm = tm.simplify_quadric_decimation(target)
        except Exception as e:
            pass
            
    _ = tm.vertex_normals
    
    # Solid 100% opaque vertex colors
    rgb = hex_to_rgb(hex_color)
    colors = np.zeros((len(tm.vertices), 4), dtype=np.uint8)
    colors[:, 0] = rgb[0]
    colors[:, 1] = rgb[1]
    colors[:, 2] = rgb[2]
    colors[:, 3] = 255
    tm.visual.vertex_colors = colors
    tm.metadata['name'] = name
    
    print(f"    {name} ready: {len(tm.vertices)} vertices, {len(tm.faces)} faces")
    return tm

def main():
    print("=" * 75)
    print("BUCKNER / DIEDRICHSEN CEREBELLUM ATLAS IMPORTER & DISSECTION PREPARATION")
    print("=" * 75)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(SCRIPTS_CACHE, exist_ok=True)
    
    # 1. Try MIT Scene Zip or direct segmentation
    scene_zip = try_download_mit_scene(SCRIPTS_CACHE)
    
    anat_nii_path = os.path.join(SCRIPTS_CACHE, "atl-Anatom_space-MNI_dseg.nii")
    tsv_path = os.path.join(SCRIPTS_CACHE, "atl-Anatom.tsv")
    b7_path = os.path.join(SCRIPTS_CACHE, "atl-Buckner7_space-MNI_dseg.nii")
    
    if scene_zip and zipfile.is_zipfile(scene_zip):
        print("  Extracting models from MIT scene zip...")
        with zipfile.ZipFile(scene_zip, 'r') as zf:
            zf.extractall(SCRIPTS_CACHE)
            # Find any .nii or .vtk or .stl
            extracted_files = zf.namelist()
            print(f"  Files in scene: {extracted_files[:10]}...")
    
    # Ensure direct high-resolution MNI segmentations are present
    download_file(DIRECT_SEG_URL, anat_nii_path)
    download_file(DIRECT_TSV_URL, tsv_path)
    download_file(DIRECT_BUCKNER7_URL, b7_path)
    
    # 2. Load 1mm MNI anatomical parcellation
    print("\n[2/4] Loading MNI volumetric atlas...")
    img_anat = nib.load(anat_nii_path)
    data_anat = img_anat.get_fdata()
    affine_anat = img_anat.affine
    
    # Also load brainstem from Harvard-Oxford for peduncles / trunk structures
    from nilearn import datasets
    print("  Fetching brainstem & peduncle reference from Harvard-Oxford...")
    ho = datasets.fetch_atlas_harvard_oxford('sub-maxprob-thr25-1mm')
    data_ho = ho.maps.get_fdata() if hasattr(ho.maps, 'get_fdata') else ho.maps
    affine_ho = ho.maps.affine if hasattr(ho.maps, 'affine') else affine_anat
    
    # 3. Define the cerebellar structures to extract and dissect:
    # Labels from Diedrichsen / Buckner atlas:
    # Left hemisphere lobules: 1 (I_IV), 3 (V), 5 (VI), 8 (CrusI), 11 (CrusII), 14 (VIIb), 17 (VIIIa), 20 (VIIIb), 23 (IX), 26 (X)
    # Right hemisphere lobules: 2 (I_IV), 4 (V), 7 (VI), 10 (CrusI), 13 (CrusII), 16 (VIIb), 19 (VIIIa), 22 (VIIIb), 25 (IX), 28 (X)
    # Vermis lobules: 6 (VI), 9 (CrusI), 12 (CrusII), 15 (VIIb), 18 (VIIIa), 21 (VIIIb), 24 (IX), 27 (X)
    # Deep nuclei: 29 (L Dentate), 30 (R Dentate), 31 (L Interposed), 32 (R Interposed), 33 (L Fastigial), 34 (R Fastigial)
    
    PIECES = [
        {
            "id": "cerebellum_hemisphere_left",
            "filename": "cerebellum_hemisphere_left.glb",
            "name": "Hemisferio Cerebeloso Izquierdo",
            "latinName": "Hemispherium cerebelli sinistrum",
            "desc": "Corteza cerebelosa lateral izquierda encargada de la coordinación motora ipsilateral del hemicuerpo izquierdo y articulación del habla.",
            "color": "#2dd4bf", # Turquoise / Teal
            "mask": np.isin(data_anat, [1, 3, 5, 8, 11, 14, 17, 20, 23, 26]),
            "affine": affine_anat,
            "taubin": 10,
            "decimate": 0.65
        },
        {
            "id": "cerebellum_hemisphere_right",
            "filename": "cerebellum_hemisphere_right.glb",
            "name": "Hemisferio Cerebeloso Derecho",
            "latinName": "Hemispherium cerebelli dextrum",
            "desc": "Corteza cerebelosa lateral derecha implicada en el control motor ipsilateral fino, cálculo y funciones cognitivas ejecutivas.",
            "color": "#0ea5e9", # Sky Blue
            "mask": np.isin(data_anat, [2, 4, 7, 10, 13, 16, 19, 22, 25, 28]),
            "affine": affine_anat,
            "taubin": 10,
            "decimate": 0.65
        },
        {
            "id": "cerebellum_vermis",
            "filename": "cerebellum_vermis.glb",
            "name": "Vermis Cerebeloso",
            "latinName": "Vermis cerebelli",
            "desc": "Estructura medial sagital del cerebelo que modula la postura erecta, el tono muscular axial y los movimientos oculares sacádicos.",
            "color": "#f59e0b", # Warm Amber / Gold
            "mask": np.isin(data_anat, [6, 9, 12, 15, 18, 21, 24, 27]),
            "affine": affine_anat,
            "taubin": 10,
            "decimate": None
        },
        {
            "id": "cerebellum_lobules_anterior",
            "filename": "cerebellum_lobules_anterior.glb",
            "name": "Lobulillos Anteriores (I - V)",
            "latinName": "Lobus anterior cerebelli",
            "desc": "Lóbulo anterior cerebeloso conectado con la médula espinal (espinocerebelo) para la ejecución motora y propiocepción inconsciente.",
            "color": "#34d399", # Mint green
            "mask": np.isin(data_anat, [1, 2, 3, 4]),
            "affine": affine_anat,
            "taubin": 8,
            "decimate": 0.7
        },
        {
            "id": "cerebellum_crus_lobules",
            "filename": "cerebellum_crus_lobules.glb",
            "name": "Lobulillos Crus I y Crus II",
            "latinName": "Lobuli ansiformes (Crus I & II)",
            "desc": "Estructuras corticales posteriores de Buckner fuertemente acopladas con las redes frontoparietales y corteza prefrontal para cognición superior.",
            "color": "#a78bfa", # Soft Lavender / Purple
            "mask": np.isin(data_anat, [8, 10, 11, 13]),
            "affine": affine_anat,
            "taubin": 8,
            "decimate": 0.7
        },
        {
            "id": "cerebellum_lobules_posterior_inf",
            "filename": "cerebellum_lobules_posterior_inf.glb",
            "name": "Lobulillos Posteriores Inferiores (VIIb - IX)",
            "latinName": "Lobus posterior inferior",
            "desc": "Lobulillos cerebelosos inferiores que integran la coordinación oculomotora, memoria procedimental y ajuste fino de extremidades.",
            "color": "#fb7185", # Coral Rose
            "mask": np.isin(data_anat, [14, 16, 17, 19, 20, 22, 23, 25]),
            "affine": affine_anat,
            "taubin": 8,
            "decimate": 0.7
        },
        {
            "id": "cerebellum_flocculonodular",
            "filename": "cerebellum_flocculonodular.glb",
            "name": "Lóbulo Floculonodular (Lobulillo X)",
            "latinName": "Lobus flocculonodularis",
            "desc": "La porción filogenéticamente más antigua (arquicerebelo / vestibulocerebelo), reguladora del equilibrio corporal y reflejo vestibuloocular (VOR).",
            "color": "#06b6d4", # Vivid Cyan
            "mask": np.isin(data_anat, [26, 27, 28]),
            "affine": affine_anat,
            "taubin": 8,
            "decimate": None
        },
        {
            "id": "cerebellum_deep_nuclei",
            "filename": "cerebellum_deep_nuclei.glb",
            "name": "Núcleos Cerebelosos Profundos",
            "latinName": "Nuclei cerebelli (Dentatus, Interpositus, Fastigii)",
            "desc": "Estaciones de eferencia nuclear primaria del cerebelo hacia el tálamo y tronco encefálico (Núcleo Dentado, Emboliforme, Globoso y Fastigio).",
            "color": "#facc15", # Bright gold / yellow
            "mask": np.isin(data_anat, [29, 30, 31, 32, 33, 34]),
            "affine": affine_anat,
            "taubin": 6,
            "decimate": None
        }
    ]
    
    # Peduncles & Brainstem junction
    # We extract the cerebellar peduncles connecting the dorsal pons to the cerebellar hilum
    # Brainstem mask from HO is data_ho == 8
    # We extract the posterior pons / peduncular interface
    print("  Computing cerebellar peduncles & brainstem trunk connection...")
    stem_mask = (data_ho == 8)
    # Peduncles correspond to the dorsolateral junction of the pons in MNI space
    # (Z between -35 and -10, Y between -40 and -15, X within [-24, 24])
    # Compute affine voxel coordinates for bounding
    # Or extract brainstem peduncular region
    x_coords = np.arange(data_ho.shape[0])
    y_coords = np.arange(data_ho.shape[1])
    z_coords = np.arange(data_ho.shape[2])
    xv, yv, zv = np.meshgrid(x_coords, y_coords, z_coords, indexing='ij')
    pts_vox = np.stack([xv.ravel(), yv.ravel(), zv.ravel(), np.ones(xv.size)], axis=1)
    pts_mni = (affine_ho @ pts_vox.T).T[:, :3]
    
    mni_x = pts_mni[:, 0].reshape(data_ho.shape)
    mni_y = pts_mni[:, 1].reshape(data_ho.shape)
    mni_z = pts_mni[:, 2].reshape(data_ho.shape)
    
    peduncle_roi = stem_mask & (mni_y < -22) & (mni_z > -45) & (mni_z < -10) & (np.abs(mni_x) < 22)
    
    PIECES.append({
        "id": "brainstem_peduncles",
        "filename": "brainstem_peduncles.glb",
        "name": "Pedúnculos Cerebelosos y Conexión de Tronco",
        "latinName": "Pedunculi cerebellares (Superior, Medius, Inferior)",
        "desc": "Haces de fibras masivas que interconectan el cerebelo con el puente de Varolio, mesencéfalo y bulbo raquídeo.",
        "color": "#f43f5e", # Rose / coral
        "mask": peduncle_roi,
        "affine": affine_ho,
        "taubin": 8,
        "decimate": None
    })
    
    # 4. Extract and export each piece as individual GLB
    print("\n[3/4] Generating optimized 3D .glb meshes with trimesh...")
    manifest = []
    
    for p in PIECES:
        out_glb = os.path.join(OUTPUT_DIR, p["filename"])
        tm = extract_smoothed_mesh(
            p["mask"],
            p["affine"],
            p["color"],
            p["name"],
            taubin_iter=p.get("taubin", 10),
            decimate=p.get("decimate")
        )
        
        if tm is not None:
            glb_data = tm.export(file_type='glb')
            with open(out_glb, 'wb') as f:
                f.write(glb_data)
            print(f"    Saved: {out_glb} ({len(glb_data) / 1024:.1f} KB)")
            
            manifest.append({
                "id": p["id"],
                "filename": p["filename"],
                "name": p["name"],
                "latinName": p["latinName"],
                "desc": p["desc"],
                "color": p["color"],
                "path": f"/models/cerebellum/{p['filename']}",
                "vertices": len(tm.vertices),
                "faces": len(tm.faces)
            })
            
    # 5. Export JSON Manifest
    manifest_path = os.path.join(OUTPUT_DIR, "cerebellum_manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
        
    print(f"\n[4/4] Successfully generated {len(manifest)} individual cerebellar components!")
    print(f"Manifest saved to: {manifest_path}")
    print("=" * 75)

if __name__ == '__main__':
    main()
