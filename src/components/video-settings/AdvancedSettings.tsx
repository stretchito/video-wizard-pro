import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const AdvancedSettings = () => {
  const [colorWash, setColorWash] = useState("#9b87f5"); // Default purple color
  const [colorIntensity, setColorIntensity] = useState([50]);
  const [desaturation, setDesaturation] = useState([0]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorWash(e.target.value);
  };

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

      <div className="space-y-4 border-t pt-4">
        <h4 className="text-sm font-medium">Color Wash</h4>
        
        <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
          <div className="space-y-2">
            <Label htmlFor="colorWash">Color</Label>
            <Input
              type="text"
              id="colorWash"
              value={colorWash}
              onChange={handleColorChange}
              placeholder="#000000 or rgb(0,0,0)"
            />
          </div>
          <div className="mt-7">
            <Input
              type="color"
              value={colorWash}
              onChange={handleColorChange}
              className="w-12 h-10 p-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Intensity</Label>
          <Slider 
            value={colorIntensity}
            onValueChange={setColorIntensity}
            max={100} 
            step={1}
          />
          <div className="text-xs text-gray-500 text-right">
            {colorIntensity}%
          </div>
        </div>

        <div className="space-y-2">
          <Label>Desaturation</Label>
          <Slider 
            value={desaturation}
            onValueChange={setDesaturation}
            max={100} 
            step={1}
          />
          <div className="text-xs text-gray-500 text-right">
            {desaturation}%
          </div>
        </div>
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