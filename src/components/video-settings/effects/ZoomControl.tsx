import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ZoomControlProps {
  onChange: (value: { enabled: boolean; value: number }) => void;
}

const ZoomControl = ({ onChange }: ZoomControlProps) => {
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState([100]);

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
        <Label>Zoom</Label>
        <Switch checked={enabled} onCheckedChange={handleChange} />
      </div>
      {enabled && (
        <Slider
          value={value}
          onValueChange={handleValueChange}
          min={100}
          max={200}
          step={1}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default ZoomControl;