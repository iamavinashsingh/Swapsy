import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Smile, XCircle } from 'lucide-react';

const SwapHistoryPage = () => {
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [activeTab, setActiveTab] = useState('completed');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const [res1, res2] = await Promise.all([
          axios.get('/api/swaps/history/completed', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/swaps/history/cancelled', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCompleted(res1.data);
        setCancelled(res2.data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    };

    fetchHistory();
  }, []);

  const currentList = activeTab === 'completed' ? completed : cancelled;

  return (
    <motion.div
      className="min-h-screen max-w-5xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Swap History 📜
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'cancelled'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {currentList.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No {activeTab} swaps found.
          </p>
        ) : (
          currentList.map((swap) => (
            <motion.div
              key={swap._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {activeTab === 'completed'
                    ? `Swap with ${swap.partner.name}`
                    : `Cancelled with ${swap.partner.name}`}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Skills: {swap.skillsOffered.join(', ')} ⇄ {swap.skillsWanted.join(', ')}
                </p>
                {activeTab === 'completed' && !swap.feedbackGiven && (
                  <p className="text-xs mt-1 text-yellow-500">
                    ⭐ Don’t forget to rate this swap!
                  </p>
                )}
              </div>

              <div className="text-right">
                {activeTab === 'completed' ? (
                  <Smile className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default SwapHistoryPage;
