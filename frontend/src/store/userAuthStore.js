import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { useMessageStore } from './messageStore';

const SERVER_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8080' : '/';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check-auth');
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log('Error checking auth:', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (userData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', userData);
            set({ authUser: res.data });
            get().connectSocket();
            toast.success('Signup successful!');
            setTimeout(() => {
                window.location.reload();
            }, 250);
        } catch (error) {
            console.log('Error during signup:', error);
            toast.error(error.response?.data?.message || 'Signup failed');
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (userData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', userData);
            set({ authUser: res.data });
            get().connectSocket();
            toast.success('Login successful!');
            useMessageStore.getState().setSelectedUser(null); // Clear selected user on login
            setTimeout(() => {
                window.location.reload();
            }, 250);
        } catch (error) {
            console.log('Error during login:', error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logout successful!');
            get().disconnectSocket();
        } catch (error) {
            console.log('Error during logout:', error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    },

    updateProfile: async ( data ) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.log('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Profile update failed');
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(SERVER_URL, {
            query: {
                userId: authUser._id,
            }
        });

        socket.connect();
        set({ socket });

        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }
    
}))