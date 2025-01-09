import { useState } from "react";
import { Download, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProcessedVideo } from "@/types/video";

interface ProcessedVideosModalProps {
  videos: ProcessedVideo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadSelected: (videos: ProcessedVideo[]) => void;
}

const ProcessedVideosModal = ({
  videos,
  open,
  onOpenChange,
  onDownloadSelected,
}: ProcessedVideosModalProps) => {
  const [processedVideos, setProcessedVideos] = useState<ProcessedVideo[]>(videos);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setProcessedVideos(videos.map(video => ({ ...video, selected: !selectAll })));
  };

  const handleSelect = (id: string) => {
    setProcessedVideos(prev =>
      prev.map(video =>
        video.id === id ? { ...video, selected: !video.selected } : video
      )
    );
  };

  const handleRename = (id: string, newName: string) => {
    setProcessedVideos(prev =>
      prev.map(video =>
        video.id === id ? { ...video, name: newName } : video
      )
    );
  };

  const handleDownload = () => {
    const selectedVideos = processedVideos.filter(video => video.selected);
    onDownloadSelected(selectedVideos);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Processed Videos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="selectAll"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="selectAll" className="text-sm">
              Select All
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processedVideos.map(video => (
              <div
                key={video.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Checkbox
                  checked={video.selected}
                  onCheckedChange={() => handleSelect(video.id)}
                />
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <Input
                    value={video.name}
                    onChange={(e) => handleRename(video.id, e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(video.url, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download Selected
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessedVideosModal;