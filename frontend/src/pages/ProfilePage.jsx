import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit3, Mail, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleTogglePrivacy = async () => {
    try {
      const res = await axios.put(
        '/api/users/profile',
        { isPrivate: !user.isPrivate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error('Privacy toggle failed:', err);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen max-w-4xl mx-auto py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          {/* Avatar */}
          <img
            src={user.profilePhoto || '/default-avatar.png'}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center justify-center sm:justify-start">
              <Mail className="w-4 h-4 mr-1" /> {user.email}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Availability: <span className="font-medium">{user.availability}</span>
            </p>
          </div>

          {/* Edit */}
          <button
            onClick={() => navigate('/profile/edit')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition shadow"
          >
            <Edit3 size={16} /> Edit
          </button>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Skills Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.length ? (
                user.skillsOffered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No skills added</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Skills Wanted
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.length ? (
                user.skillsWanted.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-pink-100 dark:bg-pink-600 text-pink-700 dark:text-white text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No skills added</p>
              )}
            </div>
          </div>
        </div>

        {/* Privacy toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={handleTogglePrivacy}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {user.isPrivate ? '🔒 Profile is Private – Click to make Public' : '🌍 Profile is Public – Click to make Private'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
