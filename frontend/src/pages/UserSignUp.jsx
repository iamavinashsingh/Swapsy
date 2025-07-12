import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { setToken } from '../utils/tokenUtils';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/swapsy-logo.png'

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
        const { confirmPassword, ...signupData } = formData;
        const response = await axiosInstance.post('/users/register', signupData);
        
        const { token, user } = response.data;
        setToken(token);
        login(user, token);
        navigate('/home');
        
        } catch (err) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-swapsy">
        
        
        <div className="max-w-md mx-auto px-4 py-6 ">
            <div className="p-8 rounded-xl shadow-md flex flex-col items-center justify-center bg-gray-800 border border-gray-700">
                <img src={Logo} alt="swapsy Logo" className='h-16 mb-5 ' />
            <h2 className="text-xl font-bold text-center text-tertiary mb-8">
                Create Account
            </h2>
            
            {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-6 w-80">
                <label htmlFor="name" className="block text-gray-500 mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg "
                    required
                />
                </div>
                
                <div className="mb-6">
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
                    className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg "
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg "
                    required
                />
                </div>
                
                <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-500 mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
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
                {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-gray-500">
                Already have an account?{' '}
                <Link 
                    to="/login" 
                    className="text-primary font-medium hover:underline"
                >
                    Login
                </Link>
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default UserSignUp;