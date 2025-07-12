import React from 'react';
import { Check, X, Trash2 } from 'lucide-react';

const SwapActions = ({
  type = 'incoming',
  onAccept,
  onReject,
  onCancel,
}) => {
  if (type === 'incoming') {
    return (
      <div className="flex gap-2 mt-2">
        <button
          onClick={onAccept}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition"
        >
          <Check size={16} /> Accept
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
        >
          <X size={16} /> Reject
        </button>
      </div>
    );
  }

  if (type === 'sent') {
    return (
      <div className="flex gap-2 mt-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md transition"
        >
          <Trash2 size={16} /> Cancel
        </button>
      </div>
    );
  }

  return null;
};

export default SwapActions;
