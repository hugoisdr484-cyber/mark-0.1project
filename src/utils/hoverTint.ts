import * as THREE from 'three';

/** Tinte azul cian quirúrgico para feedback on-hover (aplicado a cualquier estructura anatómica). */
export const HOVER_EMISSIVE = '#00e5ff';
export const HOVER_EMISSIVE_INTENSITY = 0.45;
const HOVER_MIX = new THREE.Color('#00d2ff');

/** Interpolación mix(baseColor, #00d2ff, amount). */
export function hoverTintColor(base: THREE.ColorRepresentation, amount = 0.55): THREE.Color {
  return new THREE.Color(base).lerp(HOVER_MIX, amount);
}
