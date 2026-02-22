import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        { id: 1, author: 'Mamá de Karen', content: '¡Felicidades a los dos! Que sean siempre muy felices.', timestamp: new Date().toISOString() },
        { id: 2, author: 'Amiga de karen', content: '¡Qué gran noticia! Les deseo lo mejor en esta nueva etapa.', timestamp: new Date().toISOString() },
    ]);

    const addMessage = (newMessage) => {
        setMessages(prev => [newMessage, ...prev]);
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage }}>
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
