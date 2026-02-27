import React, { createContext, useState, useContext, useEffect } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/photos/`);
            if (!response.ok) throw new Error('Failed to fetch photos');
            const data = await response.json();

            // Map backend naming to frontend naming if needed
            const formattedPhotos = data.map(photo => ({
                id: photo.id,
                url: photo.url,
                author: photo.uploader_name || photo.author || 'Invitado',
                created_at: photo.created_at || photo.timestamp
            }));

            // Sort by timestamp descending
            formattedPhotos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            setPhotos(formattedPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const addPhoto = (newPhoto) => {
        setPhotos(prev => [newPhoto, ...prev]);
    };

    const deletePhoto = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/photos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete photo');
            setPhotos(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting photo:', error);
            throw error;
        }
    };

    return (
        <PhotoContext.Provider value={{ photos, addPhoto, deletePhoto, loading, refreshPhotos: fetchPhotos }}>
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
