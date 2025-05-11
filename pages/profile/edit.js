import { Geist } from "next/font/google";
import { useRouter } from 'next/router';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { useState } from 'react';

const geist = Geist({
  subsets: ["latin"],
});

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: '',
    website: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    // For now, we'll just redirect back to the profile
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className={`${geist.className} min-h-screen bg-[#1e2530] text-white`}>
      <nav className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={handleCancel}
              className="inline-flex items-center text-gray-300 hover:text-white"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#1a1f27] rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-[#4169e1] rounded-full flex items-center justify-center text-3xl font-semibold">
                  J
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-600 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  Change Photo
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-[#1e2530] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-[#1e2530] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#1e2530] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-2 bg-[#1e2530] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4169e1] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 