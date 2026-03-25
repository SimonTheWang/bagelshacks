import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  bio_point_1: string;
  bio_point_2: string;
  bio_point_3: string;
  company: string;
  role: string;
  discord: string;
}

const inputClass = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio_point_1: '',
    bio_point_2: '',
    bio_point_3: '',
    company: '',
    role: '',
    discord: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const bioPoints = [formData.bio_point_1, formData.bio_point_2, formData.bio_point_3]
        .filter(p => p.trim() !== '');
      const bioText = bioPoints.length > 0 ? bioPoints.join(' • ') : '';
      const imageUrl = imageFile ? await fileToBase64(imageFile) : '';

      const { error } = await supabase
        .from('attendees')
        .insert([{
          name: formData.name,
          bio: bioText,
          image_url: imageUrl || null,
          company: formData.company,
          role: formData.role,
          discord: formData.discord || null,
          event_role: 'hacker',
        }]);

      if (error) throw error;

      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add attendee';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              className={inputClass}
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
              className={inputClass}
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company / School
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Tech Corp / UCLA"
            />
          </div>

          <div>
            <label htmlFor="discord" className="block text-sm font-medium mb-2">
              Discord Username
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              className={inputClass}
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Photo
            </label>
            {imagePreview ? (
              <div className="mb-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(''); }}
                  className="mt-2 block text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer`}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Bio
            </label>
            <p className="text-sm text-gray-400 mb-3">Add 3 fun/interesting facts about you</p>

            <div className="space-y-3">
              {(['bio_point_1', 'bio_point_2', 'bio_point_3'] as const).map((field, i) => (
                <div key={field} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-2">•</span>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`flex-1 ${inputClass}`}
                    placeholder={
                      i === 0 ? "e.g., Built a startup in college"
                        : i === 1 ? "e.g., Can solve a Rubik's cube in 30s"
                        : "e.g., Obsessed with bagels 🥯"
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Adding...' : 'Add Attendee'}
          </button>
        </form>
      </div>
    </div>
  );
}
