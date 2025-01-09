import BrightnessControl from "../effects/BrightnessControl";
import ContrastControl from "../effects/ContrastControl";
import DesaturationControl from "../effects/DesaturationControl";
import ColorWashControl from "../effects/ColorWashControl";
import ZoomControl from "../effects/ZoomControl";
import StabilizationControl from "../effects/StabilizationControl";
import FadeEffectControl from "../effects/FadeEffectControl";

interface VideoEffects {
  brightness?: { enabled: boolean; value: number };
  contrast?: { enabled: boolean; value: number };
  desaturation?: { enabled: boolean; value: number };
  colorWash?: { enabled: boolean; color: string; intensity: number };
  zoom?: { enabled: boolean; value: number };
  stabilization?: boolean;
  fadeEffect?: { enabled: boolean; duration: number };
}

interface EffectsPanelProps {
  effects: VideoEffects;
  onEffectsChange: (effects: VideoEffects) => void;
}

const EffectsPanel = ({ effects, onEffectsChange }: EffectsPanelProps) => {
  const updateEffect = (effectName: keyof VideoEffects, value: any) => {
    onEffectsChange({
      ...effects,
      [effectName]: value,
    });
  };

  return (
    <div className="space-y-6">
      <BrightnessControl
        onChange={(value) => updateEffect("brightness", value)}
      />
      
      <ContrastControl
        onChange={(value) => updateEffect("contrast", value)}
      />

      <DesaturationControl
        onChange={(value) => updateEffect("desaturation", value)}
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
  );
};

export default EffectsPanel;