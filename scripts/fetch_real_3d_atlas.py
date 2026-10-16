import os
import json
import numpy as np
import trimesh
from nilearn import datasets, image, surface
from skimage import measure

# Coordinate Transformation Parameters to fit standard Three.js Viewport
SCALE = 0.035
CENTER_MNI_Y = -17.85  # Anterior-Posterior center offset in MNI space
CENTER_MNI_Z = 14.85   # Superior-Inferior center offset in MNI space

def mni_to_three_coords(coords_mni):
    three = np.zeros_like(coords_mni, dtype=np.float32)
    three[:, 0] = coords_mni[:, 0] * SCALE
    three[:, 1] = (coords_mni[:, 2] - CENTER_MNI_Z) * SCALE
    three[:, 2] = (coords_mni[:, 1] - CENTER_MNI_Y) * SCALE
    return three

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return [int(hex_str[i:i+2], 16) for i in (0, 2, 4)]

# 36 Key Clinical Landmark Regions for Glasser Atlas Snapping
GLASSER_36_MNI = {
    'GLASSER_44': [-50, 18, 16],        # Broca Pars Opercularis
    'GLASSER_45': [-48, 28, 6],         # Broca Pars Triangularis
    'GLASSER_PSL': [-56, -40, 14],      # Perisylvian Language Area
    'GLASSER_STV': [-54, -48, 16],      # Superior Temporal Visual/Language Area
    'GLASSER_A1': [-44, -20, 8],        # Primary Auditory Cortex (Heschl's Gyrus)
    'GLASSER_PBELT': [-52, -22, 6],     # Parabelt Auditory Association
    'GLASSER_55B': [-42, 6, 44],        # Area 55b (Premotor Language Hub)
    'GLASSER_4': [-38, -20, 54],        # M1 Primary Motor Cortex
    'GLASSER_6D_SMA': [-26, -6, 58],    # Premotor & SMA
    'GLASSER_FEF': [-32, 2, 52],        # Frontal Eye Fields
    'GLASSER_3B_1': [-42, -26, 52],     # S1 Primary Somatosensory Cortex
    'GLASSER_5M_7AL': [-18, -48, 62],   # Posterior Parietal Cortex
    'GLASSER_V1': [-12, -88, 2],        # V1 Primary Visual (Calcarine)
    'GLASSER_V2_V3': [-16, -92, 14],    # V2/V3 Extrastriate
    'GLASSER_V4': [-28, -78, -12],      # V4 Color & Form Processing
    'GLASSER_MT_V5': [-46, -68, 4],     # MT/V5 Motion Perception
    'GLASSER_FFC': [-38, -54, -18],     # Fusiform Face Complex
    'GLASSER_DLPFC': [-42, 36, 30],     # Area 9-46d (DLPFC)
    'GLASSER_10R_PP': [-24, 56, 12],    # Frontopolar Cortex (10r)
    'GLASSER_47L_OFC': [-36, 32, -10],  # Orbitofrontal Cortex (47l)
    'GLASSER_AVI': [-34, 18, 2],        # Anterior Ventral Insula
    'GLASSER_POI1': [-38, -14, 12],     # Posterior Insula
    'GLASSER_24_DACC': [-6, 18, 30],    # Dorsal ACC
    'GLASSER_31_PCC': [-8, -46, 34],    # Posterior Cingulate Cortex
    'GLASSER_TPOJ1': [-52, -56, 18],    # Temporo-Parieto-Occipital Junction
    'GLASSER_IP1': [-34, -62, 44],      # Inferior Parietal Sulcus
    'GLASSER_7M': [-10, -64, 42],       # Medial Parietal (Precuneus)
    'GLASSER_PG_IPL': [-46, -66, 36],   # Angular Gyrus
    'GLASSER_TE1P': [-58, -38, -14],    # Middle Temporal Gyrus
    'GLASSER_HIPPOCAMPUS': [-26, -20, -16],
    'GLASSER_AMYGDALA': [-22, -6, -18],
    'GLASSER_ENTORHINAL': [-20, -10, -26],
    'GLASSER_SUBCORTICAL_THALAMUS': [-12, -18, 8],
    'GLASSER_SUBCORTICAL_CAUDATE': [-14, 12, 10],
    'GLASSER_SUBCORTICAL_PUTAMEN': [-24, 6, 2],
    'GLASSER_SUBCORTICAL_PALLIDUM': [-18, -4, 0]
}

def extract_volume_mesh(mask_3d, affine, hex_color, name, decimate_factor=None):
    """
    Extracts a watertight 3D isosurface from a 1mm voxel mask using marching cubes,
    transforms it to Three.js coordinates, and assigns uniform vertex colors.
    """
    print(f"  Extracting {name}...")
    verts_vox, faces, _, _ = measure.marching_cubes(mask_3d.astype(float), level=0.5)
    
    # Affine transform from voxel indices to MNI world coordinates (mm)
    verts_homo = np.hstack([verts_vox, np.ones((len(verts_vox), 1))])
    verts_mni = (affine @ verts_homo.T).T[:, :3]
    
    # Transform MNI mm to Three.js world coordinates
    verts_three = mni_to_three_coords(verts_mni)
    
    # Flip triangle vertex winding [0, 2, 1] to ensure outward normals under Three.js Y-Z swap
    faces_flipped = faces[:, [0, 2, 1]].copy()
    
    # Build Trimesh
    tm = trimesh.Trimesh(vertices=verts_three, faces=faces_flipped, process=True)
    
    # Optional decimation if structure has excessive vertices
    if decimate_factor and len(tm.faces) > 8000:
        target_faces = int(len(tm.faces) * decimate_factor)
        try:
            tm = tm.simplify_quadric_decimation(target_faces)
        except Exception as e:
            print(f"    Notice: decimation skipped for {name}: {e}")
            
    _ = tm.vertex_normals
    
    # Solid 100% opaque vertex colors style Anatomyka / 3D Slicer
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

def process_fsaverage6_cortex(pial_path, sulc_path, is_left):
    """
    Builds the high-resolution cortical surface from fsaverage6 (81,924 vertices total)
    without smoothing, accentuating sulcal depth by displacing sulcal vertices inward,
    and tinting sulcal creases with deep dark #1e1412.
    """
    side_str = "Left" if is_left else "Right"
    print(f"  Processing fsaverage6 {side_str} Hemisphere...")
    mesh = surface.load_surf_mesh(pial_path)
    sulc = surface.load_surf_data(sulc_path)
    
    coords_three = mni_to_three_coords(mesh.coordinates)
    faces_flipped = mesh.faces[:, [0, 2, 1]].copy()
    
    # Compute initial surface normals for acute sulcal insetting
    tm_temp = trimesh.Trimesh(vertices=coords_three, faces=faces_flipped, process=False)
    v_normals = tm_temp.vertex_normals
    
    # Accentuate deep sulci: where sulc < 0, displace inward along normal (NO smoothing!)
    coords_displaced = coords_three.copy()
    sulc_depth = np.clip(sulc, -1.8, 0.0)
    sulc_inset_factor = 0.024  # subtle inward retraction to sharply carve sulcal fissures
    
    for i in range(len(coords_three)):
        if sulc[i] < 0:
            coords_displaced[i] += v_normals[i] * sulc_depth[i] * sulc_inset_factor
            
    # Assign anatomical vertex colors:
    # Deep sulcal fundus: #1e1412 (30, 20, 18)
    # Gyral crests: healthy pial gray-beige #cbd5e1 (203, 213, 225)
    vcolors = np.zeros((len(coords_three), 4), dtype=np.uint8)
    for i, s in enumerate(sulc):
        val = np.clip((s + 1.25) / 2.35, 0.0, 1.0)
        t = val ** 1.6  # sharp contrast in sulcal floor
        
        if is_left:
            # Anatomical pial tissue with deep dark creases
            r = int(30 + t * (203 - 30))
            g = int(20 + t * (213 - 20))
            b = int(18 + t * (225 - 18))
        else:
            # Contralateral hemisphere: soft slate-blue anatomical tissue
            r = int(24 + t * (148 - 24))
            g = int(28 + t * (163 - 28))
            b = int(38 + t * (184 - 38))
        vcolors[i] = [r, g, b, 255]
        
    cortex_tm = trimesh.Trimesh(
        vertices=coords_displaced,
        faces=faces_flipped,
        vertex_colors=vcolors,
        process=False
    )
    _ = cortex_tm.vertex_normals
    cortex_tm.metadata['name'] = f"Hemisphere_{side_str}"
    print(f"    {side_str} Cortex ready: {len(cortex_tm.vertices)} vertices, {len(cortex_tm.faces)} faces")
    return cortex_tm, coords_three

def main():
    os.makedirs("public/models", exist_ok=True)
    os.makedirs("scripts", exist_ok=True)
    out_glb_path = "public/models/brain_mni152.glb"
    out_inflated_path = "public/models/inflated_offsets.json"
    out_snapped_path = "scripts/glasser_36_snapped.json"
    
    print("=" * 70)
    print("MARK 1: HARVARD / SPL-PNL / 3D SLICER REAL 3D ANATOMICAL ATLAS GENERATOR")
    print("=" * 70)
    
    # -------------------------------------------------------------
    # 1. FETCH & PROCESS FSAVERAGE6 CORTICAL MESHES (HIGH-RES ACUTE)
    # -------------------------------------------------------------
    print("\n[1/4] Fetching FreeSurfer fsaverage6 surfaces...")
    fs6 = datasets.fetch_surf_fsaverage('fsaverage6')
    
    tm_left, raw_coords_l = process_fsaverage6_cortex(fs6['pial_left'], fs6['sulc_left'], is_left=True)
    tm_right, raw_coords_r = process_fsaverage6_cortex(fs6['pial_right'], fs6['sulc_right'], is_left=False)
    
    # Save fsaverage6 inflated coordinates for GPU morph slider
    print("  Processing inflated surfaces for real-time sulcal unrolling...")
    infl_l_mesh = surface.load_surf_mesh(fs6['infl_left'])
    infl_r_mesh = surface.load_surf_mesh(fs6['infl_right'])
    infl_l_three = mni_to_three_coords(infl_l_mesh.coordinates)
    infl_r_three = mni_to_three_coords(infl_r_mesh.coordinates)
    
    with open(out_inflated_path, 'w') as f:
        json.dump({
            'left_inflated': infl_l_three.tolist(),
            'right_inflated': infl_r_three.tolist()
        }, f)
    print(f"  Saved inflated coordinates to {out_inflated_path}")
    
    # -------------------------------------------------------------
    # 2. EXTRACT 1MM HARVARD-OXFORD, JUELICH & AAL3 SUBCORTICAL MESHES
    # -------------------------------------------------------------
    print("\n[2/4] Fetching 1mm Subcortical and Infratentorial Atlases...")
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
    
    # A) Corpus Callosum: Light Blue #6fa8dc (Juelich index 54: WM Callosal body)
    mask_cc = (data_j == 54)
    tm_callosum = extract_volume_mesh(mask_cc, affine_j, '#6fa8dc', 'Corpus_Callosum')
    
    # B) Thalamus: Coral Pink #e06666 (HO Left=4, Right=15)
    mask_thalamus = (data_ho == 4) | (data_ho == 15)
    tm_thalamus = extract_volume_mesh(mask_thalamus, affine_ho, '#e06666', 'Thalamus')
    
    # C) Caudate Nucleus & Putamen: Purple/Blue #8e7cc3 (HO Caudate=5,16; Putamen=6,17; Pallidum=7,18)
    mask_striatum = (data_ho == 5) | (data_ho == 16) | (data_ho == 6) | (data_ho == 17) | (data_ho == 7) | (data_ho == 18)
    tm_striatum = extract_volume_mesh(mask_striatum, affine_ho, '#8e7cc3', 'Caudate_Putamen')
    
    # D) Hippocampus, Amygdala & Fornix: Yellow/Cream #ffd966 (HO Hippo=9,19; Amyg=10,20; Juelich Fornix=57)
    mask_limbic = (data_ho == 9) | (data_ho == 19) | (data_ho == 10) | (data_ho == 20) | (data_j == 57)
    tm_limbic = extract_volume_mesh(mask_limbic, affine_ho, '#ffd966', 'Hippocampus_Fornix')
    
    # E) Brainstem: Anatomical Beige #d5a6bd (HO Brain-Stem=8)
    mask_stem = (data_ho == 8)
    tm_brainstem = extract_volume_mesh(mask_stem, affine_ho, '#d5a6bd', 'Brainstem')
    
    # F) Cerebellum: Turquoise #45818e (AAL3 all 26 cerebellar & vermis lobules)
    cereb_indices = [int(aal.indices[i]) for i, l in enumerate(aal.labels) if 'Cerebel' in l or 'Vermis' in l]
    mask_cerebellum = np.isin(data_aal, cereb_indices)
    tm_cerebellum = extract_volume_mesh(mask_cerebellum, affine_aal, '#45818e', 'Cerebellum')
    
    # G) Lateral Ventricles: Ice Blue #a4c2f4 (HO Ventricles=3,14)
    mask_ventricles = (data_ho == 3) | (data_ho == 14)
    tm_ventricles = extract_volume_mesh(mask_ventricles, affine_ho, '#a4c2f4', 'Ventricles')

    # -------------------------------------------------------------
    # 3. GLASSER 36 LANDMARK SNAPPING TO FSAVERAGE6 VERTICES
    # -------------------------------------------------------------
    print("\n[3/4] Snapping Glasser landmark nodes to real fsaverage6 mesh vertices...")
    pial_left_mesh = surface.load_surf_mesh(fs6['pial_left'])
    pial_right_mesh = surface.load_surf_mesh(fs6['pial_right'])
    
    snapped_data = {}
    for node_id, mni in GLASSER_36_MNI.items():
        is_subcortical = 'SUBCORTICAL' in node_id or 'HIPPOCAMPUS' in node_id or 'AMYGDALA' in node_id or 'ENTORHINAL' in node_id
        is_right = '_R_' in node_id
        
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
            target_pial = pial_right_mesh if is_right else pial_left_mesh
            target_tm = tm_right if is_right else tm_left
            target_coords = raw_coords_r if is_right else raw_coords_l
            
            dists = np.linalg.norm(target_pial.coordinates - np.array(mni), axis=1)
            closest_idx = int(np.argmin(dists))
            snapped_mni = target_pial.coordinates[closest_idx].tolist()
            snapped_three = target_coords[closest_idx].tolist()
            vert_norm = target_tm.vertex_normals[closest_idx].tolist()
            
            snapped_data[node_id] = {
                'mni': mni,
                'snapped_mni': snapped_mni,
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
    # 4. EXPORT UNIFIED 3D SLICER / HARVARD BRAIN ATLAS GLB
    # -------------------------------------------------------------
    print("\n[4/4] Assembling unified multi-object anatomical GLB...")
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
    
    print(f"  Exporting scene to {out_glb_path}...")
    glb_data = scene.export(file_type='glb')
    with open(out_glb_path, 'wb') as f:
        f.write(glb_data)
        
    file_size_mb = len(glb_data) / (1024 * 1024)
    print(f"\nSUCCESS! 3D Slicer / Harvard Anatomical Brain Atlas generated successfully.")
    print(f"GLB Model Size: {file_size_mb:.2f} MB")
    print(f"Total Subcortical & Cortical Structures: 9 distinct anatomical organs")
    print("=" * 70)

if __name__ == '__main__':
    main()
