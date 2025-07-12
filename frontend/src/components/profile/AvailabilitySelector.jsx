import React from 'react';
import { motion } from 'framer-motion';

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Mornings',
  'Flexible',
];

const AvailabilitySelector = ({ value = [], onChange }) => {
  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Availability 🕰️
      </label>

      <div className="flex flex-wrap gap-2">
        {availabilityOptions.map((option) => {
          const selected = value.includes(option);
          return (
            <motion.button
              key={option}
              onClick={() => toggleOption(option)}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm border transition
                ${
                  selected
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                }`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Optional custom text input */}
      <input
        type="text"
        placeholder="Or type your own (e.g., Mon-Wed evenings)"
        className="w-full mt-3 p-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        onChange={(e) => onChange([e.target.value])}
      />
    </div>
  );
};

export default AvailabilitySelector;
