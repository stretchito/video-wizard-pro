export interface VideoPreset {
  id: string;
  name: string;
  logoPosition: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  };
  videoEffects: {
    brightness?: { enabled: boolean; value: number };
    contrast?: { enabled: boolean; value: number };
    desaturation?: { enabled: boolean; value: number };
    colorWash?: { enabled: boolean; color: string; intensity: number };
    zoom?: { enabled: boolean; value: number };
    stabilization?: boolean;
    fadeEffect?: { enabled: boolean; duration: number };
  };
}