import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

const ActiveSwapsPage = () => {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [resReceived, resSent] = await Promise.all([
        axios.get('/api/swaps/received', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/swaps/sent', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setReceived(resReceived.data);
      setSent(resSent.data);
    } catch (err) {
      console.error('Error loading swap requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`/api/swaps/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchRequests();
    } catch (err) {
      alert('Failed to accept swap.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/swaps/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchRequests();
    } catch (err) {
      alert('Failed to reject swap.');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/api/swaps/cancel/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchRequests();
    } catch (err) {
      alert('Failed to cancel request.');
    }
  };

  return (
    <motion.div
      className="min-h-screen max-w-5xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
        Swap Requests 📩
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading requests...</p>
      ) : (
        <>
          {/* Incoming */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Incoming Requests
            </h2>
            {received.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No incoming requests.</p>
            ) : (
              <div className="grid gap-4">
                {received.map((req) => (
                  <motion.div
                    key={req._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        From: {req.sender.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Message: {req.message}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Sent */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Sent Requests
            </h2>
            {sent.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No sent requests.</p>
            ) : (
              <div className="grid gap-4">
                {sent.map((req) => (
                  <motion.div
                    key={req._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        To: {req.receiver.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Message: {req.message}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </motion.div>
  );
};

export default ActiveSwapsPage;
