import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { setToken } from '../utils/tokenUtils';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/swapsy-logo.png'

const UserLogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    const from = location.state?.from?.pathname || '/home';
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axiosInstance.post('/users/login', formData);
            const { token, user } = response.data;
            
            setToken(token);
            login(user, token);
            
            // Ensure navigation happens after state updates
            setTimeout(() => {
                navigate(from, { replace: true });
                console.log("Navigating to:", from);
            }, 0);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-swapsy">        
            <div className="max-w-md mx-auto px-4 py-30 ">
                <div className="p-8 rounded-xl shadow-md flex flex-col items-center justify-center bg-gray-800 border border-gray-700">
                <img src={Logo} alt="swapsy Logo" className='h-16 mb-5 ' />
                <h2 className="text-xl font-bold text-center text-tertiary mb-8">
                    Welcome Back
                </h2>
                
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
                    {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 w-80">
                    <label htmlFor="email" className="block text-gray-500 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="username"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    
                    <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-500 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg "
                        required
                    />
                    </div>
                    
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-accent transition focus:outline-none disabled:opacity-50"
                    >
                    {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-500">
                    Don't have an account?{' '}
                    <Link 
                        to="/signup" 
                        className="text-primary font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogIn;