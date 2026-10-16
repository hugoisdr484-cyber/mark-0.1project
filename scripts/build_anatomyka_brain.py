import os
import json
import numpy as np
from nilearn import datasets, surface, image
from skimage import measure
import trimesh
import trimesh.smoothing as ts
from collections import Counter

# MNI stereotaxic alignment scale and offsets
SCALE = 0.024
CENTER_MNI_Y = -18.0
CENTER_MNI_Z = 12.0

def mni_to_three_coords(coords_mni):
    """
    Transforms standard MNI-152 (X=Right, Y=Anterior, Z=Superior)
    to Three.js coordinate space (X=Right, Y=Superior, Z=-Anterior).
    """
    coords_three = np.zeros_like(coords_mni, dtype=float)
    coords_three[:, 0] = coords_mni[:, 0] * SCALE
    coords_three[:, 1] = (coords_mni[:, 2] - CENTER_MNI_Z) * SCALE
    coords_three[:, 2] = (coords_mni[:, 1] - CENTER_MNI_Y) * SCALE
    return coords_three

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return [int(hex_str[i:i+2], 16) for i in (0, 2, 4)]

# Complete Destrieux Gyral Classification
GYRUS_DEFINITIONS = {
    'Cortex_Precentral': {
        'name': 'Giro Precentral (Corteza Motora Primaria - M1)',
        'labels': ['G_precentral', 'S_precentral-inf-part', 'S_precentral-sup-part'],
        'color': '#f28b82',
        'category': 'Corteza Motora'
    },
    'Cortex_Postcentral': {
        'name': 'Giro Postcentral (Corteza Somatosensorial - S1)',
        'labels': ['G_postcentral', 'S_postcentral', 'S_central', 'G_and_S_subcentral'],
        'color': '#8ab4f8',
        'category': 'Corteza Somatosensorial'
    },
    'Cortex_Frontal_Sup': {
        'name': 'Giro Frontal Superior (Área Motora Suplementaria)',
        'labels': ['G_front_sup', 'S_front_sup', 'G_and_S_paracentral'],
        'color': '#e9d5ff',
        'category': 'Lóbulo Frontal'
    },
    'Cortex_Frontal_Mid': {
        'name': 'Giro Frontal Medio (Corteza Prefrontal DLPFC)',
        'labels': ['G_front_middle', 'S_front_middle', 'S_front_inf'],
        'color': '#fed7aa',
        'category': 'Lóbulo Frontal'
    },
    'Cortex_Broca': {
        'name': 'Área de Broca (Giro Frontal Inferior - Pars Opercularis/Triangularis)',
        'labels': ['G_front_inf-Opercular', 'G_front_inf-Triangul', 'G_front_inf-Orbital'],
        'color': '#81c995',
        'category': 'Lóbulo Frontal / Lenguaje'
    },
    'Cortex_Orbitofrontal': {
        'name': 'Corteza Orbitofrontal (Toma de Decisiones y Emoción)',
        'labels': ['G_orbital', 'G_rectus', 'S_orbital-H_Shaped', 'S_orbital_lateral', 'S_orbital_med-ORolf'],
        'color': '#fef08a',
        'category': 'Lóbulo Frontal'
    },
    'Cortex_Frontopolar': {
        'name': 'Polo Frontal (Corteza Frontopolar Anterior BA 10)',
        'labels': ['G_and_S_transv_frontopol', 'G_and_S_frontomargin'],
        'color': '#fbcfe8',
        'category': 'Lóbulo Frontal'
    },
    'Cortex_Parietal_Sup': {
        'name': 'Lóbulo Parietal Superior y Precúneo (BA 5/7)',
        'labels': ['G_parietal_sup', 'G_precuneus', 'S_intrapariet_and_P_trans', 'S_subparietal'],
        'color': '#c084fc',
        'category': 'Lóbulo Parietal'
    },
    'Cortex_Supramarginal': {
        'name': 'Giro Supramarginal (Procesamiento Fonológico BA 40)',
        'labels': ['G_pariet_inf-Supramar', 'S_interm_prim-Jensen'],
        'color': '#fcad70',
        'category': 'Lóbulo Parietal'
    },
    'Cortex_Angular': {
        'name': 'Giro Angular (Integración Semántica y Lectura BA 39)',
        'labels': ['G_pariet_inf-Angular'],
        'color': '#d7aefb',
        'category': 'Lóbulo Parietal'
    },
    'Cortex_Temporal_Sup': {
        'name': 'Giro Temporal Superior (Área de Wernicke y Heschl)',
        'labels': ['G_temp_sup-Lateral', 'G_temp_sup-Plan_tempo', 'G_temp_sup-Plan_polar', 'G_temp_sup-G_T_transv', 'S_temporal_sup', 'S_temporal_transverse'],
        'color': '#78d9ec',
        'category': 'Lóbulo Temporal / Auditivo'
    },
    'Cortex_Temporal_Mid': {
        'name': 'Giro Temporal Medio (Memoria Semántica BA 21)',
        'labels': ['G_temporal_middle', 'S_temporal_inf'],
        'color': '#fde047',
        'category': 'Lóbulo Temporal'
    },
    'Cortex_Temporal_Inf': {
        'name': 'Giro Temporal Inferior (Vía Visual Ventral BA 20)',
        'labels': ['G_temporal_inf'],
        'color': '#f59e0b',
        'category': 'Lóbulo Temporal'
    },
    'Cortex_Temporal_Pole': {
        'name': 'Polo Temporal (Procesamiento Socioemocional BA 38)',
        'labels': ['Pole_temporal'],
        'color': '#f472b6',
        'category': 'Lóbulo Temporal'
    },
    'Cortex_Occipital': {
        'name': 'Corteza Visual Occipital (Corteza Calcarina V1, V2 y V3)',
        'labels': ['S_calcarine', 'Pole_occipital', 'G_cuneus', 'G_occipital_middle', 'G_occipital_sup', 'G_and_S_occipital_inf', 'S_oc_middle_and_Lunatus', 'S_oc_sup_and_transversal', 'S_occipital_ant'],
        'color': '#ff8bcb',
        'category': 'Lóbulo Occipital'
    },
    'Cortex_Fusiform': {
        'name': 'Giro Fusiforme (Reconocimiento Facial BA 37)',
        'labels': ['G_oc-temp_lat-fusifor', 'S_oc-temp_lat', 'G_oc-temp_med-Lingual', 'S_oc-temp_med_and_Lingual'],
        'color': '#93c5fd',
        'category': 'Corteza Occipitotemporal'
    },
    'Cortex_Cingulate': {
        'name': 'Corteza Cingulada Anterior y Posterior',
        'labels': ['G_and_S_cingul-Ant', 'G_and_S_cingul-Mid-Ant', 'G_and_S_cingul-Mid-Post', 'G_cingul-Post-dorsal', 'G_cingul-Post-ventral', 'S_cingul-Marginalis', 'S_pericallosal', 'G_subcallosal'],
        'color': '#fda4af',
        'category': 'Sistema Límbico'
    },
    'Cortex_Insula': {
        'name': 'Corteza Insular (Interocepción y Dolor)',
        'labels': ['G_insular_short', 'G_Ins_lg_and_S_cent_ins', 'S_circular_insula_ant', 'S_circular_insula_inf', 'S_circular_insula_sup'],
        'color': '#5eead4',
        'category': 'Ínsula de Reil'
    },
    'Cortex_Medial': {
        'name': 'Corteza Medial y Giro Parahipocámpico',
        'labels': ['G_oc-temp_med-Parahip'],
        'color': '#fdba74',
        'category': 'Cara Medial'
    }
}

# Reverse mapping: Destrieux label -> gyrus key
LABEL_TO_GYRUS = {}
for g_key, g_info in GYRUS_DEFINITIONS.items():
    for lbl in g_info['labels']:
        LABEL_TO_GYRUS[lbl] = g_key

DESTRIEUX_COLOR_MAP = {}
for g_key, g_info in GYRUS_DEFINITIONS.items():
    for lbl in g_info['labels']:
        DESTRIEUX_COLOR_MAP[lbl] = g_info['color']

def extract_smoothed_subcortical_mesh(mask_3d, affine, hex_color, name, decimate_factor=None):
    """
    Extracts watertight 3D isosurface from 1mm voxel mask and applies 15 iterations of
    Taubin smoothing to eliminate voxel staircasing (Lego effect).
    """
    print(f"  Extracting & Smoothing {name}...")
    verts_vox, faces, _, _ = measure.marching_cubes(mask_3d.astype(float), level=0.5)
    
    verts_homo = np.hstack([verts_vox, np.ones((len(verts_vox), 1))])
    verts_mni = (affine @ verts_homo.T).T[:, :3]
    verts_three = mni_to_three_coords(verts_mni)
    faces_flipped = faces[:, [0, 2, 1]].copy()
    
    tm = trimesh.Trimesh(vertices=verts_three, faces=faces_flipped, process=True)
    
    if decimate_factor and len(tm.faces) > 12000:
        target_faces = int(len(tm.faces) * decimate_factor)
        try:
            tm = tm.simplify_quadric_decimation(target_faces)
        except Exception as e:
            print(f"    Notice: decimation skipped for {name}: {e}")
            
    try:
        ts.filter_taubin(tm, lamb=0.5, nu=0.52, iterations=15)
        print(f"    Taubin smoothing (15 iters) applied to {name}")
    except Exception as e:
        print(f"    Warning: Taubin smoothing failed on {name}: {e}")
        
    _ = tm.vertex_normals
    
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
    print("MARK 1: ANATOMY LEARNING-GRADE DISSECTABLE REAL ATLAS GENERATOR")
    print("=" * 75)
    
    os.makedirs("public/models", exist_ok=True)
    os.makedirs("scripts", exist_ok=True)
    out_glb_path = "public/models/brain_mni152.glb"
    out_colors_path = "public/models/brodmann_fsaverage6_colors.json"
    out_landmarks_path = "public/models/brodmann_landmarks.json"
    out_inflated_path = "public/models/inflated_offsets.json"
    out_snapped_path = "scripts/glasser_36_snapped.json"
    out_metadata_path = "public/models/dissectable_metadata.json"
    
    # -------------------------------------------------------------
    # 1. LOAD DESTRIEUX SURFACE ATLAS & FSAVERAGE5 SURFACES
    # -------------------------------------------------------------
    print("\n[1/5] Loading Destrieux Surface Parcellation Atlas & FreeSurfer fsaverage5...")
    destrieux = datasets.fetch_atlas_surf_destrieux()
    raw_labels = [l.decode() if isinstance(l, bytes) else l for l in destrieux.labels]
    
    fs5 = datasets.fetch_surf_fsaverage('fsaverage5')
    pial_l = surface.load_surf_mesh(fs5['pial_left'])
    sulc_l = surface.load_surf_data(fs5['sulc_left'])
    pial_r = surface.load_surf_mesh(fs5['pial_right'])
    sulc_r = surface.load_surf_data(fs5['sulc_right'])
    
    n_verts = len(pial_l.coordinates)
    print(f"  fsaverage5 vertices per hemisphere: {n_verts}")
    
    # Coordinate transformation to Three.js coordinates
    coords_three_l = mni_to_three_coords(pial_l.coordinates)
    faces_l_flipped = pial_l.faces[:, [0, 2, 1]].copy()
    coords_three_r = mni_to_three_coords(pial_r.coordinates)
    faces_r_flipped = pial_r.faces[:, [0, 2, 1]].copy()
    
    # Export inflated coordinates for GPU morph slider
    print("  Processing fsaverage5 inflated coordinates...")
    infl_l_mesh = surface.load_surf_mesh(fs5['infl_left'])
    infl_r_mesh = surface.load_surf_mesh(fs5['infl_right'])
    infl_l_three = mni_to_three_coords(infl_l_mesh.coordinates)
    infl_r_three = mni_to_three_coords(infl_r_mesh.coordinates)
    
    with open(out_inflated_path, 'w') as f:
        json.dump({
            'left_inflated': infl_l_three.tolist(),
            'right_inflated': infl_r_three.tolist()
        }, f)
        
    # -------------------------------------------------------------
    # 2. COMPUTE ANATOMICAL ILLUMINATION: GIROS CLAROS, SURCOS OSCUROS
    # -------------------------------------------------------------
    print("\n[2/5] Generating Gold-Standard Anatomical Lighting (Gyri Light, Sulci Dark)...")
    rgb_gyrus_tissue = hex_to_rgb('#dfa89e')  # Warm rosy beige
    rgb_sulcus_tissue = hex_to_rgb('#3d1e1a') # Deep dark burgundy shadow
    
    def compute_pure_tissue_colors(sulc):
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        for i, s in enumerate(sulc):
            if s <= 0:
                shadow_mult = 1.0
            else:
                depth = np.clip(s / 1.1, 0.0, 1.0)
                shadow_mult = 1.0 - 0.68 * (depth ** 0.85)
                
            r = int(rgb_sulcus_tissue[0] + shadow_mult * (rgb_gyrus_tissue[0] - rgb_sulcus_tissue[0]))
            g = int(rgb_sulcus_tissue[1] + shadow_mult * (rgb_gyrus_tissue[1] - rgb_sulcus_tissue[1]))
            b = int(rgb_sulcus_tissue[2] + shadow_mult * (rgb_gyrus_tissue[2] - rgb_sulcus_tissue[2]))
            colors[i] = [r, g, b, 255]
        return colors
        
    tissue_colors_l = compute_pure_tissue_colors(sulc_l)
    tissue_colors_r = compute_pure_tissue_colors(sulc_r)
    
    def compute_destrieux_colors(map_indices, sulc):
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        for i, (idx, s) in enumerate(zip(map_indices, sulc)):
            label_name = raw_labels[idx] if idx < len(raw_labels) else 'Unknown'
            hex_col = DESTRIEUX_COLOR_MAP.get(label_name, '#dfa89e')
            base_rgb = hex_to_rgb(hex_col)
            
            if s <= 0:
                shadow_mult = 1.0
            else:
                depth = np.clip(s / 1.1, 0.0, 1.0)
                shadow_mult = 1.0 - 0.68 * (depth ** 0.85)
            
            r = int(base_rgb[0] * shadow_mult)
            g = int(base_rgb[1] * shadow_mult)
            b = int(base_rgb[2] * shadow_mult)
            colors[i] = [r, g, b, 255]
        return colors
        
    destrieux_colors_l = compute_destrieux_colors(destrieux.map_left, sulc_l)
    destrieux_colors_r = compute_destrieux_colors(destrieux.map_right, sulc_r)
    
    # Export Uint8 RGBA Flat Color Buffers for Three.js
    print(f"  Exporting Uint8 RGBA color buffers to {out_colors_path}...")
    with open(out_colors_path, 'w') as f:
        json.dump({
            'left_tissue': tissue_colors_l.flatten().tolist(),
            'right_tissue': tissue_colors_r.flatten().tolist(),
            'left_brodmann': destrieux_colors_l.flatten().tolist(),
            'right_brodmann': destrieux_colors_r.flatten().tolist(),
        }, f)
        
    # Build complete Left & Right Trimesh meshes
    tm_left = trimesh.Trimesh(
        vertices=coords_three_l,
        faces=faces_l_flipped,
        vertex_colors=tissue_colors_l,
        process=False
    )
    _ = tm_left.vertex_normals
    tm_left.metadata['name'] = 'Hemisphere_Left'
    
    tm_right = trimesh.Trimesh(
        vertices=coords_three_r,
        faces=faces_r_flipped,
        vertex_colors=tissue_colors_r,
        process=False
    )
    _ = tm_right.vertex_normals
    tm_right.metadata['name'] = 'Hemisphere_Right'

    # -------------------------------------------------------------
    # 2B. PARTITION CORTEX INTO 19 DISSECTABLE GYRAL SUB-MESHES PER HEMISPHERE
    # -------------------------------------------------------------
    print("\n[2B/5] Partitioning Cortex into 38 Independent Dissectable Gyral Meshes...")
    
    metadata = {}
    
    def split_cortex_into_gyri(tm_cortex, map_indices, hemi_key, hemi_name_suffix):
        vert_group = [LABEL_TO_GYRUS.get(raw_labels[idx] if idx < len(raw_labels) else '', 'Cortex_Medial') for idx in map_indices]
        
        gyrus_faces = {k: [] for k in GYRUS_DEFINITIONS.keys()}
        for face_idx, f in enumerate(tm_cortex.faces):
            grps = [vert_group[f[0]], vert_group[f[1]], vert_group[f[2]]]
            winner = Counter(grps).most_common(1)[0][0]
            gyrus_faces[winner].append(face_idx)
            
        submeshes = {}
        for g_key, f_list in gyrus_faces.items():
            if len(f_list) == 0:
                continue
            sub = tm_cortex.submesh([f_list], append=True)
            sub_id = f"{g_key}_{hemi_key}"
            sub.metadata['name'] = sub_id
            submeshes[sub_id] = sub
            
            # Save metadata
            g_def = GYRUS_DEFINITIONS[g_key]
            metadata[sub_id] = {
                'id': sub_id,
                'name': f"{g_def['name']} ({hemi_name_suffix})",
                'category': g_def['category'],
                'color': g_def['color'],
                'hemisphere': 'left' if hemi_key == 'L' else 'right',
                'dissectable': True,
                'vertexCount': len(sub.vertices),
                'faceCount': len(sub.faces)
            }
        return submeshes

    gyri_left = split_cortex_into_gyri(tm_left, destrieux.map_left, 'L', 'Hemisferio Izquierdo')
    gyri_right = split_cortex_into_gyri(tm_right, destrieux.map_right, 'R', 'Hemisferio Derecho')
    print(f"  Generated {len(gyri_left)} Left Gyral Meshes & {len(gyri_right)} Right Gyral Meshes")

    # -------------------------------------------------------------
    # 3. COMPUTE REAL CENTROIDS FOR BRODMANN LANDMARKS
    # -------------------------------------------------------------
    print("\n[3/5] Computing Real Anatomical Centroids for Brodmann Labels...")
    KEY_BRODMANN_PARCELS = [
        {'id': 'BA_4', 'number': '4', 'name': 'Corteza Motora Primaria (M1)', 'target_label': 'G_precentral', 'color': '#f28b82'},
        {'id': 'BA_312', 'number': '3, 1, 2', 'name': 'Corteza Somatosensorial Primaria (S1)', 'target_label': 'G_postcentral', 'color': '#8ab4f8'},
        {'id': 'BA_44', 'number': '44', 'name': 'Área de Broca (Pars Opercularis)', 'target_label': 'G_front_inf-Opercular', 'color': '#81c995'},
        {'id': 'BA_45', 'number': '45', 'name': 'Área de Broca (Pars Triangularis)', 'target_label': 'G_front_inf-Triangul', 'color': '#fde293'},
        {'id': 'BA_6', 'number': '6', 'name': 'Área Premotora / Motora Suplementaria', 'target_label': 'G_and_S_paracentral', 'color': '#f9ab9f'},
        {'id': 'BA_9_46', 'number': '9/46', 'name': 'Corteza Prefrontal Dorsolateral (DLPFC)', 'target_label': 'G_front_middle', 'color': '#fed7aa'},
        {'id': 'BA_10', 'number': '10', 'name': 'Corteza Frontopolar Anterior', 'target_label': 'G_and_S_transv_frontopol', 'color': '#fbcfe8'},
        {'id': 'BA_17', 'number': '17', 'name': 'Corteza Visual Primaria (V1 Calcarina)', 'target_label': 'Pole_occipital', 'color': '#ff8bcb'},
        {'id': 'BA_18', 'number': '18', 'name': 'Corteza Visual Secundaria (V2)', 'target_label': 'G_occipital_middle', 'color': '#ccff90'},
        {'id': 'BA_19', 'number': '19', 'name': 'Corteza Visual Asociativa (V3/V4)', 'target_label': 'G_occipital_sup', 'color': '#a7f3d0'},
        {'id': 'BA_41', 'number': '41', 'name': 'Corteza Auditiva Primaria (Heschl)', 'target_label': 'G_temp_sup-G_T_transv', 'color': '#00e5ff'},
        {'id': 'BA_22', 'number': '22', 'name': 'Área de Wernicke (Giro Temporal Superior)', 'target_label': 'G_temp_sup-Lateral', 'color': '#78d9ec'},
        {'id': 'BA_39', 'number': '39', 'name': 'Giro Angular (Comprensión Lectora)', 'target_label': 'G_pariet_inf-Angular', 'color': '#d7aefb'},
        {'id': 'BA_40', 'number': '40', 'name': 'Giro Supramarginal (Fonología)', 'target_label': 'G_pariet_inf-Supramar', 'color': '#fcad70'},
        {'id': 'BA_5_7', 'number': '5/7', 'name': 'Corteza Parietal Superior', 'target_label': 'G_parietal_sup', 'color': '#c084fc'},
        {'id': 'BA_21', 'number': '21', 'name': 'Giro Temporal Medio (Semántica)', 'target_label': 'G_temporal_middle', 'color': '#fde047'},
        {'id': 'BA_20', 'number': '20', 'name': 'Giro Temporal Inferior (Visión Ventral)', 'target_label': 'G_temporal_inf', 'color': '#f59e0b'},
        {'id': 'BA_37', 'number': '37', 'name': 'Giro Fusiforme (Reconocimiento Facial)', 'target_label': 'G_oc-temp_lat-fusifor', 'color': '#93c5fd'},
        {'id': 'BA_38', 'number': '38', 'name': 'Polo Temporal (Emoción y Memoria)', 'target_label': 'Pole_temporal', 'color': '#f472b6'},
    ]
    
    landmarks = []
    v_norms_l = tm_left.vertex_normals
    for badge in KEY_BRODMANN_PARCELS:
        t_label = badge['target_label']
        if t_label not in raw_labels:
            continue
        idx = raw_labels.index(t_label)
        vert_indices = np.where(destrieux.map_left == idx)[0]
        if len(vert_indices) == 0:
            continue
            
        v_coords = coords_three_l[vert_indices]
        v_norms = v_norms_l[vert_indices]
        
        centroid = v_coords.mean(axis=0)
        avg_norm = v_norms.mean(axis=0)
        norm_len = np.linalg.norm(avg_norm)
        if norm_len > 1e-4:
            avg_norm /= norm_len
        else:
            avg_norm = np.array([0, 1, 0])
            
        badge_pos = (centroid + avg_norm * 0.08).tolist()
        landmarks.append({
            'id': badge['id'],
            'number': badge['number'],
            'name': badge['name'],
            'destrieux_label': t_label,
            'color': badge['color'],
            'position': badge_pos,
            'normal': avg_norm.tolist()
        })
        
    with open(out_landmarks_path, 'w') as f:
        json.dump(landmarks, f, indent=2)
    print(f"  Saved {len(landmarks)} Destrieux/Brodmann parcel centroids to {out_landmarks_path}")

    # Snapped landmark coordinates for Glasser nodes on fsaverage5
    from fetch_real_3d_atlas import GLASSER_36_MNI
    snapped_data = {}
    pial_left_mesh = surface.load_surf_mesh(fs5['pial_left'])
    for node_id, mni in GLASSER_36_MNI.items():
        is_subcortical = 'SUBCORTICAL' in node_id or 'HIPPOCAMPUS' in node_id or 'AMYGDALA' in node_id or 'ENTORHINAL' in node_id
        if is_subcortical:
            three_pos = [
                float(mni[0] * SCALE),
                float((mni[2] - CENTER_MNI_Z) * SCALE),
                float((mni[1] - CENTER_MNI_Y) * SCALE)
            ]
            snapped_data[node_id] = {
                'mni': mni,
                'position': three_pos,
                'vertex_index': -1,
                'normal': [0.0, 1.0, 0.0],
                'is_subcortical': True
            }
        else:
            dists = np.linalg.norm(pial_left_mesh.coordinates - np.array(mni), axis=1)
            closest_idx = int(np.argmin(dists))
            snapped_three = coords_three_l[closest_idx].tolist()
            vert_norm = tm_left.vertex_normals[closest_idx].tolist()
            snapped_data[node_id] = {
                'mni': mni,
                'position': snapped_three,
                'vertex_index': closest_idx,
                'normal': vert_norm,
                'is_subcortical': False,
                'distance_mm': float(dists[closest_idx])
            }
    with open(out_snapped_path, 'w') as f:
        json.dump(snapped_data, f, indent=2)
    print(f"  Saved snapped coordinates to {out_snapped_path}")

    # -------------------------------------------------------------
    # 4. EXTRACT 22 DISSECTABLE SUBCORTICAL MESHES WITH TAUBIN SMOOTHING
    # -------------------------------------------------------------
    print("\n[4/5] Extracting 22 Individual Subcortical Meshes with Taubin smoothing...")
    ho = datasets.fetch_atlas_harvard_oxford('sub-maxprob-thr25-1mm')
    img_ho = image.load_img(ho.maps)
    data_ho = img_ho.get_fdata()
    affine_ho = img_ho.affine
    
    juelich = datasets.fetch_atlas_juelich('maxprob-thr25-1mm')
    img_j = image.load_img(juelich.maps)
    data_j = img_j.get_fdata()
    affine_j = img_j.affine
    
    aal = datasets.fetch_atlas_aal()
    img_aal = image.load_img(aal.maps)
    data_aal = img_aal.get_fdata()
    affine_aal = img_aal.affine
    
    # Calculate MNI Z values for Brainstem subdivision
    vox_indices = np.indices(data_ho.shape).reshape(3, -1).T
    homo_vox = np.hstack([vox_indices, np.ones((len(vox_indices), 1))])
    mni_z_grid = ((affine_ho @ homo_vox.T).T[:, 2]).reshape(data_ho.shape)
    
    subcortical_meshes = {}
    
    # 1. Corpus Callosum
    tm_cc = extract_smoothed_subcortical_mesh(data_j == 54, affine_j, '#6fa8dc', 'Corpus_Callosum')
    subcortical_meshes['Corpus_Callosum'] = tm_cc
    metadata['Corpus_Callosum'] = {'id': 'Corpus_Callosum', 'name': 'Cuerpo Calloso (Comisura Interhemisférica)', 'category': 'Comisura', 'color': '#6fa8dc', 'dissectable': True}
    
    # 2. Fornix
    tm_fornix = extract_smoothed_subcortical_mesh(data_j == 57, affine_j, '#f6b26b', 'Fornix')
    subcortical_meshes['Fornix'] = tm_fornix
    metadata['Fornix'] = {'id': 'Fornix', 'name': 'Fórnix (Trígono Cerebral)', 'category': 'Sistema Límbico', 'color': '#f6b26b', 'dissectable': True}
    
    # 3 & 4. Thalamus Left & Right
    tm_thal_l = extract_smoothed_subcortical_mesh(data_ho == 4, affine_ho, '#e06666', 'Thalamus_L')
    tm_thal_r = extract_smoothed_subcortical_mesh(data_ho == 15, affine_ho, '#e06666', 'Thalamus_R')
    subcortical_meshes['Thalamus_L'] = tm_thal_l
    subcortical_meshes['Thalamus_R'] = tm_thal_r
    metadata['Thalamus_L'] = {'id': 'Thalamus_L', 'name': 'Tálamo Izquierdo', 'category': 'Diencéfalo', 'color': '#e06666', 'dissectable': True}
    metadata['Thalamus_R'] = {'id': 'Thalamus_R', 'name': 'Tálamo Derecho', 'category': 'Diencéfalo', 'color': '#e06666', 'dissectable': True}
    
    # 5 & 6. Caudate Left & Right
    tm_caud_l = extract_smoothed_subcortical_mesh(data_ho == 5, affine_ho, '#9999e6', 'Caudate_L')
    tm_caud_r = extract_smoothed_subcortical_mesh(data_ho == 16, affine_ho, '#9999e6', 'Caudate_R')
    subcortical_meshes['Caudate_L'] = tm_caud_l
    subcortical_meshes['Caudate_R'] = tm_caud_r
    metadata['Caudate_L'] = {'id': 'Caudate_L', 'name': 'Núcleo Caudado Izquierdo', 'category': 'Ganglios Basales', 'color': '#9999e6', 'dissectable': True}
    metadata['Caudate_R'] = {'id': 'Caudate_R', 'name': 'Núcleo Caudado Derecho', 'category': 'Ganglios Basales', 'color': '#9999e6', 'dissectable': True}
    
    # 7 & 8. Putamen Left & Right
    tm_put_l = extract_smoothed_subcortical_mesh(data_ho == 6, affine_ho, '#8e7cc3', 'Putamen_L')
    tm_put_r = extract_smoothed_subcortical_mesh(data_ho == 17, affine_ho, '#8e7cc3', 'Putamen_R')
    subcortical_meshes['Putamen_L'] = tm_put_l
    subcortical_meshes['Putamen_R'] = tm_put_r
    metadata['Putamen_L'] = {'id': 'Putamen_L', 'name': 'Putamen Izquierdo', 'category': 'Ganglios Basales', 'color': '#8e7cc3', 'dissectable': True}
    metadata['Putamen_R'] = {'id': 'Putamen_R', 'name': 'Putamen Derecho', 'category': 'Ganglios Basales', 'color': '#8e7cc3', 'dissectable': True}
    
    # 9 & 10. Pallidum Left & Right
    tm_pal_l = extract_smoothed_subcortical_mesh(data_ho == 7, affine_ho, '#d5a6bd', 'Pallidum_L')
    tm_pal_r = extract_smoothed_subcortical_mesh(data_ho == 18, affine_ho, '#d5a6bd', 'Pallidum_R')
    subcortical_meshes['Pallidum_L'] = tm_pal_l
    subcortical_meshes['Pallidum_R'] = tm_pal_r
    metadata['Pallidum_L'] = {'id': 'Pallidum_L', 'name': 'Globo Pálido Izquierdo', 'category': 'Ganglios Basales', 'color': '#d5a6bd', 'dissectable': True}
    metadata['Pallidum_R'] = {'id': 'Pallidum_R', 'name': 'Globo Pálido Derecho', 'category': 'Ganglios Basales', 'color': '#d5a6bd', 'dissectable': True}
    
    # 11 & 12. Hippocampus Left & Right
    tm_hip_l = extract_smoothed_subcortical_mesh(data_ho == 9, affine_ho, '#ffd966', 'Hippocampus_L')
    tm_hip_r = extract_smoothed_subcortical_mesh(data_ho == 19, affine_ho, '#ffd966', 'Hippocampus_R')
    subcortical_meshes['Hippocampus_L'] = tm_hip_l
    subcortical_meshes['Hippocampus_R'] = tm_hip_r
    metadata['Hippocampus_L'] = {'id': 'Hippocampus_L', 'name': 'Hipocampo Izquierdo', 'category': 'Sistema Límbico', 'color': '#ffd966', 'dissectable': True}
    metadata['Hippocampus_R'] = {'id': 'Hippocampus_R', 'name': 'Hipocampo Derecho', 'category': 'Sistema Límbico', 'color': '#ffd966', 'dissectable': True}
    
    # 13 & 14. Amygdala Left & Right
    tm_amy_l = extract_smoothed_subcortical_mesh(data_ho == 10, affine_ho, '#f9cb9c', 'Amygdala_L')
    tm_amy_r = extract_smoothed_subcortical_mesh(data_ho == 20, affine_ho, '#f9cb9c', 'Amygdala_R')
    subcortical_meshes['Amygdala_L'] = tm_amy_l
    subcortical_meshes['Amygdala_R'] = tm_amy_r
    metadata['Amygdala_L'] = {'id': 'Amygdala_L', 'name': 'Amígdala Izquierda', 'category': 'Sistema Límbico', 'color': '#f9cb9c', 'dissectable': True}
    metadata['Amygdala_R'] = {'id': 'Amygdala_R', 'name': 'Amígdala Derecha', 'category': 'Sistema Límbico', 'color': '#f9cb9c', 'dissectable': True}
    
    # 15, 16 & 17. Brainstem Subdivisions: Midbrain, Pons, Medulla
    mask_stem_all = (data_ho == 8)
    tm_midbrain = extract_smoothed_subcortical_mesh(mask_stem_all & (mni_z_grid >= -18), affine_ho, '#d5a6bd', 'Midbrain')
    tm_pons = extract_smoothed_subcortical_mesh(mask_stem_all & (mni_z_grid >= -38) & (mni_z_grid < -18), affine_ho, '#ea9999', 'Pons')
    tm_medulla = extract_smoothed_subcortical_mesh(mask_stem_all & (mni_z_grid < -38), affine_ho, '#c5a5cf', 'Medulla')
    subcortical_meshes['Midbrain'] = tm_midbrain
    subcortical_meshes['Pons'] = tm_pons
    subcortical_meshes['Medulla'] = tm_medulla
    metadata['Midbrain'] = {'id': 'Midbrain', 'name': 'Mesencéfalo (Pedúnculos y Colículos)', 'category': 'Tronco Encefálico', 'color': '#d5a6bd', 'dissectable': True}
    metadata['Pons'] = {'id': 'Pons', 'name': 'Puente de Varolio (Protuberancia)', 'category': 'Tronco Encefálico', 'color': '#ea9999', 'dissectable': True}
    metadata['Medulla'] = {'id': 'Medulla', 'name': 'Bulbo Raquídeo (Médula Oblongada)', 'category': 'Tronco Encefálico', 'color': '#c5a5cf', 'dissectable': True}
    
    # 18, 19 & 20. Cerebellum Left, Right & Vermis
    cereb_l_indices = [int(aal.indices[i]) for i, l in enumerate(aal.labels) if 'Cerebel' in l and l.endswith('_L')]
    cereb_r_indices = [int(aal.indices[i]) for i, l in enumerate(aal.labels) if 'Cerebel' in l and l.endswith('_R')]
    vermis_indices = [int(aal.indices[i]) for i, l in enumerate(aal.labels) if 'Vermis' in l]
    
    tm_cereb_l = extract_smoothed_subcortical_mesh(np.isin(data_aal, cereb_l_indices), affine_aal, '#45818e', 'Cerebellum_L', decimate_factor=0.6)
    tm_cereb_r = extract_smoothed_subcortical_mesh(np.isin(data_aal, cereb_r_indices), affine_aal, '#45818e', 'Cerebellum_R', decimate_factor=0.6)
    tm_vermis = extract_smoothed_subcortical_mesh(np.isin(data_aal, vermis_indices), affine_aal, '#5ea48a', 'Vermis')
    subcortical_meshes['Cerebellum_L'] = tm_cereb_l
    subcortical_meshes['Cerebellum_R'] = tm_cereb_r
    subcortical_meshes['Vermis'] = tm_vermis
    metadata['Cerebellum_L'] = {'id': 'Cerebellum_L', 'name': 'Hemisferio Cerebeloso Izquierdo', 'category': 'Cerebelo', 'color': '#45818e', 'dissectable': True}
    metadata['Cerebellum_R'] = {'id': 'Cerebellum_R', 'name': 'Hemisferio Cerebeloso Derecho', 'category': 'Cerebelo', 'color': '#45818e', 'dissectable': True}
    metadata['Vermis'] = {'id': 'Vermis', 'name': 'Vermis Cerebeloso', 'category': 'Cerebelo', 'color': '#5ea48a', 'dissectable': True}
    
    # 21 & 22. Lateral Ventricles Left & Right
    tm_vent_l = extract_smoothed_subcortical_mesh(data_ho == 3, affine_ho, '#a4c2f4', 'Ventricles_L')
    tm_vent_r = extract_smoothed_subcortical_mesh(data_ho == 14, affine_ho, '#a4c2f4', 'Ventricles_R')
    subcortical_meshes['Ventricles_L'] = tm_vent_l
    subcortical_meshes['Ventricles_R'] = tm_vent_r
    metadata['Ventricles_L'] = {'id': 'Ventricles_L', 'name': 'Ventrículo Lateral Izquierdo', 'category': 'Sistema Ventricular', 'color': '#a4c2f4', 'dissectable': True}
    metadata['Ventricles_R'] = {'id': 'Ventricles_R', 'name': 'Ventrículo Lateral Derecho', 'category': 'Sistema Ventricular', 'color': '#a4c2f4', 'dissectable': True}

    # Also keep merged meshes for backwards compatibility if needed
    tm_brainstem_merged = extract_smoothed_subcortical_mesh(mask_stem_all, affine_ho, '#d5a6bd', 'Brainstem')
    tm_cerebellum_merged = extract_smoothed_subcortical_mesh(np.isin(data_aal, cereb_l_indices + cereb_r_indices + vermis_indices), affine_aal, '#45818e', 'Cerebellum', decimate_factor=0.6)
    tm_thalamus_merged = extract_smoothed_subcortical_mesh((data_ho == 4) | (data_ho == 15), affine_ho, '#e06666', 'Thalamus')
    tm_striatum_merged = extract_smoothed_subcortical_mesh((data_ho == 5) | (data_ho == 16) | (data_ho == 6) | (data_ho == 17) | (data_ho == 7) | (data_ho == 18), affine_ho, '#8e7cc3', 'Caudate_Putamen')
    tm_limbic_merged = extract_smoothed_subcortical_mesh((data_ho == 9) | (data_ho == 19) | (data_ho == 10) | (data_ho == 20) | (data_j == 57), affine_ho, '#ffd966', 'Hippocampus_Fornix')
    tm_ventricles_merged = extract_smoothed_subcortical_mesh((data_ho == 3) | (data_ho == 14), affine_ho, '#a4c2f4', 'Ventricles')

    # Add Tracts Metadata
    tracts_meta = [
        ('TRACT_ARCUATE', 'Fascículo Arqueado (Vía Dorsal del Lenguaje)', '#00e5ff', 'Sustancia Blanca'),
        ('TRACT_CST', 'Tracto Corticoespinal (Vía Motora Piramidal)', '#f28b82', 'Sustancia Blanca'),
        ('TRACT_OPTIC', 'Radiación Óptica (Vía Visual Geniculocalcarina)', '#ff8bcb', 'Sustancia Blanca'),
        ('TRACT_THALAMOCORTICAL', 'Radiación Talámica Somatosensorial', '#8ab4f8', 'Sustancia Blanca'),
        ('TRACT_UNCINATE', 'Fascículo Uncinado (Límbico-Frontal)', '#ffd966', 'Sustancia Blanca'),
        ('TRACT_SLF', 'Fascículo Longitudinal Superior (SLF)', '#5eead4', 'Sustancia Blanca'),
        ('TRACT_ILF', 'Fascículo Longitudinal Inferior (ILF)', '#fde047', 'Sustancia Blanca'),
        ('TRACT_CINGULUM', 'Cíngulo (Circuito de Papez)', '#fda4af', 'Sustancia Blanca'),
        ('TRACT_CORPUS_CALLOSUM', 'Comisura del Cuerpo Calloso', '#6fa8dc', 'Sustancia Blanca'),
    ]
    for tid, tname, tcol, tcat in tracts_meta:
        metadata[tid] = {'id': tid, 'name': tname, 'category': tcat, 'color': tcol, 'dissectable': True}

    # Add Arteries Metadata
    arteries_meta = [
        ('ART_ICA', 'Arteria Carótida Interna (ACI)', '#ef4444', 'Sistema Arterial'),
        ('ART_MCA', 'Arteria Cerebral Media (ACM M1/M2)', '#f97316', 'Sistema Arterial'),
        ('ART_ACA', 'Arteria Cerebral Anterior (ACA A1/A2)', '#eab308', 'Sistema Arterial'),
        ('ART_PCA', 'Arteria Cerebral Posterior (ACP P1/P2)', '#ec4899', 'Sistema Arterial'),
        ('ART_BA', 'Arteria Basilar (Tronco Basilar)', '#dc2626', 'Sistema Arterial'),
        ('ART_VA', 'Arterias Vertebrales (V4)', '#b91c1c', 'Sistema Arterial'),
        ('ART_ACOM', 'Arteria Comunicante Anterior (AComA)', '#f59e0b', 'Sistema Arterial'),
        ('ART_PCOM', 'Arteria Comunicante Posterior (AComP)', '#f43f5e', 'Sistema Arterial'),
    ]
    for aid, aname, acol, acat in arteries_meta:
        metadata[aid] = {'id': aid, 'name': aname, 'category': acat, 'color': acol, 'dissectable': True}

    # Add Cranial Nerves Metadata
    nerves_meta = [
        ('cn1', 'I Par Craneal - Nervio Olfatorio', '#38bdf8', 'Pares Craneales'),
        ('cn2', 'II Par Craneal - Nervio Óptico', '#38bdf8', 'Pares Craneales'),
        ('cn3', 'III Par Craneal - Nervio Oculomotor', '#38bdf8', 'Pares Craneales'),
        ('cn4', 'IV Par Craneal - Nervio Troclear (Patético)', '#38bdf8', 'Pares Craneales'),
        ('cn5', 'V Par Craneal - Nervio Trigémino', '#38bdf8', 'Pares Craneales'),
        ('cn6', 'VI Par Craneal - Nervio Abducens (Motor Ocular Externo)', '#38bdf8', 'Pares Craneales'),
        ('cn7', 'VII Par Craneal - Nervio Facial', '#38bdf8', 'Pares Craneales'),
        ('cn8', 'VIII Par Craneal - Nervio Vestibulococlear (Auditivo)', '#38bdf8', 'Pares Craneales'),
        ('cn9', 'IX Par Craneal - Nervio Glosofaríngeo', '#38bdf8', 'Pares Craneales'),
        ('cn10', 'X Par Craneal - Nervio Vago (Neumogástrico)', '#38bdf8', 'Pares Craneales'),
        ('cn11', 'XI Par Craneal - Nervio Accesorio (Espinal)', '#38bdf8', 'Pares Craneales'),
        ('cn12', 'XII Par Craneal - Nervio Hipogloso', '#38bdf8', 'Pares Craneales'),
    ]
    for nid, nname, ncol, ncat in nerves_meta:
        metadata[nid] = {'id': nid, 'name': nname, 'category': ncat, 'color': ncol, 'dissectable': True}

    # Save complete metadata
    with open(out_metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"  Exported {len(metadata)} dissectable pieces metadata to {out_metadata_path}")

    # -------------------------------------------------------------
    # 5. ASSEMBLE & EXPORT UNIFIED 3D SLICER / ANATOMYKA GLB
    # -------------------------------------------------------------
    print("\n[5/5] Exporting unified multi-object dissectable anatomical GLB...")
    scene = trimesh.Scene()
    
    # 1. Whole Hemispheres
    scene.add_geometry(tm_left, node_name='Hemisphere_Left')
    scene.add_geometry(tm_right, node_name='Hemisphere_Right')
    
    # 2. Individual Cortical Gyri (Left & Right)
    for sub_id, sub_mesh in gyri_left.items():
        scene.add_geometry(sub_mesh, node_name=sub_id)
    for sub_id, sub_mesh in gyri_right.items():
        scene.add_geometry(sub_mesh, node_name=sub_id)
        
    # 3. Individual Subcortical Meshes
    for sub_id, sub_mesh in subcortical_meshes.items():
        scene.add_geometry(sub_mesh, node_name=sub_id)
        
    # 4. Merged Fallbacks
    scene.add_geometry(tm_thalamus_merged, node_name='Thalamus')
    scene.add_geometry(tm_striatum_merged, node_name='Caudate_Putamen')
    scene.add_geometry(tm_limbic_merged, node_name='Hippocampus_Fornix')
    scene.add_geometry(tm_brainstem_merged, node_name='Brainstem')
    scene.add_geometry(tm_cerebellum_merged, node_name='Cerebellum')
    scene.add_geometry(tm_ventricles_merged, node_name='Ventricles')
    
    glb_data = scene.export(file_type='glb')
    with open(out_glb_path, 'wb') as f:
        f.write(glb_data)
        
    print(f"\nALL ANATOMYKA DISSECTABLE ASSETS BUILT SUCCESSFULLY!")
    print(f"GLB Output: {out_glb_path} ({len(glb_data) / (1024*1024):.2f} MB)")
    print(f"Total Geometries in Scene: {len(scene.geometry)}")
    print("=" * 75)

if __name__ == '__main__':
    main()
