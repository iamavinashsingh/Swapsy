import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserProtectWrapper = ({ children }) => {
    const { currentUser, isLoading } = useAuth();
    const location = useLocation();

    console.log("🛡️ UserProtectWrapper - isLoading:", isLoading);
    console.log("🛡️ UserProtectWrapper - currentUser:", currentUser);
    
    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        );
    }

    if (!currentUser) {
        console.log("🔒 Redirecting to login");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    console.log("🔐 Access granted to protected route");
    return children;
};

export default UserProtectWrapper;