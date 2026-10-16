import os
import json
import numpy as np
import trimesh
from nilearn import datasets, surface

# Scale to fit standard Three.js viewport
SCALE = 0.035
# Anatomical center offset in MNI space
CENTER_MNI_Y = -17.85  # A-P center
CENTER_MNI_Z = 14.85   # S-I center

def mni_to_three(x, y, z):
    return [
        float(x * SCALE),
        float((z - CENTER_MNI_Z) * SCALE),
        float((y - CENTER_MNI_Y) * SCALE)
    ]

# 36 Key regions of the Glasser HCP-MMP1.0 Atlas & Subcortical Nuclei
GLASSER_36_MNI = {
    # 1. LANGUAGE & AUDITORY SYSTEM
    'GLASSER_44': [-50, 18, 16],        # Broca Pars Opercularis
    'GLASSER_45': [-48, 28, 6],         # Broca Pars Triangularis
    'GLASSER_PSL': [-56, -40, 14],      # Perisylvian Language Area
    'GLASSER_STV': [-54, -48, 16],      # Superior Temporal Visual/Language Area
    'GLASSER_A1': [-44, -20, 8],        # Primary Auditory Cortex (Heschl's Gyrus)
    'GLASSER_PBELT': [-52, -22, 6],     # Parabelt Auditory Association
    'GLASSER_55B': [-42, 6, 44],        # Area 55b (Premotor Language Hub)

    # 2. MOTOR & SOMATOSENSORY SYSTEM
    'GLASSER_4': [-38, -20, 54],        # M1 Primary Motor Cortex
    'GLASSER_6D_SMA': [-26, -6, 58],    # Premotor & Supplementary Motor Area (SMA)
    'GLASSER_FEF': [-32, 2, 52],        # Frontal Eye Fields (8Ad)
    'GLASSER_3B_1': [-42, -26, 52],     # S1 Primary Somatosensory Cortex
    'GLASSER_5M_7AL': [-18, -48, 62],   # Posterior Parietal Cortex

    # 3. VISUAL SYSTEM (DORSAL & VENTRAL)
    'GLASSER_V1': [-12, -88, 2],        # V1 Primary Visual (Calcarine)
    'GLASSER_V2_V3': [-16, -92, 14],    # V2/V3 Extrastriate Visual Cortex
    'GLASSER_V4': [-28, -78, -12],      # V4 Color & Form Processing
    'GLASSER_MT_V5': [-46, -68, 4],     # MT/V5 Motion Perception
    'GLASSER_FFC': [-38, -54, -18],     # Fusiform Face Complex

    # 4. EXECUTIVE, PREFRONTAL & SALIENCE SYSTEM
    'GLASSER_DLPFC': [-42, 36, 30],     # Area 9-46d (DLPFC)
    'GLASSER_10R_PP': [-24, 56, 12],    # Frontopolar Cortex (10r/10pp)
    'GLASSER_47L_OFC': [-36, 32, -10],  # Orbitofrontal Cortex (47l)
    'GLASSER_AVI': [-34, 18, 2],        # Anterior Ventral Insula (Salience Hub)
    'GLASSER_POI1': [-38, -14, 12],     # Posterior Insula (Interoception & Pain)

    # 5. LIMBIC & DEFAULT MODE NETWORK (DMN)
    'GLASSER_24DD_ACC': [-6, 16, 36],   # Dorsal Anterior Cingulate Cortex
    'GLASSER_23D_PCC': [-8, -52, 28],   # Posterior Cingulate Cortex / Precuneus
    'GLASSER_HIPPOCAMPUS': [-26, -22, -14], # Hippocampal Complex (CA1-CA3/Subiculum)
    'GLASSER_AMYGDALA': [-22, -6, -18],     # Amygdaloid Complex
    'GLASSER_ENTORHINAL': [-20, -10, -28],  # Entorhinal Cortex

    # 6. SUBCORTICAL NUCLEI & BRAINSTEM RELAYS
    'SUBCORTICAL_THALAMUS': [-12, -18, 8], # Dorsal Thalamus (VPL/VPM/LGN/Pulvinar)
    'SUBCORTICAL_STRIATUM': [-20, 8, 4],   # Striatum (Caudate & Putamen)
    'SUBCORTICAL_GP': [-18, -4, 0],        # Globus Pallidus (GPi/GPe)
    'SUBCORTICAL_STN': [-11, -14, -6],     # Subthalamic Nucleus (STN)
    'SUBCORTICAL_SN': [-10, -20, -10],     # Substantia Nigra
    'SUBCORTICAL_BRAINSTEM_NUC': [0, -32, -22], # Locus Coeruleus & Raphe

    # 7. RIGHT HEMISPHERE HOMOLOGUES
    'GLASSER_R_44': [50, 18, 16],       # Right Broca (Affective Prosody)
    'GLASSER_R_4': [38, -20, 54],       # Right M1 Motor Cortex
    'GLASSER_R_V1': [12, -88, 2],       # Right V1 Visual Cortex
    'GLASSER_R_A1': [44, -20, 8],       # Right Primary Auditory
}

def create_cerebellum():
    # Cerebellum in posterior infratentorial fossa with horizontal folia grooves
    cerebellum_left = trimesh.creation.icosphere(subdivisions=3, radius=0.68)
    v_l = cerebellum_left.vertices.copy()
    v_l[:, 0] = -0.75 + v_l[:, 0] * 0.95
    v_l[:, 1] = -1.35 + v_l[:, 1] * 0.65 + np.sin(v_l[:, 1] * 32.0) * 0.02
    v_l[:, 2] = -1.85 + v_l[:, 2] * 0.85
    cerebellum_left.vertices = v_l
    
    cerebellum_right = trimesh.creation.icosphere(subdivisions=3, radius=0.68)
    v_r = cerebellum_right.vertices.copy()
    v_r[:, 0] = 0.75 + v_r[:, 0] * 0.95
    v_r[:, 1] = -1.35 + v_r[:, 1] * 0.65 + np.sin(v_r[:, 1] * 32.0) * 0.02
    v_r[:, 2] = -1.85 + v_r[:, 2] * 0.85
    cerebellum_right.vertices = v_r
    
    cerebellum = cerebellum_left + cerebellum_right
    _ = cerebellum.vertex_normals
    colors = np.zeros((len(cerebellum.vertices), 4), dtype=np.uint8)
    for i, vert in enumerate(cerebellum.vertices):
        folia = np.sin(vert[1] * 40.0) * 0.5 + 0.5
        r = int(12 + folia * 18)
        g = int(35 + folia * 45)
        b = int(70 + folia * 75)
        colors[i] = [r, g, b, 255]
    cerebellum.visual.vertex_colors = colors
    cerebellum.metadata['name'] = 'Cerebellum'
    return cerebellum

def create_brainstem():
    # Anatomical Brainstem: Midbrain, Pons Belly, and Medulla Oblongata
    midbrain = trimesh.creation.cylinder(radius=0.28, height=0.45, sections=24)
    midbrain.apply_translation([0, -0.75, -0.75])
    
    # Pons belly
    pons = trimesh.creation.icosphere(subdivisions=2, radius=0.4)
    pv = pons.vertices.copy()
    pv[:, 0] *= 0.85
    pv[:, 1] = -1.2 + pv[:, 1] * 0.8
    pv[:, 2] = -0.65 + pv[:, 2] * 1.15
    pons.vertices = pv
    
    # Medulla
    medulla = trimesh.creation.cylinder(radius=0.22, height=0.75, sections=20)
    medulla.apply_translation([0, -1.8, -0.85])
    
    stem = midbrain + pons + medulla
    _ = stem.vertex_normals
    colors = np.zeros((len(stem.vertices), 4), dtype=np.uint8)
    colors[:] = [15, 65, 105, 255]
    stem.visual.vertex_colors = colors
    stem.metadata['name'] = 'Brainstem'
    return stem

def create_anatomical_corpus_callosum():
    # Smooth, thin anatomical C-shaped commissural ribbon bridging the medial walls
    theta = np.linspace(-0.3, np.pi + 0.3, 36)
    radii_y = 0.55
    radii_z = 0.85
    y_center = 0.35
    z_center = -0.15
    
    curve_points = []
    for t in theta:
        py = y_center + np.sin(t) * radii_y
        pz = z_center + np.cos(t) * radii_z
        curve_points.append([py, pz])
        
    verts = []
    faces = []
    width = 0.05
    for i, (py, pz) in enumerate(curve_points):
        verts.append([-width, py, pz])
        verts.append([width, py, pz])
        if i > 0:
            idx = i * 2
            faces.append([idx - 2, idx, idx - 1])
            faces.append([idx - 1, idx, idx + 1])
            
    callosum = trimesh.Trimesh(vertices=verts, faces=faces, process=False)
    _ = callosum.vertex_normals
    colors = np.zeros((len(verts), 4), dtype=np.uint8)
    colors[:] = [180, 220, 245, 180]
    callosum.visual.vertex_colors = colors
    callosum.metadata['name'] = 'Corpus_Callosum'
    return callosum

def generate_neuro_assets():
    os.makedirs("public/models", exist_ok=True)
    os.makedirs("scripts", exist_ok=True)
    out_glb_path = "public/models/brain_mni152.glb"
    out_inflated_path = "public/models/inflated_offsets.json"
    out_snapped_path = "scripts/glasser_36_snapped.json"
    
    print("Fetching FreeSurfer fsaverage5 surfaces from nilearn...")
    fsaverage = datasets.fetch_surf_fsaverage('fsaverage5')
    
    mesh_left_pial = surface.load_surf_mesh(fsaverage['pial_left'])
    mesh_right_pial = surface.load_surf_mesh(fsaverage['pial_right'])
    mesh_left_infl = surface.load_surf_mesh(fsaverage['infl_left'])
    mesh_right_infl = surface.load_surf_mesh(fsaverage['infl_right'])
    
    sulc_left = surface.load_surf_data(fsaverage['sulc_left'])
    sulc_right = surface.load_surf_data(fsaverage['sulc_right'])
    
    n_verts_l = len(mesh_left_pial.coordinates)
    n_verts_r = len(mesh_right_pial.coordinates)
    print(f"Pial Left: {n_verts_l} vertices, {len(mesh_left_pial.faces)} faces")
    print(f"Pial Right: {n_verts_r} vertices, {len(mesh_right_pial.faces)} faces")
    
    # Transform coordinates to centered Three.js space
    coords_l_pial = np.zeros_like(mesh_left_pial.coordinates, dtype=np.float32)
    coords_l_pial[:, 0] = mesh_left_pial.coordinates[:, 0] * SCALE
    coords_l_pial[:, 1] = (mesh_left_pial.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_l_pial[:, 2] = (mesh_left_pial.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    coords_r_pial = np.zeros_like(mesh_right_pial.coordinates, dtype=np.float32)
    coords_r_pial[:, 0] = mesh_right_pial.coordinates[:, 0] * SCALE
    coords_r_pial[:, 1] = (mesh_right_pial.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_r_pial[:, 2] = (mesh_right_pial.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    coords_l_infl = np.zeros_like(mesh_left_infl.coordinates, dtype=np.float32)
    coords_l_infl[:, 0] = mesh_left_infl.coordinates[:, 0] * SCALE
    coords_l_infl[:, 1] = (mesh_left_infl.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_l_infl[:, 2] = (mesh_left_infl.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    coords_r_infl = np.zeros_like(mesh_right_infl.coordinates, dtype=np.float32)
    coords_r_infl[:, 0] = mesh_right_infl.coordinates[:, 0] * SCALE
    coords_r_infl[:, 1] = (mesh_right_infl.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_r_infl[:, 2] = (mesh_right_infl.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    # Save inflated coordinate offsets for instant GPU morphing
    inflated_data = {
        'left_inflated': coords_l_infl.tolist(),
        'right_inflated': coords_r_infl.tolist()
    }
    with open(out_inflated_path, 'w') as f:
        json.dump(inflated_data, f)
    print(f"Saved inflated coordinates to {out_inflated_path}")

    # FLIP FACE VERTEX ORDER [0, 2, 1] to compensate for Y-Z swap and guarantee OUTWARD normals
    faces_l_flipped = mesh_left_pial.faces[:, [0, 2, 1]].copy()
    faces_r_flipped = mesh_right_pial.faces[:, [0, 2, 1]].copy()

    # Sulcal depth vertex colors (Dark blue sulci -> Cyan gyrus crests)
    def compute_sulcal_colors(sulc, is_left):
        s_norm = np.clip((sulc + 1.25) / 2.5, 0.0, 1.0)
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        for i, val in enumerate(s_norm):
            if is_left:
                # Left Hem: Deep sulcus #0a1e35 -> Gyrus crest #38bdf8
                r = int(10 + val * 46)
                g = int(30 + val * 160)
                b = int(55 + val * 195)
            else:
                # Right Hem: Crystal cyan-slate
                r = int(8 + val * 24)
                g = int(24 + val * 60)
                b = int(48 + val * 96)
            colors[i] = [r, g, b, 255]
        return colors

    vcolors_l = compute_sulcal_colors(sulc_left, is_left=True)
    vcolors_r = compute_sulcal_colors(sulc_right, is_left=False)

    # Build meshes with process=False to strictly preserve 10,242 vertex index order
    tm_left = trimesh.Trimesh(
        vertices=coords_l_pial,
        faces=faces_l_flipped,
        vertex_colors=vcolors_l,
        process=False
    )
    _ = tm_left.vertex_normals # trigger computation of smooth vertex normals
    tm_left.metadata['name'] = 'Hemisphere_Left'

    tm_right = trimesh.Trimesh(
        vertices=coords_r_pial,
        faces=faces_r_flipped,
        vertex_colors=vcolors_r,
        process=False
    )
    _ = tm_right.vertex_normals
    tm_right.metadata['name'] = 'Hemisphere_Right'

    print(f"Left watertight: {tm_left.is_watertight}, Volume: {tm_left.volume:.2f}")
    print(f"Right watertight: {tm_right.is_watertight}, Volume: {tm_right.volume:.2f}")

    # Snapping 36 Glasser & subcortical regions to real mesh vertices using true vertex normals
    snapped_data = {}
    for node_id, mni in GLASSER_36_MNI.items():
        is_subcortical = 'SUBCORTICAL' in node_id or 'HIPPOCAMPUS' in node_id or 'AMYGDALA' in node_id or 'ENTORHINAL' in node_id
        is_right = '_R_' in node_id
        
        if is_subcortical:
            three_pos = mni_to_three(*mni)
            snapped_data[node_id] = {
                'mni': mni,
                'position': three_pos,
                'vertex_index': -1,
                'normal': [0.0, 1.0, 0.0],
                'is_subcortical': True
            }
        else:
            target_pial = mesh_right_pial if is_right else mesh_left_pial
            target_tm = tm_right if is_right else tm_left
            target_coords = coords_r_pial if is_right else coords_l_pial
            
            dists = np.linalg.norm(target_pial.coordinates - np.array(mni), axis=1)
            closest_idx = int(np.argmin(dists))
            snapped_mni = target_pial.coordinates[closest_idx].tolist()
            snapped_three = target_coords[closest_idx].tolist()
            
            # True surface normal from mesh vertex normal
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
    print(f"Saved 36 snapped regions with true surface normals to {out_snapped_path}")

    cerebellum = create_cerebellum()
    brainstem = create_brainstem()
    callosum = create_anatomical_corpus_callosum()

    scene = trimesh.Scene()
    scene.add_geometry(tm_left, node_name='Hemisphere_Left')
    scene.add_geometry(tm_right, node_name='Hemisphere_Right')
    scene.add_geometry(cerebellum, node_name='Cerebellum')
    scene.add_geometry(brainstem, node_name='Brainstem')
    scene.add_geometry(callosum, node_name='Corpus_Callosum')

    print(f"Exporting clean anatomical GLB with outward normals to {out_glb_path}...")
    glb_data = scene.export(file_type='glb')
    with open(out_glb_path, 'wb') as f:
        f.write(glb_data)
        
    print(f"Success! Model size: {len(glb_data) / (1024*1024):.2f} MB")

if __name__ == '__main__':
    generate_neuro_assets()
