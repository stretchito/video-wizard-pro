import { useState } from "react";
import BrightnessControl from "./effects/BrightnessControl";
import ContrastControl from "./effects/ContrastControl";
import ColorWashControl from "./effects/ColorWashControl";
import ZoomControl from "./effects/ZoomControl";
import StabilizationControl from "./effects/StabilizationControl";
import FadeEffectControl from "./effects/FadeEffectControl";

interface VideoEffect {
  brightness?: { enabled: boolean; value: number };
  contrast?: { enabled: boolean; value: number };
  colorWash?: { enabled: boolean; color: string; intensity: number };
  zoom?: { enabled: boolean; value: number };
  stabilization?: boolean;
  fadeEffect?: { enabled: boolean; duration: number };
}

const AdvancedSettings = () => {
  const [effects, setEffects] = useState<VideoEffect>({});

  const updateEffect = (effectName: keyof VideoEffect, value: any) => {
    setEffects((prev) => ({
      ...prev,
      [effectName]: value,
    }));
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Video Effects</h4>
        
        <div className="space-y-6">
          <BrightnessControl
            onChange={(value) => updateEffect("brightness", value)}
          />
          
          <ContrastControl
            onChange={(value) => updateEffect("contrast", value)}
          />
          
          <ColorWashControl
            onChange={(value) => updateEffect("colorWash", value)}
          />
          
          <ZoomControl
            onChange={(value) => updateEffect("zoom", value)}
          />
          
          <StabilizationControl
            onChange={(value) => updateEffect("stabilization", value)}
          />
          
          <FadeEffectControl
            onChange={(value) => updateEffect("fadeEffect", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;