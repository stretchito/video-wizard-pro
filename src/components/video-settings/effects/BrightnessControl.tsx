import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface BrightnessControlProps {
  onChange: (value: { enabled: boolean; value: number }) => void;
}

const BrightnessControl = ({ onChange }: BrightnessControlProps) => {
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState([50]);

  const handleChange = (enabled: boolean) => {
    setEnabled(enabled);
    onChange({ enabled, value: value[0] });
  };

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onChange({ enabled, value: newValue[0] });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Brightness</Label>
        <Switch checked={enabled} onCheckedChange={handleChange} />
      </div>
      {enabled && (
        <Slider
          value={value}
          onValueChange={handleValueChange}
          min={0}
          max={100}
          step={1}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default BrightnessControl;