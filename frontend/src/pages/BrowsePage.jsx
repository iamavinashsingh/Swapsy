import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const BrowsePage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users/public');
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.skillsOffered.some((skill) =>
      skill.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        🔍 Browse Skills
      </h1>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by skill (e.g., Photoshop)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No matching profiles found 😢</p>
        ) : (
          filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={user.profilePhoto || '/default-avatar.png'}
                  alt="Avatar"
                  className="w-14 h-14 object-cover rounded-full border"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.location || '🌍 Unknown'}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Skills Offered:</p>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
