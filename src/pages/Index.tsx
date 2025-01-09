import { useState } from "react";
import Layout from "@/components/Layout";
import VideoUpload from "@/components/VideoUpload";
import VideoSettings from "@/components/VideoSettings";
import ProcessedVideosModal from "@/components/ProcessedVideosModal";
import { VideoSettings as VideoSettingsType, ProcessedVideo } from "@/types/video";
import { useToast } from "@/hooks/use-toast";

// Use environment variable for backend URL with a fallback
const BACKEND_URL = "https://dreadnought-video-processor-backend.onrender.com";

const Index = () => {
  const [selectedVideoFrame, setSelectedVideoFrame] = useState<string>();
  const [videoSettings, setVideoSettings] = useState<Record<string, VideoSettingsType>>({});
  const [processedVideos, setProcessedVideos] = useState<ProcessedVideo[]>([]);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSettingsChange = (videoId: string, settings: VideoSettingsType) => {
    setVideoSettings(prev => ({
      ...prev,
      [videoId]: settings
    }));
  };

  const handleProcessVideos = async () => {
    try {
      if (videoFiles.length === 0) {
        throw new Error('Please upload at least one video file');
      }

      // Create FormData and append video files
      const formData = new FormData();
      
      // Add each video file
      videoFiles.forEach((file, index) => {
        formData.append('video', file);
      });
      
      // Add video settings as JSON
      formData.append('settings', JSON.stringify(videoSettings));

      console.log('Making request to:', `${BACKEND_URL}/api/videos/process`);
      
      // Make the request to the backend
      const response = await fetch(`${BACKEND_URL}/api/videos/process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process videos');
      }

      const result = await response.json();

      // Update processed videos with the results
      const processed: ProcessedVideo[] = [{
        id: crypto.randomUUID(),
        name: result.data.fileName || 'Processed Video',
        thumbnail: selectedVideoFrame || '',
        url: result.data.processedVideoPath,
        selected: false,
      }];

      setProcessedVideos(processed);
      setShowProcessedModal(true);

      toast({
        title: "Success",
        description: "Video processed successfully",
      });

    } catch (error) {
      console.error('Error processing videos:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process videos",
        variant: "destructive",
      });
    }
  };

  const handleDownloadSelected = (videos: ProcessedVideo[]) => {
    toast({
      title: "Downloading Videos",
      description: `Downloading ${videos.length} videos...`,
    });
    
    videos.forEach(video => {
      if (video.url) {
        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = video.url;
        link.download = video.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleVideoUpload = (files: File[]) => {
    setVideoFiles(files);
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
              onFilesAccepted={handleVideoUpload}
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