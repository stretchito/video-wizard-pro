import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import EffectsPanel from "../effects-panel/EffectsPanel";
import PresetManager from "../PresetManager";
import { VideoPreset } from "@/types/preset";

interface VideoEffects {
  brightness?: { enabled: boolean; value: number };
  contrast?: { enabled: boolean; value: number };
  desaturation?: { enabled: boolean; value: number };
  colorWash?: { enabled: boolean; color: string; intensity: number };
  zoom?: { enabled: boolean; value: number };
  stabilization?: boolean;
  fadeEffect?: { enabled: boolean; duration: number };
}

interface AdvancedSettingsPanelProps {
  effects: VideoEffects;
  onEffectsChange: (effects: VideoEffects) => void;
  logoPosition: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  };
  onPresetLoad: (preset: VideoPreset) => void;
}

const AdvancedSettingsPanel = ({ 
  effects, 
  onEffectsChange,
  logoPosition,
  onPresetLoad,
}: AdvancedSettingsPanelProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary"
      >
        {isAdvancedOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
        <span>Advanced Settings</span>
      </button>

      {isAdvancedOpen && (
        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Video Effects</h4>
            <EffectsPanel 
              effects={effects}
              onEffectsChange={onEffectsChange}
            />
          </div>
          
          <PresetManager
            currentSettings={{
              logoPosition,
              videoEffects: effects,
            }}
            onPresetLoad={onPresetLoad}
            saveOnly
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedSettingsPanel;