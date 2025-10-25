import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  bio: string;
  bio_point_1: string;
  bio_point_2: string;
  bio_point_3: string;
  image_url: string;
  company: string;
  role: string;
  event_role: 'speaker' | 'hacker' | 'organizer' | 'guest' | 'helper' | 'founder' | '';
}

export default function Admin() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    bio_point_1: '',
    bio_point_2: '',
    bio_point_3: '',
    image_url: '',
    company: '',
    role: '',
    event_role: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl = formData.image_url;

      // Convert image to base64 if one was selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await convertImageToBase64(imageFile);
        setUploading(false);
      }

      // Combine bio points into a formatted string
      const bioPoints = [
        formData.bio_point_1,
        formData.bio_point_2,
        formData.bio_point_3
      ].filter(point => point.trim() !== '');
      
      const bioText = bioPoints.length > 0 ? bioPoints.join(' • ') : formData.bio;

      const { error } = await supabase
        .from('attendees')
        .insert([{
          name: formData.name,
          bio: bioText,
          image_url: imageUrl,
          company: formData.company,
          role: formData.role,
          event_role: formData.event_role || null
        }]);

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: 'Attendee added successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        bio: '',
        bio_point_1: '',
        bio_point_2: '',
        bio_point_3: '',
        image_url: '',
        company: '',
        role: '',
        event_role: ''
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add attendee';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin - Add Attendee</h1>
          <Link 
            to="/" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {message && (
          <div 
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500 text-green-300' 
                : 'bg-red-500/20 border border-red-500 text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Tech Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Image
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="mt-2 text-sm text-red-400 hover:text-red-300"
                >
                  Remove image
                </button>
              </div>
            )}

            {/* File Upload */}
            <div className="mb-3">
              <label htmlFor="image_file" className="block text-sm text-gray-300 mb-2">
                Upload Image File
              </label>
              <input
                type="file"
                id="image_file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
              />
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* URL Input */}
            <div>
              <label htmlFor="image_url" className="block text-sm text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                disabled={!!imageFile}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="mt-1 text-sm text-gray-400">
                Leave blank for a gradient background
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="event_role" className="block text-sm font-medium mb-2">
              Event Role
            </label>
            <select
              id="event_role"
              name="event_role"
              value={formData.event_role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select role...</option>
              <option value="founder">⭐ Founder</option>
              <option value="organizer">🎯 Organizer</option>
              <option value="helper">🤝 Helper</option>
              <option value="guest">👥 Guest</option>
              <option value="speaker">🎤 Speaker</option>
              <option value="hacker">💻 Hacker</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Bio (Bullet Points)
            </label>
            <p className="text-sm text-gray-400 mb-3">Add up to 3 points about the attendee</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-2">•</span>
                <input
                  type="text"
                  name="bio_point_1"
                  value={formData.bio_point_1}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="First point (e.g., Full-stack developer passionate about AI)"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-2">•</span>
                <input
                  type="text"
                  name="bio_point_2"
                  value={formData.bio_point_2}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Second point (optional)"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-2">•</span>
                <input
                  type="text"
                  name="bio_point_3"
                  value={formData.bio_point_3}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Third point (optional)"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {uploading ? 'Processing image...' : loading ? 'Adding...' : 'Add Attendee'}
          </button>
        </form>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">💡 Tips</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong>Upload images directly</strong> (stored as base64) or use a URL from Unsplash</li>
            <li>• Supported formats: JPG, PNG, GIF, WebP</li>
            <li>• Recommended: Keep images under 500KB for best performance</li>
            <li>• Fill in 1-3 bio bullet points (separate highlights work best)</li>
            <li>• Images work best in portrait orientation (3:4 ratio)</li>
            <li>• Only name is required - all other fields are optional</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

