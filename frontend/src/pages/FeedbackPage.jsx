import React, { useState } from 'react';
import { Star } from 'lucide-react';
import api from '../services/api';

const FeedbackForm = ({ swapId, toUserId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return alert('Please select a rating ⭐');
    setSubmitting(true);

    try {
      await api.post('/feedback', {
        swapId,
        toUserId,
        rating,
        comment,
      });
      onSubmit?.();
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Feedback error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-4 border rounded-md border-gray-200 dark:border-gray-700 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          How was your experience? 🌟
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => setRating(num)}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(null)}
              className="transition"
            >
              <Star
                size={24}
                className={`${
                  (hovered || rating) >= num
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Leave a comment (optional)
        </label>
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your thoughts..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
