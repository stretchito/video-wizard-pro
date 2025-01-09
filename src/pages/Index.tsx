import { useState } from "react";
import Layout from "@/components/Layout";
import VideoUpload from "@/components/VideoUpload";
import VideoSettings from "@/components/VideoSettings";
import ProcessedVideosModal from "@/components/ProcessedVideosModal";
import { VideoSettings as VideoSettingsType, ProcessedVideo } from "@/types/video";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedVideoFrame, setSelectedVideoFrame] = useState<string>();
  const [videoSettings, setVideoSettings] = useState<Record<string, VideoSettingsType>>({});
  const [processedVideos, setProcessedVideos] = useState<ProcessedVideo[]>([]);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const { toast } = useToast();

  const handleSettingsChange = (videoId: string, settings: VideoSettingsType) => {
    setVideoSettings(prev => ({
      ...prev,
      [videoId]: settings
    }));
  };

  const handleProcessVideos = async () => {
    // This is a mock implementation. In a real application, you would:
    // 1. Send the videos and their settings to your backend
    // 2. Process the videos with FFmpeg
    // 3. Return the processed video URLs
    toast({
      title: "Processing Videos",
      description: "Your videos are being processed...",
    });

    // Mock processed videos
    const processed: ProcessedVideo[] = Object.entries(videoSettings).map(([id]) => ({
      id,
      name: `Processed Video ${id}`,
      thumbnail: selectedVideoFrame || '',
      url: '#',
      selected: false,
    }));

    setProcessedVideos(processed);
    setShowProcessedModal(true);
  };

  const handleDownloadSelected = (videos: ProcessedVideo[]) => {
    // Implement download functionality
    toast({
      title: "Downloading Videos",
      description: `Downloading ${videos.length} videos...`,
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Video Processing</h2>
          <p className="text-gray-600">
            Upload your videos and customize processing settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoUpload 
              onFrameSelect={setSelectedVideoFrame}
              onSettingsChange={handleSettingsChange}
            />
          </div>
          <div>
            <VideoSettings 
              videoPreviewUrl={selectedVideoFrame}
              onProcess={handleProcessVideos}
            />
          </div>
        </div>

        <ProcessedVideosModal
          videos={processedVideos}
          open={showProcessedModal}
          onOpenChange={setShowProcessedModal}
          onDownloadSelected={handleDownloadSelected}
        />
      </div>
    </Layout>
  );
};

export default Index;