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

# MNI coordinates of the 15 regions
NODES_MNI = {
    'GLASSER_44': [-50, 18, 16],
    'GLASSER_4': [-38, -20, 54],
    'GLASSER_3B_1': [-42, -26, 52],
    'GLASSER_PSL_STV': [-56, -38, 12],
    'GLASSER_V1': [-12, -88, 2],
    'GLASSER_FEF': [-32, 2, 52],
    'GLASSER_DLPFC': [-42, 36, 30],
    'GLASSER_CINGULATE': [-6, 12, 38],
    'GLASSER_INSULA': [-34, 18, 2],
    'GLASSER_HIPPOCAMPUS': [-26, -22, -14],
    'SUBCORTICAL_THALAMUS': [-12, -18, 8],
    'SUBCORTICAL_STRIATUM': [-22, 8, 4],
    'GLASSER_R_44': [50, 18, 16],
    'GLASSER_R_V1': [12, -88, 2],
    'GLASSER_R_4': [38, -20, 54],
}

def create_cerebellum():
    # Cerebellum in posterior infratentorial fossa
    # Position in centered Three.js space:
    # MNI Y: -55 to -85 -> Z_three ~ -1.3 to -2.35
    # MNI Z: -20 to -50 -> Y_three ~ -1.2 to -2.25
    cerebellum_left = trimesh.creation.icosphere(subdivisions=3, radius=0.65)
    v_l = cerebellum_left.vertices.copy()
    v_l[:, 0] = -0.75 + v_l[:, 0] * 0.95
    v_l[:, 1] = -1.35 + v_l[:, 1] * 0.65 + np.sin(v_l[:, 1] * 32.0) * 0.02
    v_l[:, 2] = -1.85 + v_l[:, 2] * 0.85
    cerebellum_left.vertices = v_l
    
    cerebellum_right = trimesh.creation.icosphere(subdivisions=3, radius=0.65)
    v_r = cerebellum_right.vertices.copy()
    v_r[:, 0] = 0.75 + v_r[:, 0] * 0.95
    v_r[:, 1] = -1.35 + v_r[:, 1] * 0.65 + np.sin(v_r[:, 1] * 32.0) * 0.02
    v_r[:, 2] = -1.85 + v_r[:, 2] * 0.85
    cerebellum_right.vertices = v_r
    
    cerebellum = cerebellum_left + cerebellum_right
    colors = np.zeros((len(cerebellum.vertices), 4), dtype=np.uint8)
    for i, vert in enumerate(cerebellum.vertices):
        folia = int(120 + np.sin(vert[1] * 35.0) * 45)
        colors[i] = [18, 55 + int(folia * 0.35), 90 + int(folia * 0.45), 255]
    cerebellum.visual.vertex_colors = colors
    cerebellum.metadata['name'] = 'Cerebellum'
    return cerebellum

def create_brainstem():
    # Brainstem descending from diencephalon
    # Midbrain
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
    colors = np.zeros((len(stem.vertices), 4), dtype=np.uint8)
    colors[:] = [15, 65, 105, 255]
    stem.visual.vertex_colors = colors
    stem.metadata['name'] = 'Brainstem'
    return stem

def generate_brain_glb():
    os.makedirs("public/models", exist_ok=True)
    out_glb_path = "public/models/brain_mni152.glb"
    
    print("Fetching FreeSurfer fsaverage5 surfaces from nilearn...")
    fsaverage = datasets.fetch_surf_fsaverage('fsaverage5')
    
    mesh_left = surface.load_surf_mesh(fsaverage['pial_left'])
    mesh_right = surface.load_surf_mesh(fsaverage['pial_right'])
    
    sulc_left = surface.load_surf_data(fsaverage['sulc_left'])
    sulc_right = surface.load_surf_data(fsaverage['sulc_right'])
    
    print(f"Left mesh: {len(mesh_left.coordinates)} vertices, {len(mesh_left.faces)} faces")
    print(f"Right mesh: {len(mesh_right.coordinates)} vertices, {len(mesh_right.faces)} faces")
    
    # Transform vertices to centered Three.js space
    coords_l = np.zeros_like(mesh_left.coordinates, dtype=np.float32)
    coords_l[:, 0] = mesh_left.coordinates[:, 0] * SCALE
    coords_l[:, 1] = (mesh_left.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_l[:, 2] = (mesh_left.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    coords_r = np.zeros_like(mesh_right.coordinates, dtype=np.float32)
    coords_r[:, 0] = mesh_right.coordinates[:, 0] * SCALE
    coords_r[:, 1] = (mesh_right.coordinates[:, 2] - CENTER_MNI_Z) * SCALE
    coords_r[:, 2] = (mesh_right.coordinates[:, 1] - CENTER_MNI_Y) * SCALE

    # Snap nodes to surface
    snapped_positions = {}
    for node_id, mni in NODES_MNI.items():
        is_subcortical = 'SUBCORTICAL' in node_id or 'HIPPOCAMPUS' in node_id
        if is_subcortical:
            # Subcortical nodes remain at deep anatomical coordinates
            snapped_positions[node_id] = mni_to_three(*mni)
        else:
            is_right = '_R_' in node_id
            target_mesh = mesh_right if is_right else mesh_left
            dists = np.linalg.norm(target_mesh.coordinates - np.array(mni), axis=1)
            closest_idx = int(np.argmin(dists))
            snapped_mni = target_mesh.coordinates[closest_idx]
            snapped_positions[node_id] = mni_to_three(*snapped_mni)
            print(f"Node {node_id} snapped to surface vertex #{closest_idx} (dist {dists[closest_idx]:.2f} mm): {snapped_positions[node_id]}")

    # Save snapped positions for mockGlasserData.ts
    with open("scripts/snapped_positions.json", "w") as f:
        json.dump(snapped_positions, f, indent=2)

    # FreeSurfer sulcal depth ambient occlusion vertex colors
    def compute_vertex_colors(sulc, is_left):
        s_norm = np.clip((sulc + 1.25) / 2.5, 0.0, 1.0)
        colors = np.zeros((len(sulc), 4), dtype=np.uint8)
        
        for i, val in enumerate(s_norm):
            if is_left:
                # Left: Glasser clinical mode
                # Deep sulcus #0a1828 -> Gyrus crest #38bdf8
                r = int(10 + val * 45)
                g = int(32 + val * 155)
                b = int(60 + val * 190)
            else:
                # Right: Deep tractography sheath mode
                # Translucent deep crystal slate
                r = int(8 + val * 24)
                g = int(22 + val * 65)
                b = int(45 + val * 105)
            colors[i] = [r, g, b, 255]
        return colors

    vcolors_l = compute_vertex_colors(sulc_left, is_left=True)
    vcolors_r = compute_vertex_colors(sulc_right, is_left=False)

    tm_left = trimesh.Trimesh(
        vertices=coords_l,
        faces=mesh_left.faces,
        vertex_colors=vcolors_l,
        process=True
    )
    tm_left.metadata['name'] = 'Hemisphere_Left'

    tm_right = trimesh.Trimesh(
        vertices=coords_r,
        faces=mesh_right.faces,
        vertex_colors=vcolors_r,
        process=True
    )
    tm_right.metadata['name'] = 'Hemisphere_Right'

    tm_left.fix_normals()
    tm_right.fix_normals()

    cerebellum = create_cerebellum()
    brainstem = create_brainstem()

    # Unified scene (NO artificial rigid box!)
    scene = trimesh.Scene()
    scene.add_geometry(tm_left, node_name='Hemisphere_Left')
    scene.add_geometry(tm_right, node_name='Hemisphere_Right')
    scene.add_geometry(cerebellum, node_name='Cerebellum')
    scene.add_geometry(brainstem, node_name='Brainstem')

    print(f"Exporting clean anatomical GLB to {out_glb_path}...")
    glb_data = scene.export(file_type='glb')
    with open(out_glb_path, 'wb') as f:
        f.write(glb_data)
        
    print(f"Success! Model size: {len(glb_data) / (1024*1024):.2f} MB")

if __name__ == '__main__':
    generate_brain_glb()
