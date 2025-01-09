import { useState } from "react";
import Layout from "@/components/Layout";
import VideoUpload from "@/components/VideoUpload";
import VideoSettings from "@/components/VideoSettings";
import ProcessedVideosModal from "@/components/ProcessedVideosModal";
import { VideoSettings as VideoSettingsType, ProcessedVideo } from "@/types/video";
import { useVideoProcessor } from "@/components/video-processing/VideoProcessor";
import { useVideoDownloader } from "@/components/video-processing/VideoDownloader";

const Index = () => {
  const [selectedVideoFrame, setSelectedVideoFrame] = useState<string>();
  const [videoSettings, setVideoSettings] = useState<Record<string, VideoSettingsType>>({});
  const [processedVideos, setProcessedVideos] = useState<ProcessedVideo[]>([]);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const { downloadSelectedVideos } = useVideoDownloader();
  const { processVideos } = useVideoProcessor({
    videoFiles,
    videoSettings,
    selectedVideoFrame,
    onProcessingComplete: (videos) => {
      setProcessedVideos(videos);
      setShowProcessedModal(true);
    },
  });

  const handleSettingsChange = (videoId: string, settings: VideoSettingsType) => {
    setVideoSettings(prev => ({
      ...prev,
      [videoId]: settings
    }));
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
              onFilesAccepted={setVideoFiles}
            />
          </div>
          <div>
            <VideoSettings 
              videoPreviewUrl={selectedVideoFrame}
              onProcess={processVideos}
            />
          </div>
        </div>

        <ProcessedVideosModal
          videos={processedVideos}
          open={showProcessedModal}
          onOpenChange={setShowProcessedModal}
          onDownloadSelected={downloadSelectedVideos}
        />
      </div>
    </Layout>
  );
};

export default Index;