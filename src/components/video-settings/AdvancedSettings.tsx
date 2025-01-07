import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const AdvancedSettings = () => {
  return (
    <div className="mt-4 space-y-4 border-t pt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Brightness</label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Contrast</label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Logo Opacity</label>
        <Slider defaultValue={[100]} max={100} step={1} />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Video Stabilization</label>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Fade Effects</label>
        <Switch />
      </div>
    </div>
  );
};

export default AdvancedSettings;