import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Backend Base URL
const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/users';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Set default headers for Axio when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            // Rehydrate user info from backend securely on reload
            fetchUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/getuser`);
            setUser(res.data.user);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            // If token is invalid, clear it.
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Login Failed" };
        }
    };

    const register = async (userData) => {
        try {
            await axios.post(`${API_URL}/register`, userData);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.errors || err.response?.data?.error || "Registration Failed" };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
