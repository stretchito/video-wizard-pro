import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface PresetManagerProps {
  currentSettings: Omit<VideoPreset, 'id' | 'name'>;
  onPresetLoad: (preset: VideoPreset) => void;
  saveOnly?: boolean;
}

const PresetManager = ({ currentSettings, onPresetLoad, saveOnly = false }: PresetManagerProps) => {
  const [presets, setPresets] = useState<VideoPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    const { data, error } = await supabase
      .from('processing_presets')
      .select('*');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load presets",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setPresets(data.map(preset => ({
        id: preset.id,
        name: preset.name,
        logoPosition: (preset.settings as any).logoPosition,
        videoEffects: (preset.settings as any).videoEffects,
      })));
    }
  };

  const savePreset = async () => {
    if (!newPresetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save presets",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('processing_presets')
      .insert({
        name: newPresetName,
        settings: currentSettings,
        user_id: user.id
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save preset",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Preset saved successfully",
    });

    setNewPresetName("");
    setIsDialogOpen(false);
    loadPresets();
  };

  const handlePresetSelect = async (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      onPresetLoad(preset);
    }
  };

  if (saveOnly) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
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
    );
  }

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
    </div>
  );
};

export default PresetManager;