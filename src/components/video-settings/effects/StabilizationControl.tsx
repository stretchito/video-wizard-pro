import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface StabilizationControlProps {
  onChange: (enabled: boolean) => void;
}

const StabilizationControl = ({ onChange }: StabilizationControlProps) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (enabled: boolean) => {
    setEnabled(enabled);
    onChange(enabled);
  };

  return (
    <div className="flex items-center justify-between">
      <Label>Video Stabilization</Label>
      <Switch checked={enabled} onCheckedChange={handleChange} />
    </div>
  );
};

export default StabilizationControl;