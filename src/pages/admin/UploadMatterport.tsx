
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useToast } from '../../hooks/use-toast';

const UploadMatterport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', projectName);
    formData.append('description', description);

    try {
      const response = await fetch('https://bxsdjxkbhjtdrrtjtyto.supabase.co/functions/v1/upload-matterport', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      navigate('/admin/matterport-files');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="pt-28 px-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/admin/matterport-files" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Files
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">Upload Matterport File</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white h-32"
                required
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadMatterport;
