import { useNeuroStore } from '../store/useNeuroStore';

/** Conversión MNI (mm) -> unidades de escena (ver build_anatomyka_brain.py). */
export const MNI_SCALE = 0.024;
export const MNI_CENTER_Y = -18.0;
export const MNI_CENTER_Z = 12.0;

/** Offset del plano de corte (unidades de escena) a partir del valor MNI en mm. */
export function clippingMmToScene(plane: 'axial' | 'coronal' | 'sagittal', mm: number): number {
  if (plane === 'axial') return (mm - MNI_CENTER_Z) * MNI_SCALE;
  if (plane === 'coronal') return (mm - MNI_CENTER_Y) * MNI_SCALE;
  return mm * MNI_SCALE;
}

/** true si el punto cae en la mitad del cerebro que el corte tomográfico ya eliminó. */
export function isPointClipped(p: { x: number; y: number; z: number } | undefined): boolean {
  if (!p) return false;
  const { clippingPlane, clippingOffset } = useNeuroStore.getState();
  if (clippingPlane === 'none') return false;
  const c = clippingMmToScene(clippingPlane, clippingOffset);
  // El plano mantiene y <= c (axial), z <= c (coronal) y x <= c (sagital)
  if (clippingPlane === 'axial') return p.y > c;
  if (clippingPlane === 'coronal') return p.z > c;
  return p.x > c;
}

export function useDissectable(id: string, name: string) {
  const isDissectionMode = useNeuroStore((s) => s.isDissectionMode);
  const dissectionTool = useNeuroStore((s) => s.dissectionTool);
  const setHoveredDissectable = useNeuroStore((s) => s.setHoveredDissectable);
  const dissectPiece = useNeuroStore((s) => s.dissectPiece);
  const togglePieceTransparent = useNeuroStore((s) => s.togglePieceTransparent);
  const isolatePiece = useNeuroStore((s) => s.isolatePiece);
  const dissectedPieces = useNeuroStore((s) => s.dissectedPieces);
  const transparentPieces = useNeuroStore((s) => s.transparentPieces);
  const isolatedPieceId = useNeuroStore((s) => s.isolatedPieceId);
  // Selector booleano: solo re-renderiza la pieza que entra / sale del hover
  const isHovered = useNeuroStore((s) => s.hoveredDissectable?.id === id);

  const isDissected = dissectedPieces.includes(id);
  const isTransparent = transparentPieces.includes(id);
  const isIsolated = isolatedPieceId === id;

  // Visibility: if isolatedPieceId is set, only that piece is visible; otherwise, false if dissected
  const isVisible = isolatedPieceId ? isIsolated : !isDissected;

  const handleClick = (e: any) => {
    if (!isDissectionMode) return false;
    if (isPointClipped(e?.point)) return false;
    e.stopPropagation();
    if (dissectionTool === 'remove') {
      dissectPiece(id, name);
    } else if (dissectionTool === 'transparent') {
      togglePieceTransparent(id);
    } else if (dissectionTool === 'isolate') {
      isolatePiece(id);
    }
    return true;
  };

  // Feedback azul cian on-hover SIEMPRE activo (no solo en modo disección)
  const handlePointerOver = (e: any) => {
    if (useNeuroStore.getState().isInteracting || !isVisible) return;
    if (isPointClipped(e?.point)) return; // dejar pasar al objeto que queda detrás del corte
    e.stopPropagation();
    document.body.style.cursor = isDissectionMode ? 'crosshair' : 'pointer';
    setHoveredDissectable({ id, name });
  };

  const handlePointerOut = (_e: any) => {
    if (useNeuroStore.getState().hoveredDissectable?.id === id) {
      setHoveredDissectable(null);
      document.body.style.cursor = '';
    }
  };

  return {
    isVisible,
    isTransparent,
    isHovered,
    isDissectionMode,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  };
}
