import { VideoPreset } from "@/types/preset";
import SavePresetDialog from "./preset-manager/SavePresetDialog";
import PresetSelector from "./preset-manager/PresetSelector";

interface PresetManagerProps {
  currentSettings: {
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
  };
  onPresetLoad: (preset: VideoPreset) => void;
  saveOnly?: boolean;
}

const PresetManager = ({ currentSettings, onPresetLoad, saveOnly = false }: PresetManagerProps) => {
  if (saveOnly) {
    return <SavePresetDialog currentSettings={currentSettings} />;
  }

  return (
    <div className="space-y-4">
      <PresetSelector onPresetLoad={onPresetLoad} />
    </div>
  );
};

export default PresetManager;