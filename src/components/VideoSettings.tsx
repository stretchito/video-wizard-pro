import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormatSelector from "./video-settings/FormatSelector";
import PresetManager from "./video-settings/PresetManager";
import LogoSection from "./video-settings/logo-section/LogoSection";
import AdvancedSettingsPanel from "./video-settings/advanced-settings/AdvancedSettingsPanel";
import { VideoPreset } from "@/types/preset";

interface VideoSettingsProps {
  videoPreviewUrl?: string;
  onProcess: () => Promise<void>;
}

interface VideoEffects {
  brightness?: { enabled: boolean; value: number };
  contrast?: { enabled: boolean; value: number };
  desaturation?: { enabled: boolean; value: number };
  colorWash?: { enabled: boolean; color: string; intensity: number };
  zoom?: { enabled: boolean; value: number };
  stabilization?: boolean;
  fadeEffect?: { enabled: boolean; duration: number };
}

const VideoSettings = ({ videoPreviewUrl, onProcess }: VideoSettingsProps) => {
  const [logoPosition, setLogoPosition] = useState({
    x: 50,
    y: 50,
    rotation: 0,
    size: 15
  });
  const [logoUrl, setLogoUrl] = useState<string>();
  const [videoEffects, setVideoEffects] = useState<VideoEffects>({
    brightness: { enabled: false, value: 50 },
    contrast: { enabled: false, value: 50 },
    desaturation: { enabled: false, value: 100 },
    colorWash: { enabled: false, color: "#000000", intensity: 50 },
    zoom: { enabled: false, value: 100 },
    stabilization: false,
    fadeEffect: { enabled: false, duration: 0.5 }
  });

  const handlePresetLoad = (preset: VideoPreset) => {
    setLogoPosition(preset.logoPosition);
    setVideoEffects(preset.videoEffects);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <PresetManager
          currentSettings={{
            logoPosition,
            videoEffects,
          }}
          onPresetLoad={handlePresetLoad}
        />
      </div>
      
      <LogoSection
        logoUrl={logoUrl}
        videoPreviewUrl={videoPreviewUrl}
        logoPosition={logoPosition}
        videoEffects={videoEffects}
        onLogoUploaded={setLogoUrl}
        onPositionChange={setLogoPosition}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Settings</h3>
        <FormatSelector />
      </div>

      <AdvancedSettingsPanel
        effects={videoEffects}
        onEffectsChange={setVideoEffects}
        logoPosition={logoPosition}
        onPresetLoad={handlePresetLoad}
      />

      <Button className="w-full" size="lg" onClick={onProcess}>
        Process Videos
      </Button>
    </div>
  );
};

export default VideoSettings;