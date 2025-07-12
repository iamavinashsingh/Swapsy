import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const CreateSwapPage = () => {
  const { targetUserId } = useParams();
  const [targetUser, setTargetUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${targetUserId}`);
        setTargetUser(res.data);
      } catch (err) {
        console.error('Error fetching target user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [targetUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Please write a swap request message.');

    try {
      setSubmitting(true);
      await axios.post(
        `/api/swaps/request`,
        {
          receiverId: targetUserId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Swap request sent!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Swap request failed:', err);
      alert('Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading target user...
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="text-center py-20 text-red-500">
        Could not load target user.
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen max-w-2xl mx-auto py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Request a Skill Swap with {targetUser.name}
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={targetUser.profilePhoto || '/default-avatar.png'}
            alt={targetUser.name}
            className="w-20 h-20 rounded-full object-cover border mb-2"
          />
          <p className="text-indigo-600 dark:text-indigo-400 text-sm">
            {targetUser.skillsOffered?.join(', ') || 'No skills listed'}
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Availability: {targetUser.availability}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Swap Request Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'd love to learn Photoshop from you. I can teach you Excel in return!"
              rows={4}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-900 dark:text-white focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition flex justify-center items-center gap-2"
          >
            {submitting && <Loader2 className="animate-spin" size={16} />}
            Send Swap Request
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateSwapPage;
