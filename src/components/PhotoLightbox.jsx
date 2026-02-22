import React from 'react';
import { Box, IconButton } from '@mui/material';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoLightbox = ({ isOpen, photo, onClose, onNext, onPrev }) => {
    if (!photo) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'rgba(0,0,0,0.95)',
                        zIndex: 3000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        <X size={32} />
                    </IconButton>

                    {onPrev && (
                        <IconButton
                            onClick={onPrev}
                            sx={{
                                position: 'absolute',
                                left: { xs: 10, md: 30 },
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.05)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            <ChevronLeft size={40} />
                        </IconButton>
                    )}

                    <Box
                        component={motion.img}
                        key={photo.id}
                        src={photo.url}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        sx={{
                            maxWidth: '90%',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                        }}
                        alt="Zoomed wedding photo"
                    />

                    {onNext && (
                        <IconButton
                            onClick={onNext}
                            sx={{
                                position: 'absolute',
                                right: { xs: 10, md: 30 },
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.05)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                            }}
                        >
                            <ChevronRight size={40} />
                        </IconButton>
                    )}

                    <Box sx={{
                        position: 'absolute',
                        bottom: 30,
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'italic',
                        fontSize: '0.9rem'
                    }}>
                        Desliza o usa las flechas para navegar
                    </Box>
                </Box>
            )}
        </AnimatePresence>
    );
};

export default PhotoLightbox;
