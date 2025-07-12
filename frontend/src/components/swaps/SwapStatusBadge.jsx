import React from 'react';

const statusMap = {
  pending: {
    label: 'Pending',
    bg: 'bg-yellow-100 dark:bg-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
  },
  accepted: {
    label: 'Accepted',
    bg: 'bg-green-100 dark:bg-green-800',
    text: 'text-green-800 dark:text-green-200',
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-red-100 dark:bg-red-800',
    text: 'text-red-800 dark:text-red-200',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-gray-200 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-300',
  },
};

const SwapStatusBadge = ({ status }) => {
  const style = statusMap[status?.toLowerCase()] || statusMap['pending'];

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${style.bg} ${style.text}`}
      aria-label={`Status: ${style.label}`}
    >
      {style.label}
    </span>
  );
};

export default SwapStatusBadge;
