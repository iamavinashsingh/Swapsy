import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const CreateSwapRequestPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`/api/users/public/${userId}`);
        setPartner(res.data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };
    fetchPartner();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message.');

    try {
      setSending(true);
      await axios.post(
        '/api/swaps/request',
        { receiverId: userId, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Swap request sent successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to send swap request:', err);
      alert('Failed to send request.');
    } finally {
      setSending(false);
    }
  };

  if (!partner) {
    return (
      <div className="text-center py-20 text-gray-400">Loading profile...</div>
    );
  }

  return (
    <motion.div
      className="min-h-screen max-w-xl mx-auto py-14 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Send Swap Request to {partner.name}
        </h2>

        {/* Partner Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={partner.profilePhoto || '/default-avatar.png'}
            alt={partner.name}
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div>
            <p className="text-gray-900 dark:text-white font-medium">{partner.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Wants: {partner.skillsWanted?.join(', ') || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Offers: {partner.skillsOffered?.join(', ') || 'N/A'}
            </p>
          </div>
        </div>

        {/* Message Box */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Add a message:
          </label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 p-3"
            placeholder="Tell them what you're offering and why you want this swap..."
          ></textarea>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2 transition"
          >
            <Send size={16} />
            {sending ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateSwapRequestPage;
