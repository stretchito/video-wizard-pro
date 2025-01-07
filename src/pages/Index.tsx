import Layout from "@/components/Layout";
import VideoUpload from "@/components/VideoUpload";
import VideoSettings from "@/components/VideoSettings";

const Index = () => {
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
            <VideoUpload />
          </div>
          <div>
            <VideoSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;