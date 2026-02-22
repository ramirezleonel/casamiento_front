import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, IconButton } from '@mui/material';
import { ChevronLeft, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import PhotoLightbox from '../components/PhotoLightbox';
import UploadModal from '../components/UploadModal';

const MotionDiv = motion.div;

const GalleryPage = () => {
    const { photos, addPhoto } = usePhotos();
    const navigate = useNavigate();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const openLightbox = (index) => {
        setCurrentPhotoIndex(index);
        setIsLightboxOpen(true);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
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

                <Grid container spacing={3}>
                    {photos.map((photo, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
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
                                                {photo.author ? `Por ${photo.author}` : 'Momento mágico'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </MotionDiv>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <PhotoLightbox
                isOpen={isLightboxOpen}
                photo={photos[currentPhotoIndex]}
                onClose={() => setIsLightboxOpen(false)}
                onNext={photos.length > 1 ? nextPhoto : null}
                onPrev={photos.length > 1 ? prevPhoto : null}
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
