import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./userAuthStore";

export const useMessageStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isLoadingMessages: false,
    isLoadingUsers: false,

    getUsers: async () => {
        set({ isLoadingUsers: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            set({ isLoadingUsers: false });
        }
    },

    getMessages: async (userId) => {
        set({ isLoadingMessages: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error fetching messages:", error);
            toast.error("Failed to load messages");
        } finally {
            set({ isLoadingMessages: false });
        }
    },

    sendMessages: async ( messageData ) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log("Error sending message:", error);
            toast.error("Failed to send message");
        }
    },

    newMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) {
        return;
    }

    const Socket = useAuthStore.getState().socket;

    Socket.on('newMessage', (newMessage) => {
        const { selectedUser: currentSelectedUser, messages: currentMessages } = get();
        const currentUserId = useAuthStore.getState().authUser?._id;
        
        // CHANGE: Instead of just checking sender, check if message involves current conversation
        const isPartOfConversation = (
            newMessage.senderId === currentSelectedUser._id || 
            newMessage.receiverId === currentSelectedUser._id
        ) && (
            newMessage.senderId === currentUserId || 
            newMessage.receiverId === currentUserId
        );
        
        if (!isPartOfConversation) return;

        const messageExists = currentMessages.some(msg => msg._id === newMessage._id);
        if (messageExists) {
            console.log("Message already exists, skipping duplicate");
            return;
        }
        
        set({ messages: [...currentMessages, newMessage] });
    });
},

    removerMessageListener: () => {
        const Socket = useAuthStore.getState().socket;
        Socket.off('newMessage');
    },

    setSelectedUser: ( selectedUser ) => {
        set({ selectedUser: selectedUser });
    }

}))