import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SwapRequestCard from '../components/swaps/SwapRequestCard';

const SwapRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get('/swaps/my-requests');
      setIncomingRequests(data.incoming);
      setSentRequests(data.sent);
    } catch (err) {
      console.error('Error fetching swap requests:', err);
    }
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      await api.put(`/swaps/${requestId}/status`, { status });
      fetchRequests();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleCancel = async (requestId) => {
    try {
      await api.delete(`/swaps/${requestId}`);
      fetchRequests();
    } catch (err) {
      console.error('Failed to cancel request:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔁 Swap Requests</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`px-4 py-2 rounded-md transition font-medium ${
            activeTab === 'incoming'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white'
          }`}
        >
          Incoming
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-md transition font-medium ${
            activeTab === 'sent'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white'
          }`}
        >
          Sent
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {activeTab === 'incoming' &&
          (incomingRequests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No incoming requests 😔</p>
          ) : (
            incomingRequests.map((req) => (
              <SwapRequestCard
                key={req._id}
                request={req}
                onStatusChange={handleStatusChange}
                type="incoming"
              />
            ))
          ))}

        {activeTab === 'sent' &&
          (sentRequests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No sent requests yet 📨</p>
          ) : (
            sentRequests.map((req) => (
              <SwapRequestCard
                key={req._id}
                request={req}
                onCancel={handleCancel}
                type="sent"
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default SwapRequestsPage;
