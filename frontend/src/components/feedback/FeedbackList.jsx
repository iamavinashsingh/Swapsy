import React from 'react';
import { Star } from 'lucide-react';

const FeedbackList = ({ feedbacks = [] }) => {
  if (!feedbacks.length) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No feedback received yet 😔
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((fb) => (
        <div
          key={fb._id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-1">
            <img
              src={fb.fromUser?.profilePhoto || '/default-avatar.png'}
              alt={fb.fromUser?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {fb.fromUser?.name || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                size={18}
                className={`${
                  fb.rating >= num
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          {fb.comment && (
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {fb.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
