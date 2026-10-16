import os
import json
import numpy as np
import sys
import trimesh
from nilearn import datasets, surface
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_anatomyka_brain import DESTRIEUX_COLOR_MAP

SCALE = 0.035
CENTER_MNI_Y = -17.85
CENTER_MNI_Z = 14.85

def mni_to_three_coords(coords_mni):
    three = np.zeros_like(coords_mni, dtype=np.float32)
    three[:, 0] = coords_mni[:, 0] * SCALE
    three[:, 1] = (coords_mni[:, 2] - CENTER_MNI_Z) * SCALE
    three[:, 2] = (coords_mni[:, 1] - CENTER_MNI_Y) * SCALE
    return three

def main():
    print("=" * 70)
    print("GENERATING CLEAN ATLAS PARCELLATION BORDERS & ANATOMICAL LANDMARKS")
    print("=" * 70)
    
    fs5 = datasets.fetch_surf_fsaverage('fsaverage5')
    destrieux = datasets.fetch_atlas_surf_destrieux()
    raw_labels = [l.decode() if isinstance(l, bytes) else l for l in destrieux.labels]
    
    # Load pial & inflated meshes
    pial_l = surface.load_surf_mesh(fs5['pial_left'])
    pial_r = surface.load_surf_mesh(fs5['pial_right'])
    infl_l = surface.load_surf_mesh(fs5['infl_left'])
    infl_r = surface.load_surf_mesh(fs5['infl_right'])
    
    # Three.js coordinates
    coords_pial_l = mni_to_three_coords(pial_l.coordinates)
    coords_pial_r = mni_to_three_coords(pial_r.coordinates)
    coords_infl_l = mni_to_three_coords(infl_l.coordinates)
    coords_infl_r = mni_to_three_coords(infl_r.coordinates)
    
    # CRITICAL: Flip faces winding order [0, 2, 1] so normals point OUTWARD!
    faces_l_flipped = pial_l.faces[:, [0, 2, 1]].copy()
    faces_r_flipped = pial_r.faces[:, [0, 2, 1]].copy()
    
    tm_l = trimesh.Trimesh(vertices=coords_pial_l, faces=faces_l_flipped, process=False)
    tm_r = trimesh.Trimesh(vertices=coords_pial_r, faces=faces_r_flipped, process=False)
    tm_infl_l = trimesh.Trimesh(vertices=coords_infl_l, faces=faces_l_flipped, process=False)
    tm_infl_r = trimesh.Trimesh(vertices=coords_infl_r, faces=faces_r_flipped, process=False)
    
    norms_l = tm_l.vertex_normals
    norms_r = tm_r.vertex_normals
    norms_infl_l = tm_infl_l.vertex_normals
    norms_infl_r = tm_infl_r.vertex_normals
    
    # Offset vertices along outward normal by 0.0035 Three.js units (~0.1mm)
    # This floats the line cleanly ABOVE the cortex surface with ZERO Z-fighting!
    OFFSET = 0.0032
    pial_offset_l = coords_pial_l + norms_l * OFFSET
    pial_offset_r = coords_pial_r + norms_r * OFFSET
    infl_offset_l = coords_infl_l + norms_infl_l * OFFSET
    infl_offset_r = coords_infl_r + norms_infl_r * OFFSET
    
    map_l = np.array(destrieux.map_left, dtype=int)
    map_r = np.array(destrieux.map_right, dtype=int)
    
    # Build functional color map per vertex
    # If two vertices belong to the same functional parcel (same color), no line is drawn inside the parcel!
    def get_parcel_color(label_idx):
        if label_idx < len(raw_labels):
            name = raw_labels[label_idx]
            return DESTRIEUX_COLOR_MAP.get(name, '#dfa89e')
        return '#dfa89e'
        
    color_array_l = [get_parcel_color(idx) for idx in map_l]
    color_array_r = [get_parcel_color(idx) for idx in map_r]
    
    # Also assign unique integer functional parcel IDs (0 to 19)
    unique_colors = sorted(list(set(DESTRIEUX_COLOR_MAP.values())))
    color_to_id = {c: i for i, c in enumerate(unique_colors)}
    
    parcel_ids_l = [color_to_id.get(c, 0) for c in color_array_l]
    parcel_ids_r = [color_to_id.get(c, 0) for c in color_array_r]
    
    # Temporal, Frontal, Parietal, Occipital color sets for landmark detection
    c_motor = '#f28b82'       # G_precentral (BA 4)
    c_sensory = '#8ab4f8'     # G_postcentral (BA 3,1,2)
    
    temporal_colors = {'#78d9ec', '#00e5ff', '#fde047', '#f59e0b', '#f472b6', '#93c5fd'}
    frontoparietal_colors = {'#81c995', '#fde293', '#fff59d', '#fed7aa', '#e9d5ff', '#fcad70', '#f28b82'}
    
    parietal_colors = {'#c084fc', '#d7aefb', '#fcad70'}
    occipital_colors = {'#ff8bcb', '#ccff90', '#a7f3d0'}
    
    calcarine_colors = {'#ff8bcb'} # V1 Calcarine
    medial_lingual_colors = {'#bae6fd', '#93c5fd', '#fdba74'}
    
    def process_hemi(faces, map_data, parcel_ids, color_array):
        edges_set = set()
        for f in faces:
            for i in range(3):
                u, v = sorted([int(f[i]), int(f[(i+1)%3])])
                edges_set.add((u, v))
                
        border_edges = []
        parcel_edges = {}
        for p_id in range(len(unique_colors)):
            parcel_edges[p_id] = []
            
        for u, v in edges_set:
            cu = color_array[u]
            cv = color_array[v]
            if cu != cv:
                # This edge is a true boundary between two distinct anatomical parcels!
                pu = parcel_ids[u]
                pv = parcel_ids[v]
                border_edges.append((u, v, cu, cv, pu, pv))
                parcel_edges[pu].extend([u, v])
                parcel_edges[pv].extend([u, v])
                
        # Flatten all border edges for BufferGeometry index
        border_indices = []
        for u, v, _, _, _, _ in border_edges:
            border_indices.extend([u, v])
            
        # 4 Universal Anatomical Landmarks:
        # 1. Surco Central de Rolando: Exact border between Motor (G_precentral #f28b82) and Sensory (G_postcentral #8ab4f8)
        central_indices = []
        for u, v, cu, cv, _, _ in border_edges:
            if {cu, cv} == {c_motor, c_sensory}:
                central_indices.extend([u, v])
                
        # 2. Cisura Lateral de Silvio: Exact border dividing Temporal lobe from Frontal/Parietal
        sylvian_indices = []
        for u, v, cu, cv, _, _ in border_edges:
            if (cu in temporal_colors and cv in frontoparietal_colors) or (cv in temporal_colors and cu in frontoparietal_colors):
                sylvian_indices.extend([u, v])
                
        # 3. Surco Parieto-Occipital: Dividing Parietal from Occipital lobe
        po_indices = []
        for u, v, cu, cv, _, _ in border_edges:
            if (cu in parietal_colors and cv in occipital_colors) or (cv in parietal_colors and cu in occipital_colors):
                po_indices.extend([u, v])
                
        # 4. Cisura Calcarina: Calcarine sulcus / V1 dividing from lingual/medial
        calc_indices = []
        for u, v, cu, cv, _, _ in border_edges:
            if (cu in calcarine_colors and cv in medial_lingual_colors) or (cv in calcarine_colors and cu in medial_lingual_colors):
                calc_indices.extend([u, v])
                
        # Parcel vertex map
        parcel_vertices = {}
        for p_id in range(len(unique_colors)):
            verts = np.where(np.array(parcel_ids) == p_id)[0].tolist()
            parcel_vertices[p_id] = verts
            
        return {
            'border_indices': border_indices,
            'parcel_edges': parcel_edges,
            'parcel_vertices': parcel_vertices,
            'landmarks': {
                'central_sulcus': central_indices,
                'sylvian_fissure': sylvian_indices,
                'parieto_occipital': po_indices,
                'calcarine': calc_indices,
            }
        }
        
    print("Processing left hemisphere...")
    left_data = process_hemi(faces_l_flipped, map_l, parcel_ids_l, color_array_l)
    print(f"  Left border edges: {len(left_data['border_indices']) // 2} (clean, no internal wireframe)")
    print(f"  Landmarks: Central={len(left_data['landmarks']['central_sulcus'])//2}, Sylvian={len(left_data['landmarks']['sylvian_fissure'])//2}, PO={len(left_data['landmarks']['parieto_occipital'])//2}, Calcarine={len(left_data['landmarks']['calcarine'])//2}")
    
    print("Processing right hemisphere...")
    right_data = process_hemi(faces_r_flipped, map_r, parcel_ids_r, color_array_r)
    print(f"  Right border edges: {len(right_data['border_indices']) // 2}")
    
    # Map Glasser 36 nodes to functional parcel IDs
    glasser_snapped = {}
    if os.path.exists('scripts/glasser_36_snapped.json'):
        with open('scripts/glasser_36_snapped.json') as f:
            glasser_snapped = json.load(f)
            
    glasser_to_destrieux = {}
    destrieux_to_glasser = {}
    for g_id, g_info in glasser_snapped.items():
        v = g_info.get('vertex_index', -1)
        if 0 <= v < len(parcel_ids_l):
            p_id = int(parcel_ids_l[v])
            glasser_to_destrieux[g_id] = p_id
            destrieux_to_glasser[str(p_id)] = g_id
            
    # Explicit mapping for key Brodmann areas to their exact functional parcel ID
    key_mappings = {
        'GLASSER_4': color_to_id.get('#f28b82', 0),      # Giro Precentral (M1 / Área 4)
        'BA_4': color_to_id.get('#f28b82', 0),
        'GLASSER_3B_1': color_to_id.get('#8ab4f8', 0),   # Giro Postcentral (S1 / Área 3,1,2)
        'BA_312': color_to_id.get('#8ab4f8', 0),
        'GLASSER_44': color_to_id.get('#81c995', 0),     # Broca Pars Opercularis
        'BA_44': color_to_id.get('#81c995', 0),
        'GLASSER_45': color_to_id.get('#81c995', 0),     # Broca Pars Triangularis
        'BA_45': color_to_id.get('#81c995', 0),
        'GLASSER_DLPFC': color_to_id.get('#fed7aa', 0),  # Giro Frontal Medio (DLPFC BA 9/46)
        'BA_9_46': color_to_id.get('#fed7aa', 0),
        'GLASSER_STV': color_to_id.get('#78d9ec', 0),    # Giro Temporal Superior (Wernicke BA 22)
        'BA_22': color_to_id.get('#78d9ec', 0),
        'GLASSER_TE1P': color_to_id.get('#fde047', 0),   # Giro Temporal Medio (BA 21)
        'BA_21': color_to_id.get('#fde047', 0),
        'GLASSER_V1': color_to_id.get('#ff8bcb', 0),     # Corteza Visual Primaria V1 (BA 17)
        'BA_17': color_to_id.get('#ff8bcb', 0),
        'GLASSER_PG_IPL': color_to_id.get('#d7aefb', 0), # Giro Angular (BA 39)
        'BA_39': color_to_id.get('#d7aefb', 0),
        'GLASSER_PSL': color_to_id.get('#fcad70', 0),    # Giro Supramarginal (BA 40)
        'BA_40': color_to_id.get('#fcad70', 0),
    }
    for k, v in key_mappings.items():
        glasser_to_destrieux[k] = v
        destrieux_to_glasser[str(v)] = k

    out_json = {
        'labels': raw_labels,
        'map_l': parcel_ids_l,
        'map_r': parcel_ids_r,
        'pial_offset_l': pial_offset_l.round(5).tolist(),
        'pial_offset_r': pial_offset_r.round(5).tolist(),
        'infl_offset_l': infl_offset_l.round(5).tolist(),
        'infl_offset_r': infl_offset_r.round(5).tolist(),
        'border_indices_l': left_data['border_indices'],
        'border_indices_r': right_data['border_indices'],
        'landmarks_l': left_data['landmarks'],
        'landmarks_r': right_data['landmarks'],
        'parcel_edges_l': left_data['parcel_edges'],
        'parcel_edges_r': right_data['parcel_edges'],
        'parcel_vertices_l': left_data['parcel_vertices'],
        'parcel_vertices_r': right_data['parcel_vertices'],
        'glasser_to_destrieux': glasser_to_destrieux,
        'destrieux_to_glasser': destrieux_to_glasser,
    }
    
    out_path = 'public/models/cortical_borders.json'
    print(f"\nSaving clean borders to {out_path}...")
    with open(out_path, 'w') as f:
        json.dump(out_json, f)
        
    print(f"File size: {os.path.getsize(out_path) / (1024*1024):.2f} MB")
    print("SUCCESS: Functional parcel boundaries and landmarks generated!")

if __name__ == '__main__':
    main()
