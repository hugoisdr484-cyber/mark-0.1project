import os
import json
import numpy as np
import scipy.ndimage as ndi
import trimesh
import trimesh.smoothing as ts
from nilearn import datasets, image, surface
from skimage import measure

# Coordinate Transformation Parameters to fit Three.js Viewport
SCALE = 0.035
CENTER_MNI_Y = -17.85
CENTER_MNI_Z = 14.85

def mni_to_three_coords(coords_mni):
    three = np.zeros_like(coords_mni, dtype=np.float32)
    three[:, 0] = coords_mni[:, 0] * SCALE
    three[:, 1] = (coords_mni[:, 2] - CENTER_MNI_Z) * SCALE
    three[:, 2] = (coords_mni[:, 1] - CENTER_MNI_Y) * SCALE
    return three

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return [int(hex_str[i:i+2], 16) for i in (0, 2, 4)]

# Classic Brodmann Cytoarchitectonic Color Palette (as specified by user)
BRODMANN_COLOR_MAP = {
    # Motor & Premotor
    'Brodmann area 4': '#e0564c',   # Coral Red (M1)
    'Brodmann area 6': '#2ecc71',   # Mint Green (Premotor & SMA)
    'Brodmann area 8': '#e67e22',   # Salmon / Amber (Frontal Eye Fields)
    
    # Primary & Secondary Somatosensory
    'Brodmann area 3': '#2980b9',   # Steel Blue (S1)
    'Brodmann area 1': '#2980b9',   # Steel Blue (S1)
    'Brodmann area 2': '#2980b9',   # Steel Blue (S1)
    'Brodmann area 43': '#3498db',  # Subcentral somatosensory
    
    # Prefrontal Cortex
    'Brodmann area 9': '#9b59b6',   # Lavender / Purple (DLPFC)
    'Brodmann area 46': '#9b59b6',  # DLPFC
    'Brodmann area 10': '#d7bde2',  # Soft Pink / Frontopolar
    'Brodmann area 11': '#e8daef',  # Salvia / Orbitofrontal
    'Brodmann area 47': '#bb8fce',  # Orbital inferior frontal
    
    # Language Areas (Broca & Wernicke)
    'Brodmann area 44': '#f39c12',  # Warm Cream / Orange (Broca Pars Opercularis)
    'Brodmann area 45': '#1abc9c',  # Pastel Green (Broca Pars Triangularis)
    'Brodmann area 22': '#3498db',  # Sky Blue (Wernicke / STG)
    'Brodmann area 41': '#00bcd4',  # Cyan (A1 Primary Auditory)
    'Brodmann area 42': '#26c6da',  # Cyan / Auditory association
    
    # Parietal & Associative
    'Brodmann area 5': '#d4ac0d',   # Ocher (Superior Parietal)
    'Brodmann area 7': '#8e44ad',   # Soft Violet (Superior Parietal / Precuneus)
    'Brodmann area 39': '#ec7063',  # Salmon-Pink (Angular Gyrus)
    'Brodmann area 40': '#f8c471',  # Light Orange (Supramarginal Gyrus)
    
    # Visual Cortex
    'Brodmann area 17': '#e91e63',  # Magenta (V1 Primary Visual)
    'Brodmann area 18': '#82e0aa',  # Lime (V2 Secondary Visual)
    'Brodmann area 19': '#52be80',  # Pistachio (V3/V4 Associative Visual)
    
    # Temporal & Fusiform
    'Brodmann area 20': '#f5b041',  # Sand (Inferior Temporal)
    'Brodmann area 21': '#eb984e',  # Ocher (Middle Temporal)
    'Brodmann area 37': '#5dade2',  # Mid-Blue (Fusiform Gyrus)
    'Brodmann area 38': '#bb8fce',  # Lilac (Temporal Pole)
    'Brodmann area 36': '#edbb99',  # Parahippocampal
    'Brodmann area 28': '#f0b27a',  # Entorhinal
    'Brodmann area 34': '#f5cba7',  # Uncus / Entorhinal
    'Brodmann area 35': '#e59866',  # Perirhinal
    
    # Cingulate & Limbic
    'Brodmann area 24': '#f1948a',  # Anterior Cingulate
    'Brodmann area 32': '#e57373',  # Dorsal Anterior Cingulate
    'Brodmann area 23': '#85c1e9',  # Posterior Cingulate
    'Brodmann area 31': '#7fb3d5',  # Dorsal Posterior Cingulate
    'Brodmann area 25': '#d98880',  # Subgenual Cingulate
    'Brodmann area 29': '#aed6f1',  # Retrosplenial
    'Brodmann area 30': '#a9cce3',  # Retrosplenial
    'Brodmann area 33': '#ef9a9a',  # Anterior Cingulate
}

def extract_smoothed_subcortical_mesh(mask_3d, affine, hex_color, name, decimate_factor=None):
    """
    Extracts 3D isosurface from 1mm voxel mask, applies 15 iterations of Taubin smoothing
    to eliminate voxel staircasing (Lego effect), and assigns 100% opaque vertex colors.
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
            
    # Apply 15 iterations of Taubin smoothing to remove voxel stepping while preserving volume
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
    print("MARK 1: TAUBIN SMOOTHING + BRODMANN 180 CORTICAL ATLAS GENERATOR")
    print("=" * 75)
    
    os.makedirs("public/models", exist_ok=True)
    out_glb_path = "public/models/brain_mni152.glb"
    out_brodmann_colors_path = "public/models/brodmann_fsaverage6_colors.json"
    out_brodmann_landmarks_path = "public/models/brodmann_landmarks.json"
    
    # -------------------------------------------------------------
    # 1. LOAD TALAIRACH BRODMANN ATLAS AND BUILD DISTANCE MAP
    # -------------------------------------------------------------
    print("\n[1/5] Loading Talairach Brodmann Atlas for cortical mapping...")
    tal = datasets.fetch_atlas_talairach('ba')
    img_tal = image.load_img(tal.maps)
    data_tal = img_tal.get_fdata().astype(int)
    inv_aff_tal = np.linalg.inv(img_tal.affine)
    
    # Dense Nearest-Neighbor distance transform to fill cortical surface
    print("  Computing Euclidean distance transform on Brodmann atlas volume...")
    _, nearest_idx = ndi.distance_transform_edt(data_tal == 0, return_indices=True)
    filled_tal = data_tal[tuple(nearest_idx)]
    
    # -------------------------------------------------------------
    # 2. PROCESS FSAVERAGE6 CORTEX (LEFT & RIGHT IDENTICAL TISSUE)
    # -------------------------------------------------------------
    print("\n[2/5] Fetching FreeSurfer fsaverage6 surfaces...")
    fs6 = datasets.fetch_surf_fsaverage('fsaverage6')
    
    pial_l = surface.load_surf_mesh(fs6['pial_left'])
    sulc_l = surface.load_surf_data(fs6['sulc_left'])
    pial_r = surface.load_surf_mesh(fs6['pial_right'])
    sulc_r = surface.load_surf_data(fs6['sulc_right'])
    
    coords_three_l = mni_to_three_coords(pial_l.coordinates)
    faces_l_flipped = pial_l.faces[:, [0, 2, 1]].copy()
    coords_three_r = mni_to_three_coords(pial_r.coordinates)
    faces_r_flipped = pial_r.faces[:, [0, 2, 1]].copy()
    
    # Compute normals for acute sulcal displacement (NO smoothing on cortex!)
    tm_temp_l = trimesh.Trimesh(vertices=coords_three_l, faces=faces_l_flipped, process=False)
    v_norm_l = tm_temp_l.vertex_normals
    tm_temp_r = trimesh.Trimesh(vertices=coords_three_r, faces=faces_r_flipped, process=False)
    v_norm_r = tm_temp_r.vertex_normals
    
    displaced_l = coords_three_l.copy()
    sulc_depth_l = np.clip(sulc_l, -1.8, 0.0)
    for i in range(len(coords_three_l)):
        if sulc_l[i] < 0:
            displaced_l[i] += v_norm_l[i] * sulc_depth_l[i] * 0.024
            
    displaced_r = coords_three_r.copy()
    sulc_depth_r = np.clip(sulc_r, -1.8, 0.0)
    for i in range(len(coords_three_r)):
        if sulc_r[i] < 0:
            displaced_r[i] += v_norm_r[i] * sulc_depth_r[i] * 0.024
            
    # Sample Brodmann labels for each vertex of Left and Right hemispheres
    def sample_tal_labels(coords_mni):
        v = (inv_aff_tal @ np.hstack([coords_mni, np.ones((len(coords_mni), 1))]).T).T[:, :3].round().astype(int)
        v[:, 0] = np.clip(v[:, 0], 0, data_tal.shape[0] - 1)
        v[:, 1] = np.clip(v[:, 1], 0, data_tal.shape[1] - 1)
        v[:, 2] = np.clip(v[:, 2], 0, data_tal.shape[2] - 1)
        label_indices = filled_tal[v[:, 0], v[:, 1], v[:, 2]]
        return [tal.labels[idx] for idx in label_indices]
        
    print("  Mapping Brodmann labels to Left & Right fsaverage6 vertices...")
    labels_l = sample_tal_labels(pial_l.coordinates)
    labels_r = sample_tal_labels(pial_r.coordinates)
    
    # Generate Tissue vertex colors (Warm anatomical tissue for BOTH hemispheres)
    def compute_tissue_colors(sulc):
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        for i, s in enumerate(sulc):
            val = np.clip((s + 1.25) / 2.35, 0.0, 1.0)
            t = val ** 1.6
            r = int(30 + t * (203 - 30))
            g = int(20 + t * (213 - 20))
            b = int(18 + t * (225 - 18))
            colors[i] = [r, g, b, 255]
        return colors
        
    tissue_colors_l = compute_tissue_colors(sulc_l)
    tissue_colors_r = compute_tissue_colors(sulc_r)
    
    # Generate Brodmann cytoarchitectonic vertex colors with dark sulcal floors
    def compute_brodmann_colors(labels, sulc):
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        for i, (lab, s) in enumerate(zip(labels, sulc)):
            hex_c = BRODMANN_COLOR_MAP.get(lab, '#bdc3c7')
            base_rgb = hex_to_rgb(hex_c)
            val = np.clip((s + 1.25) / 2.35, 0.0, 1.0)
            t = val ** 1.5
            r = int(26 + t * (base_rgb[0] - 26))
            g = int(18 + t * (base_rgb[1] - 18))
            b = int(16 + t * (base_rgb[2] - 16))
            colors[i] = [r, g, b, 255]
        return colors
        
    brodmann_colors_l = compute_brodmann_colors(labels_l, sulc_l)
    brodmann_colors_r = compute_brodmann_colors(labels_r, sulc_r)
    
    # Build Left & Right Trimesh objects with high anatomical fidelity
    tm_left = trimesh.Trimesh(vertices=displaced_l, faces=faces_l_flipped, vertex_colors=tissue_colors_l, process=False)
    _ = tm_left.vertex_normals
    tm_left.metadata['name'] = 'Hemisphere_Left'
    
    tm_right = trimesh.Trimesh(vertices=displaced_r, faces=faces_r_flipped, vertex_colors=tissue_colors_r, process=False)
    _ = tm_right.vertex_normals
    tm_right.metadata['name'] = 'Hemisphere_Right'
    
    # Export precomputed color arrays (as normalized Float32 RGB for Three.js BufferAttribute)
    print(f"\n[3/5] Exporting Brodmann color buffers to {out_brodmann_colors_path}...")
    with open(out_brodmann_colors_path, 'w') as f:
        json.dump({
            'left_tissue': (tissue_colors_l[:, :3] / 255.0).round(4).tolist(),
            'right_tissue': (tissue_colors_r[:, :3] / 255.0).round(4).tolist(),
            'left_brodmann': (brodmann_colors_l[:, :3] / 255.0).round(4).tolist(),
            'right_brodmann': (brodmann_colors_r[:, :3] / 255.0).round(4).tolist(),
        }, f)
        
    # Calculate 3D Pin Badges Centroids for Brodmann Areas
    print("\n  Calculating 3D Centroids for Brodmann area pin badges...")
    KEY_BADGES = [
        {'id': 'BA_4', 'number': '4', 'label': 'Corteza Motora Primaria (M1)', 'target': 'Brodmann area 4'},
        {'id': 'BA_312', 'number': '3, 1, 2', 'label': 'Corteza Somatosensorial (S1)', 'target': 'Brodmann area 3'},
        {'id': 'BA_6', 'number': '6', 'label': 'Área Premotora / Motora Suplementaria', 'target': 'Brodmann area 6'},
        {'id': 'BA_8', 'number': '8', 'label': 'Campos Oculares Frontales (FEF)', 'target': 'Brodmann area 8'},
        {'id': 'BA_9', 'number': '9', 'label': 'Corteza Prefrontal Dorsolateral', 'target': 'Brodmann area 9'},
        {'id': 'BA_10', 'number': '10', 'label': 'Corteza Frontopolar Anterior', 'target': 'Brodmann area 10'},
        {'id': 'BA_44', 'number': '44', 'label': 'Área de Broca (Pars Opercularis)', 'target': 'Brodmann area 44'},
        {'id': 'BA_45', 'number': '45', 'label': 'Área de Broca (Pars Triangularis)', 'target': 'Brodmann area 45'},
        {'id': 'BA_5', 'number': '5', 'label': 'Corteza Parietal Somatosensorial', 'target': 'Brodmann area 5'},
        {'id': 'BA_7', 'number': '7', 'label': 'Corteza Parietal Superior', 'target': 'Brodmann area 7'},
        {'id': 'BA_39', 'number': '39', 'label': 'Giro Angular (Lenguaje / Lectura)', 'target': 'Brodmann area 39'},
        {'id': 'BA_40', 'number': '40', 'label': 'Giro Supramarginal (Fonología)', 'target': 'Brodmann area 40'},
        {'id': 'BA_17', 'number': '17', 'label': 'Corteza Visual Primaria (V1 / Calcarina)', 'target': 'Brodmann area 17'},
        {'id': 'BA_18', 'number': '18', 'label': 'Corteza Visual Secundaria (V2)', 'target': 'Brodmann area 18'},
        {'id': 'BA_19', 'number': '19', 'label': 'Corteza Visual Asociativa (V3/V4)', 'target': 'Brodmann area 19'},
        {'id': 'BA_41', 'number': '41', 'label': 'Corteza Auditiva Primaria (A1 / Heschl)', 'target': 'Brodmann area 41'},
        {'id': 'BA_22', 'number': '22', 'label': 'Área de Wernicke (Giro Temporal Superior)', 'target': 'Brodmann area 22'},
        {'id': 'BA_21', 'number': '21', 'label': 'Giro Temporal Medio', 'target': 'Brodmann area 21'},
        {'id': 'BA_20', 'number': '20', 'label': 'Giro Temporal Inferior', 'target': 'Brodmann area 20'},
        {'id': 'BA_37', 'number': '37', 'label': 'Giro Fusiforme (Reconocimiento Facial)', 'target': 'Brodmann area 37'},
    ]
    
    landmarks = []
    for badge in KEY_BADGES:
        target = badge['target']
        indices = [i for i, lab in enumerate(labels_l) if lab == target]
        if not indices:
            continue
        v_coords = coords_three_l[indices]
        v_norms = v_norm_l[indices]
        # Only take points on the lateral convexity (x < -0.8 in Three coordinates) if applicable, or center
        lateral_sub = [i for i in range(len(v_coords)) if v_coords[i, 0] < -0.6]
        if lateral_sub:
            centroid = v_coords[lateral_sub].mean(axis=0)
            avg_norm = v_norms[lateral_sub].mean(axis=0)
        else:
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
            'name': badge['label'],
            'color': BRODMANN_COLOR_MAP.get(target, '#38bdf8'),
            'position': badge_pos,
            'normal': avg_norm.tolist()
        })
        
    with open(out_brodmann_landmarks_path, 'w') as f:
        json.dump(landmarks, f, indent=2)
    print(f"  Saved {len(landmarks)} Brodmann area pin landmarks to {out_brodmann_landmarks_path}")
    
    # -------------------------------------------------------------
    # 4. EXTRACT 1MM SUBCORTICAL MESHES WITH TAUBIN SMOOTHING
    # -------------------------------------------------------------
    print("\n[4/5] Extracting 1mm Subcortical and Infratentorial Atlases with Taubin smoothing...")
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
    
    # A) Corpus Callosum: Light Blue #6fa8dc
    mask_cc = (data_j == 54)
    tm_callosum = extract_smoothed_subcortical_mesh(mask_cc, affine_j, '#6fa8dc', 'Corpus_Callosum')
    
    # B) Thalamus: Coral Pink #e06666
    mask_thalamus = (data_ho == 4) | (data_ho == 15)
    tm_thalamus = extract_smoothed_subcortical_mesh(mask_thalamus, affine_ho, '#e06666', 'Thalamus')
    
    # C) Striatum (Caudate & Putamen): Purple/Blue #8e7cc3
    mask_striatum = (data_ho == 5) | (data_ho == 16) | (data_ho == 6) | (data_ho == 17) | (data_ho == 7) | (data_ho == 18)
    tm_striatum = extract_smoothed_subcortical_mesh(mask_striatum, affine_ho, '#8e7cc3', 'Caudate_Putamen')
    
    # D) Limbic (Hippocampus, Amygdala & Fornix): Yellow/Cream #ffd966
    mask_limbic = (data_ho == 9) | (data_ho == 19) | (data_ho == 10) | (data_ho == 20) | (data_j == 57)
    tm_limbic = extract_smoothed_subcortical_mesh(mask_limbic, affine_ho, '#ffd966', 'Hippocampus_Fornix')
    
    # E) Brainstem: Anatomical Beige #d5a6bd
    mask_stem = (data_ho == 8)
    tm_brainstem = extract_smoothed_subcortical_mesh(mask_stem, affine_ho, '#d5a6bd', 'Brainstem')
    
    # F) Cerebellum: Turquoise #45818e
    cereb_indices = [int(aal.indices[i]) for i, l in enumerate(aal.labels) if 'Cerebel' in l or 'Vermis' in l]
    mask_cerebellum = np.isin(data_aal, cereb_indices)
    tm_cerebellum = extract_smoothed_subcortical_mesh(mask_cerebellum, affine_aal, '#45818e', 'Cerebellum', decimate_factor=0.6)
    
    # G) Lateral Ventricles: Ice Blue #a4c2f4
    mask_ventricles = (data_ho == 3) | (data_ho == 14)
    tm_ventricles = extract_smoothed_subcortical_mesh(mask_ventricles, affine_ho, '#a4c2f4', 'Ventricles')
    
    # -------------------------------------------------------------
    # 5. ASSEMBLE UNIFIED GLB
    # -------------------------------------------------------------
    print("\n[5/5] Exporting unified GLB with Taubin-smoothed subcortical anatomy...")
    scene = trimesh.Scene()
    scene.add_geometry(tm_left, node_name='Hemisphere_Left')
    scene.add_geometry(tm_right, node_name='Hemisphere_Right')
    scene.add_geometry(tm_callosum, node_name='Corpus_Callosum')
    scene.add_geometry(tm_thalamus, node_name='Thalamus')
    scene.add_geometry(tm_striatum, node_name='Caudate_Putamen')
    scene.add_geometry(tm_limbic, node_name='Hippocampus_Fornix')
    scene.add_geometry(tm_brainstem, node_name='Brainstem')
    scene.add_geometry(tm_cerebellum, node_name='Cerebellum')
    scene.add_geometry(tm_ventricles, node_name='Ventricles')
    
    glb_data = scene.export(file_type='glb')
    with open(out_glb_path, 'wb') as f:
        f.write(glb_data)
        
    print(f"\nALL ASSETS BUILT SUCCESSFULLY!")
    print(f"GLB Output: {out_glb_path} ({len(glb_data) / (1024*1024):.2f} MB)")
    print("=" * 75)

if __name__ == '__main__':
    main()
