import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleTogglePrivacy = async () => {
    try {
      const updated = await axios.put(
        '/api/users/profile',
        { isPublic: !user.isPublic },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUser(updated.data);
    } catch (err) {
      alert('Privacy toggle failed.');
    }
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(
        '/api/users/profile',
        {
          name: user.name,
          location: user.location,
          skillsOffered: user.skillsOffered,
          skillsWanted: user.skillsWanted,
          availability: user.availability,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEditMode(false);
      alert('Profile updated! 😊');
    } catch (err) {
      alert('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Loading...</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        My Profile 👤
      </h2>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-sm text-gray-600 dark:text-gray-400">Private</span>
        <button onClick={handleTogglePrivacy}>
          {user.isPublic ? (
            <ToggleRight size={30} className="text-green-500" />
          ) : (
            <ToggleLeft size={30} className="text-gray-400" />
          )}
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">Public</span>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            disabled={!editMode}
            type="text"
            value={user.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <input
            disabled={!editMode}
            type="text"
            value={user.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Offered</label>
          <input
            disabled={!editMode}
            type="text"
            placeholder="e.g., Photoshop, Piano"
            value={user.skillsOffered?.join(', ') || ''}
            onChange={(e) => handleChange('skillsOffered', e.target.value.split(','))}
            className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Wanted</label>
          <input
            disabled={!editMode}
            type="text"
            placeholder="e.g., Excel, Violin"
            value={user.skillsWanted?.join(', ') || ''}
            onChange={(e) => handleChange('skillsWanted', e.target.value.split(','))}
            className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
          <input
            disabled={!editMode}
            type="text"
            placeholder="e.g., Evenings, Weekends"
            value={user.availability || ''}
            onChange={(e) => handleChange('availability', e.target.value)}
            className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
