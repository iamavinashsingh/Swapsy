import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExploreProfilesPage = () => {
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/public?search=${search}`);
      setProfiles(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [search]);

  return (
    <motion.div
      className="min-h-screen max-w-6xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Explore Skill Swap Profiles 🔍
      </h1>

      {/* Search */}
      <div className="flex items-center justify-center mb-10 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search by skill or name..."
          className="w-full rounded-l-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-white focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchProfiles}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Profile Grid */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading profiles...</p>
      ) : profiles.length === 0 ? (
        <p className="text-center text-gray-400">No profiles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={user.profilePhoto || '/default-avatar.png'}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.location || 'No location'}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Skills Offered:
                  <span className="block text-gray-800 dark:text-white">
                    {user.skillsOffered?.join(', ') || 'None'}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Availability:
                  <span className="block text-gray-800 dark:text-white">
                    {user.availability}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/swaps/create/${user._id}`)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-auto transition"
              >
                <Send size={16} /> Request Swap
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ExploreProfilesPage;

