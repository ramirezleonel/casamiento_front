import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, IconButton } from '@mui/material';
import { ChevronLeft, X, Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import PhotoLightbox from '../components/PhotoLightbox';
import UploadModal from '../components/UploadModal';
import { TextField, InputAdornment } from '@mui/material';

const MotionDiv = motion.div;

const GalleryPage = () => {
    const { photos, addPhoto } = usePhotos();
    const navigate = useNavigate();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPhotos = photos.filter(photo =>
        (photo.author || 'Momentos').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openLightbox = (index) => {
        setCurrentPhotoIndex(index);
        setIsLightboxOpen(true);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg-cream)', py: 6 }}>
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 6,
                    gap: 2
                }}>
                    <Button
                        startIcon={<ChevronLeft />}
                        onClick={() => navigate('/')}
                        sx={{ color: 'var(--text-muted)', textTransform: 'none' }}
                    >
                        Volver al Inicio
                    </Button>
                    <Typography variant="h2" sx={{ textAlign: 'center' }}>
                        Galería Completa
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={20} />}
                        onClick={() => setIsUploadModalOpen(true)}
                        sx={{
                            backgroundColor: 'var(--primary-gold)',
                            '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                            borderRadius: '50px',
                            px: 4,
                            textTransform: 'none'
                        }}
                    >
                        Subir Foto
                    </Button>
                </Box>

                {/* Filter Section */}
                <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        placeholder="Filtrar por invitado (ej: Karen, Leo...)"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            maxWidth: '500px',
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                bgcolor: 'white',
                                '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                                '&:hover fieldset': { borderColor: 'var(--primary-gold)' },
                                '&.Mui-focused fieldset': { borderColor: 'var(--primary-gold)' },
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={20} color="var(--primary-gold)" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Grid container spacing={3}>
                    <AnimatePresence mode="popLayout">
                        {filteredPhotos.map((photo, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                                <MotionDiv
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card
                                        onClick={() => openLightbox(index)}
                                        sx={{
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            cursor: 'zoom-in',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                            '&:hover img': {
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.5s ease'
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="350"
                                                image={photo.url}
                                                alt={`Wedding photo ${index}`}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <Box sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                p: 2,
                                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                                color: 'white',
                                                pointerEvents: 'none'
                                            }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
                                                    {photo.author ? `Por ${photo.author}` : 'Momentos'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </MotionDiv>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>

                {filteredPhotos.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            No se encontraron fotos de "{searchTerm}"
                        </Typography>
                    </Box>
                )}
            </Container>

            <PhotoLightbox
                isOpen={isLightboxOpen}
                photo={filteredPhotos[currentPhotoIndex]}
                onClose={() => setIsLightboxOpen(false)}
                onNext={filteredPhotos.length > 1 ? nextPhoto : null}
                onPrev={filteredPhotos.length > 1 ? prevPhoto : null}
            />

            <UploadModal
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={addPhoto}
            />
        </Box>
    );
};

export default GalleryPage;
