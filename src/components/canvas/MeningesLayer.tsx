import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY } from '../../utils/hoverTint';

/**
 * Genera la geometría anatómica de la Hoz del Cerebro (Falx Cerebri).
 * Tabique sagital vertical membranoso en forma de hoz con grosor dural.
 */
function createFalxGeometry(): THREE.BufferGeometry {
  const steps = 40;
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  // Puntos clave de la curvatura superior convexa (Crista galli -> Bóveda -> Protuberancia Occipital)
  const outerCurvePts = [
    new THREE.Vector3(0, 1.55, -0.10), // Crista Galli
    new THREE.Vector3(0, 1.72, 0.42),  // Polo frontal superior
    new THREE.Vector3(0, 1.35, 0.95),  // Bregma
    new THREE.Vector3(0, 0.55, 1.18),  // Vértice parietal
    new THREE.Vector3(0, -0.45, 1.15), // Parietooccipital
    new THREE.Vector3(0, -1.35, 0.85), // Lambda
    new THREE.Vector3(0, -1.85, 0.22), // Protuberancia Occipital Interna / Confluencia
  ];
  const outerSpline = new THREE.CatmullRomCurve3(outerCurvePts, false, 'centripetal', 0.5);

  // Puntos clave de la curvatura inferior cóncava libre (cabalga sobre el cuerpo calloso)
  const innerCurvePts = [
    new THREE.Vector3(0, 1.38, 0.02),
    new THREE.Vector3(0, 1.15, 0.38),  // Delante de la rodilla del cuerpo calloso
    new THREE.Vector3(0, 0.50, 0.52),  // Sobre el tronco del cuerpo calloso
    new THREE.Vector3(0, -0.35, 0.48), // Cíngulo posterior
    new THREE.Vector3(0, -1.05, 0.28), // Sobre el esplenio
    new THREE.Vector3(0, -1.85, 0.22), // Encuentro en la protuberancia occipital
  ];
  const innerSpline = new THREE.CatmullRomCurve3(innerCurvePts, false, 'centripetal', 0.5);

  const halfThickness = 0.012; // Grosor dural laminar

  // Generar tiras izquierda (-x) y derecha (+x)
  for (let s = 0; s < 2; s++) {
    const xOffset = s === 0 ? -halfThickness : halfThickness;
    const normX = s === 0 ? -1 : 1;

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const pOuter = outerSpline.getPointAt(u);
      const pInner = innerSpline.getPointAt(u);

      // Vértice externo
      positions.push(pOuter.x + xOffset, pOuter.y, pOuter.z);
      normals.push(normX, 0, 0);

      // Vértice interno
      positions.push(pInner.x + xOffset, pInner.y, pInner.z);
      normals.push(normX, 0, 0);
    }
  }

  // Triángulos caras laterales
  for (let s = 0; s < 2; s++) {
    const baseVertex = s * (steps + 1) * 2;
    for (let i = 0; i < steps; i++) {
      const v0 = baseVertex + i * 2;
      const v1 = baseVertex + i * 2 + 1;
      const v2 = baseVertex + (i + 1) * 2;
      const v3 = baseVertex + (i + 1) * 2 + 1;

      if (s === 0) {
        indices.push(v0, v2, v1);
        indices.push(v1, v2, v3);
      } else {
        indices.push(v0, v1, v2);
        indices.push(v1, v3, v2);
      }
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

/**
 * Genera la geometría de la Tienda del Cerebelo (Tentorium Cerebelli).
 * Tabique transversal cóncavo-convexo en tienda de campaña con escotadura tentorial libre anterior.
 */
function createTentoriumGeometry(): THREE.BufferGeometry {
  const stepsU = 24; // De medial a lateral
  const stepsV = 20; // De anterior (escotadura) a posterior (hueso occipital)
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= stepsU; i++) {
    const u = i / stepsU; // 0 (izq) -> 0.5 (centro) -> 1 (der)
    const xRatio = (u - 0.5) * 2.0; // -1 a +1
    const xAbs = Math.abs(xRatio);

    for (let j = 0; j <= stepsV; j++) {
      const v = j / stepsV; // 0 (anterior / escotadura) a 1 (periférico / seno transverso)

      // Escotadura tentorial en V (v = 0): rodea el mesencéfalo
      const notchX = xRatio * 0.38;
      const notchY = -0.75 - Math.pow(xAbs, 1.8) * 0.15;
      const notchZ = -0.10 - Math.pow(xAbs, 1.5) * 0.08;

      // Borde periférico (v = 1): fijación ósea occipital y peñasco
      const periphX = xRatio * (1.65 - (1 - v) * 0.3);
      const periphY = -1.25 - (1 - xAbs) * 0.60; // Desciende hacia la confluencia occipital (-1.85)
      const periphZ = 0.22 - Math.pow(xAbs, 1.2) * 0.65; // Tienda inclinada: más alta en el centro

      // Interpolación suave cuadrática
      const posX = THREE.MathUtils.lerp(notchX, periphX, Math.pow(v, 0.85));
      const posY = THREE.MathUtils.lerp(notchY, periphY, v);
      const posZ = THREE.MathUtils.lerp(notchZ, periphZ, Math.pow(v, 0.9));

      positions.push(posX, posY, posZ);
    }
  }

  for (let i = 0; i < stepsU; i++) {
    for (let j = 0; j < stepsV; j++) {
      const a = i * (stepsV + 1) + j;
      const b = (i + 1) * (stepsV + 1) + j;
      const c = (i + 1) * (stepsV + 1) + (j + 1);
      const d = i * (stepsV + 1) + (j + 1);

      // Doble cara para visualización supra e infratentorial
      indices.push(a, b, d);
      indices.push(b, c, d);
      indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

/**
 * Genera tubos para los senos venosos durales:
 * - Seno Sagital Superior
 * - Seno Recto
 * - Senos Transversos Bilaterales
 */
function createSinusGeometries(): { id: string; name: string; geom: THREE.BufferGeometry }[] {
  // 1. Seno Sagital Superior
  const sssPts = [
    new THREE.Vector3(0, 1.55, -0.10),
    new THREE.Vector3(0, 1.74, 0.42),
    new THREE.Vector3(0, 1.36, 0.96),
    new THREE.Vector3(0, 0.56, 1.20),
    new THREE.Vector3(0, -0.45, 1.16),
    new THREE.Vector3(0, -1.35, 0.86),
    new THREE.Vector3(0, -1.85, 0.22),
  ];
  const sssCurve = new THREE.CatmullRomCurve3(sssPts, false, 'centripetal', 0.5);
  const sssGeo = new THREE.TubeGeometry(sssCurve, 32, 0.038, 8, false);

  // 2. Seno Recto (unión de hoz y tienda)
  const rectusPts = [
    new THREE.Vector3(0, -1.05, 0.28), // Origen en el esplenio
    new THREE.Vector3(0, -1.45, 0.25),
    new THREE.Vector3(0, -1.85, 0.22), // Tórcula de Herófilo / Confluencia
  ];
  const rectusCurve = new THREE.CatmullRomCurve3(rectusPts, false, 'catmullrom', 0.5);
  const rectusGeo = new THREE.TubeGeometry(rectusCurve, 16, 0.028, 8, false);

  // 3. Seno Transverso Izquierdo
  const transLPts = [
    new THREE.Vector3(0, -1.85, 0.22),
    new THREE.Vector3(-0.55, -1.80, 0.08),
    new THREE.Vector3(-1.15, -1.62, -0.15),
    new THREE.Vector3(-1.58, -1.32, -0.42),
  ];
  const transLCurve = new THREE.CatmullRomCurve3(transLPts, false, 'centripetal', 0.5);
  const transLGeo = new THREE.TubeGeometry(transLCurve, 20, 0.034, 8, false);

  // 4. Seno Transverso Derecho
  const transRPts = [
    new THREE.Vector3(0, -1.85, 0.22),
    new THREE.Vector3(0.55, -1.80, 0.08),
    new THREE.Vector3(1.15, -1.62, -0.15),
    new THREE.Vector3(1.58, -1.32, -0.42),
  ];
  const transRCurve = new THREE.CatmullRomCurve3(transRPts, false, 'centripetal', 0.5);
  const transRGeo = new THREE.TubeGeometry(transRCurve, 20, 0.034, 8, false);

  return [
    { id: 'Sinus_Sagittal_Sup', name: 'Seno Sagital Superior (Dural)', geom: sssGeo },
    { id: 'Sinus_Rectus', name: 'Seno Recto (Unión de Hoz y Tienda)', geom: rectusGeo },
    { id: 'Sinus_Transverse_L', name: 'Seno Transverso Izquierdo', geom: transLGeo },
    { id: 'Sinus_Transverse_R', name: 'Seno Transverso Derecho', geom: transRGeo },
  ];
}

interface DissectableMeningeMeshProps {
  id: string;
  name: string;
  geometry: THREE.BufferGeometry;
  baseColor: string;
  isSinus?: boolean;
}

const DissectableMeningeMesh: React.FC<DissectableMeningeMeshProps> = ({
  id,
  name,
  geometry,
  baseColor,
  isSinus = false,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } =
    useDissectable(id, name);
  const meningesMode = useNeuroStore((state) => state.meningesMode);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);

  if (!isVisible) return null;

  const isGhost = meningesMode === 'ghost';
  const defaultOpacity = isSinus ? (isGhost ? 0.45 : 0.95) : isGhost ? 0.26 : 0.90;
  const opacity = isTransparent ? 0.15 : defaultOpacity;

  const emissiveColor = isHovered ? HOVER_EMISSIVE : '#0d131a';
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : 0.12;

  return (
    <mesh
      geometry={geometry}
      userData={{
        dissectable: true,
        pieceId: id,
        pieceName: name,
      }}
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        color={isHovered ? '#00e5ff' : baseColor}
        roughness={isSinus ? 0.35 : 0.82}
        metalness={isSinus ? 0.18 : 0.04}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        transparent={isGhost || isTransparent}
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={!isGhost}
      />
    </mesh>
  );
};

export const MeningesLayer: React.FC = () => {
  const showMeninges = useNeuroStore((state) => state.showMeninges);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);

  // Precompute geometries once
  const falxGeom = useMemo(() => createFalxGeometry(), []);
  const tentoriumGeom = useMemo(() => createTentoriumGeometry(), []);
  const sinuses = useMemo(() => createSinusGeometries(), []);

  const isLayerVisible = showMeninges || visibleStructures.meninges;
  if (!isLayerVisible) return null;

  return (
    <group name="meninges-dural-folds-layer">
      {/* 1. Hoz del Cerebro (Falx Cerebri) */}
      {visibleStructures.falx_cerebri !== false && (
        <DissectableMeningeMesh
          id="Falx_Cerebri"
          name="Hoz del Cerebro (Falx Cerebri)"
          geometry={falxGeom}
          baseColor="#d7ccc8"
        />
      )}

      {/* 2. Tienda del Cerebelo (Tentorium Cerebelli) */}
      {visibleStructures.tentorium_cerebelli !== false && (
        <DissectableMeningeMesh
          id="Tentorium_Cerebelli"
          name="Tienda del Cerebelo (Tentorium Cerebelli)"
          geometry={tentoriumGeom}
          baseColor="#d7ccc8"
        />
      )}

      {/* 3. Senos Venosos Durales (Sagital Superior, Recto y Transversos) */}
      {visibleStructures.dural_sinuses !== false &&
        sinuses.map((sinus) => (
          <DissectableMeningeMesh
            key={sinus.id}
            id={sinus.id}
            name={sinus.name}
            geometry={sinus.geom}
            baseColor="#1565c0"
            isSinus={true}
          />
        ))}
    </group>
  );
};

export default MeningesLayer;
