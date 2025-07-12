import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">@{user.username}</p>
            </div>
        </div>
        
        <div className="mb-4">
            <p className="text-gray-700 line-clamp-2">{user.bio || 'No bio available'}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {user.skills?.slice(0, 3).map((skill, index) => (
            <span 
                key={index} 
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
            >
                {skill}
            </span>
            ))}
        </div>
        
        <Link 
            to={`/profile/${user.id}`} 
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
            View Profile →
        </Link>
        </div>
    );
};

export default UserCard;