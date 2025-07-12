import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import UserCard from '../components/UserCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    console.log("🏠 Home Page Rendered!");
    console.log("🏠 Current User:", currentUser);

    useEffect(() => {
        console.log("🏠 useEffect - Fetching users");
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users');
                console.log("🏠 Users fetched:", response.data);
                setUsers(response.data);
            } catch (err) {
                console.error("🏠 Error fetching users:", err);
                setError('Failed to load users. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Welcome, {currentUser?.name}!
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse skilled users ready to exchange knowledge with you
                    </p>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users
                            .filter(user => user._id !== currentUser?._id)
                            .map(user => (
                                <UserCard key={user._id} user={user} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;