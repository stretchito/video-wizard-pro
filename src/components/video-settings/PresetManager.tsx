import { useState } from "react";
import { VideoPreset } from "@/types/preset";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PresetManagerProps {
  currentSettings: Omit<VideoPreset, 'id' | 'name'>;
  onPresetLoad: (preset: VideoPreset) => void;
}

const PresetManager = ({ currentSettings, onPresetLoad }: PresetManagerProps) => {
  const [presets, setPresets] = useState<VideoPreset[]>(() => {
    const savedPresets = localStorage.getItem('videoPresets');
    return savedPresets ? JSON.parse(savedPresets) : [];
  });
  const [newPresetName, setNewPresetName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const savePreset = () => {
    if (!newPresetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive",
      });
      return;
    }

    const newPreset: VideoPreset = {
      id: crypto.randomUUID(),
      name: newPresetName,
      ...currentSettings,
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('videoPresets', JSON.stringify(updatedPresets));
    
    toast({
      title: "Success",
      description: "Preset saved successfully",
    });
    
    setNewPresetName("");
    setIsDialogOpen(false);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      onPresetLoad(preset);
      toast({
        title: "Preset Loaded",
        description: `Loaded preset: ${preset.name}`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {presets.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">User Presets</label>
          <Select onValueChange={handlePresetSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Save As Preset
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current Settings as Preset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Preset Name</label>
              <Input
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="Enter preset name"
              />
            </div>
            <Button onClick={savePreset}>Save Preset</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PresetManager;