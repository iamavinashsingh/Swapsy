import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Trash2 } from 'lucide-react';
import SwapStatusBadge from './SwapStatusBadge';

const SwapRequestCard = ({ request, onStatusChange, onCancel, type = 'incoming' }) => {
  const user = type === 'incoming' ? request.fromUser : request.toUser;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={user.profilePhoto || '/default-avatar.png'}
          alt="User"
          className="w-12 h-12 object-cover rounded-full border"
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.location || '🌍 Unknown'}</p>
        </div>
        <div className="ml-auto">
          <SwapStatusBadge status={request.status} />
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Wants help with:</p>
          <div className="flex flex-wrap gap-2">
            {request.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="bg-red-100 dark:bg-red-700 text-red-700 dark:text-white px-2 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Offering help in:</p>
          <div className="flex flex-wrap gap-2">
            {request.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-white px-2 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      {request.status === 'pending' && (
        <div className="flex gap-3">
          {type === 'incoming' ? (
            <>
              <button
                onClick={() => onStatusChange(request._id, 'accepted')}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
              >
                <Check size={16} /> Accept
              </button>
              <button
                onClick={() => onStatusChange(request._id, 'rejected')}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
              >
                <X size={16} /> Reject
              </button>
            </>
          ) : (
            <button
              onClick={() => onCancel(request._id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md"
            >
              <Trash2 size={16} /> Cancel
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SwapRequestCard;
