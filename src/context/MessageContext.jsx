import React, { createContext, useState, useContext, useEffect } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/messages/`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();

            // Sort by created_at descending
            const sortedMessages = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const addMessage = (newMessage) => {
        setMessages(prev => [newMessage, ...prev]);
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage, loading, refreshMessages: fetchMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
};
