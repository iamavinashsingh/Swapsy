import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPublicProfiles = async () => {
    try {
      const res = await axios.get('/api/users/public');
      setProfiles(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  useEffect(() => {
    fetchPublicProfiles();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    if (!keyword) return setFiltered(profiles);

    const filteredProfiles = profiles.filter((profile) => {
      const allSkills = [...(profile.skillsOffered || []), ...(profile.skillsWanted || [])].join(' ');
      return allSkills.toLowerCase().includes(keyword);
    });

    setFiltered(filteredProfiles);
  };

  return (
    <motion.div
      className="min-h-screen py-10 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Explore Public Profiles 🌍
      </h1>

      {/* Search */}
      <div className="flex items-center gap-3 mb-8 max-w-md mx-auto">
        <Search className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search by skill (e.g., 'Excel')"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No profiles found for "{searchTerm}"
          </p>
        ) : (
          filtered.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.profilePhoto || '/default-avatar.png'}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{user.location || 'Unknown Location'}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Offers:</span>{' '}
                {user.skillsOffered?.join(', ') || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Wants:</span>{' '}
                {user.skillsWanted?.join(', ') || 'N/A'}
              </p>

              <Link
                to={`/create-swap/${user._id}`}
                className="block mt-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
              >
                Request Swap
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PublicProfilesPage;
