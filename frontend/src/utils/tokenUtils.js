// Helper functions for JWT token management
    export const getToken = () => {
    return localStorage.getItem('swapsy_token');
    };

    export const setToken = (token) => {
    localStorage.setItem('swapsy_token', token);
    };

    export const removeToken = () => {
    localStorage.removeItem('swapsy_token');
    };