import React, { createContext, useState, useContext } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [photos, setPhotos] = useState([
        { id: 1, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop', author: 'Leo', timestamp: new Date().toISOString() },
        { id: 2, url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974&auto=format&fit=crop', author: 'Karen', timestamp: new Date().toISOString() },
        { id: 3, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', author: 'Boda', timestamp: new Date().toISOString() },
    ]);

    const addPhoto = (newPhoto) => {
        setPhotos(prev => [newPhoto, ...prev]);
    };

    return (
        <PhotoContext.Provider value={{ photos, addPhoto }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhotos = () => {
    const context = useContext(PhotoContext);
    if (!context) {
        throw new Error('usePhotos must be used within a PhotoProvider');
    }
    return context;
};
