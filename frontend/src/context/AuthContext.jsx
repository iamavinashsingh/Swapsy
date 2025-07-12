import { createContext, useState, useEffect, useContext } from 'react';
import { getToken, removeToken, setToken } from '../utils/tokenUtils';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getToken();
            if (token) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axiosInstance.get('/users/profile');
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error('❌ Failed to fetch user profile:', error);
                    removeToken();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (userData, token) => {
        setToken(token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCurrentUser(userData);
    };

    const logout = () => {
        removeToken();
        delete axiosInstance.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}