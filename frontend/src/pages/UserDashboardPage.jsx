import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, RefreshCcw, Send, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [swaps, setSwaps] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const [profileRes, swapsRes, requestsRes] = await Promise.all([
        axios.get('/api/users/profile', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/swaps/active', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/swaps/received', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setProfile(profileRes.data);
      setSwaps(swapsRes.data);
      setRequests(requestsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <motion.div
      className="min-h-screen max-w-5xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Welcome back, {profile?.name?.split(' ')[0]} 👋
      </h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={profile?.profilePhoto || '/default-avatar.png'}
              alt="avatar"
              className="w-16 h-16 rounded-full border object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{profile?.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Availability: {profile?.availability}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            <User size={16} /> View Profile
          </button>
        </div>
      </div>

      {/* Swap Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Swaps */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Swaps</h2>
            <RefreshCcw className="text-gray-500 cursor-pointer" onClick={fetchAll} />
          </div>
          {swaps.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No active swaps yet.</p>
          ) : (
            swaps.map((swap) => (
              <div
                key={swap._id}
                className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
              >
                With: <strong>{swap.partner.name}</strong> – Status: <em>{swap.status}</em>
              </div>
            ))
          )}
        </div>

        {/* Incoming Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Incoming Requests</h2>
            <Send className="text-gray-500 cursor-pointer" onClick={() => navigate('/swaps/requests')} />
          </div>
          {requests.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No new requests.</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
              >
                From: <strong>{req.sender.name}</strong> – Message: <em>{req.message.slice(0, 40)}...</em>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate('/explore')}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          <Users size={16} /> Explore Profiles
        </button>
        <button
          onClick={() => navigate('/swaps/requests')}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition"
        >
          <Send size={16} /> Manage Requests
        </button>
      </div>
    </motion.div>
  );
};

export default UserDashboardPage;
