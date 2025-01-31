import React from "react";
import { usePDF } from "react-to-pdf";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

const ProjectDocumentation = () => {
  const { toPDF, targetRef } = usePDF({
    filename: 'pm-batch-video-processor-documentation.pdf'
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">PM Batch Video Processor Documentation</h1>
        <Button onClick={() => toPDF()} variant="outline">
          <FileDown className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div ref={targetRef} className="prose max-w-none">
        <h1>PM Batch Video Processor - Project Documentation</h1>

        <h2>Overview</h2>
        <p>PM Batch Video Processor is a web application that allows users to process multiple videos in batch, adding logos, effects, and generating transcriptions and summaries. The application uses a modern tech stack with a React frontend and Node.js backend, leveraging cloud services for processing and storage.</p>

        <h2>Architecture</h2>
        
        <h3>Frontend (React + TypeScript + Vite)</h3>
        <ul>
          <li><strong>UI Framework</strong>: shadcn/ui + Tailwind CSS</li>
          <li><strong>State Management</strong>: TanStack Query</li>
          <li><strong>File Handling</strong>: react-dropzone</li>
          <li><strong>Authentication</strong>: Supabase Auth</li>
          <li><strong>Storage</strong>: Supabase Storage</li>
        </ul>

        <h3>Backend (Node.js)</h3>
        <ul>
          <li><strong>Server</strong>: Express.js</li>
          <li><strong>Video Processing</strong>: FFmpeg</li>
          <li><strong>Transcription</strong>: OpenAI Whisper API</li>
          <li><strong>Summarization</strong>: OpenAI GPT-4</li>
          <li><strong>Monitoring</strong>: Prometheus + Grafana</li>
        </ul>

        <h3>Infrastructure</h3>
        <ul>
          <li><strong>Frontend Hosting</strong>: Netlify/Vercel</li>
          <li><strong>Backend Hosting</strong>: DigitalOcean Droplet</li>
          <li><strong>Database & Auth</strong>: Supabase</li>
          <li><strong>File Storage</strong>: Supabase Storage</li>
          <li><strong>CI/CD</strong>: GitHub Actions</li>
        </ul>

        <h2>Features & Requirements</h2>

        <h3>User Authentication</h3>
        <ul>
          <li>Email-based signup/login via Supabase</li>
          <li>Username creation during signup</li>
          <li>Profile management</li>
        </ul>

        <h3>Video Upload</h3>
        <ul>
          <li>Maximum file size: 25MB per file</li>
          <li>Total batch size: 500MB</li>
          <li>Supported formats: MP4, MOV, AVI, WEBM</li>
          <li>Storage quota: 5GB per user</li>
        </ul>

        <h3>Video Processing Features</h3>
        <ol>
          <li>
            <strong>Logo Overlay</strong>
            <ul>
              <li>Position control (x, y coordinates)</li>
              <li>Size adjustment</li>
              <li>Rotation</li>
              <li>Safe zone guidelines</li>
            </ul>
          </li>
          <li>
            <strong>Video Effects</strong>
            <ul>
              <li>Brightness</li>
              <li>Contrast</li>
              <li>Saturation</li>
              <li>Zoom</li>
              <li>Stabilization</li>
              <li>Fade effects</li>
            </ul>
          </li>
        </ol>

        <h2>Development Setup</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>Node.js 18+</li>
          <li>FFmpeg</li>
          <li>Supabase account</li>
          <li>DigitalOcean account</li>
          <li>OpenAI API key</li>
        </ul>

        <h3>Environment Variables</h3>
        <pre>
          <code>
{`# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Server
PORT=10000
NODE_ENV=production

# Storage
MAX_FILE_SIZE=25000000
TOTAL_STORAGE_LIMIT=5000000000`}
          </code>
        </pre>

        <h2>Deployment</h2>
        
        <h3>Backend Deployment (DigitalOcean)</h3>
        <ol>
          <li>Create a Droplet (Basic Plan, 2GB RAM minimum)</li>
          <li>Install required software (Node.js, FFmpeg, PM2, Nginx)</li>
          <li>Configure Nginx as reverse proxy</li>
          <li>Set up SSL with Let's Encrypt</li>
          <li>Configure monitoring with Prometheus and Grafana</li>
        </ol>

        <h3>Frontend Deployment</h3>
        <ol>
          <li>Build the frontend application</li>
          <li>Deploy to Netlify/Vercel</li>
          <li>Configure environment variables</li>
          <li>Set up custom domain (if required)</li>
        </ol>

        <h2>Security Considerations</h2>
        <ul>
          <li>Implement proper authentication and authorization</li>
          <li>Secure file uploads and processing</li>
          <li>Configure CORS properly</li>
          <li>Implement rate limiting</li>
          <li>Regular security updates</li>
        </ul>

        <h2>Maintenance</h2>
        <ul>
          <li>Regular backups of database and user files</li>
          <li>Monitor system resources and performance</li>
          <li>Update dependencies regularly</li>
          <li>Implement logging and error tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectDocumentation;