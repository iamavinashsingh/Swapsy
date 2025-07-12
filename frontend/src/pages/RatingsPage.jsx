import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const RatingsPage = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert('Please select a rating.');

    try {
      setSubmitting(true);
      await axios.post(
        `/api/feedback/rate`,
        { swapId, rating, comment: feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Thank you for your feedback! 😊');
      navigate('/history');
    } catch (err) {
      alert('Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Rate Your Swap Partner ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stars */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                size={32}
                onClick={() => handleRating(num)}
                className={`cursor-pointer ${
                  rating >= num
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Feedback */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Optional Feedback
            </label>
            <textarea
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell them what you liked or what could improve..."
              className="w-full p-3 rounded-md border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default RatingsPage;
