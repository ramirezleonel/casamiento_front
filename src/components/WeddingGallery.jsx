import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia } from '@mui/material';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import UploadModal from './UploadModal';
import PhotoLightbox from './PhotoLightbox';
import { PhotoAlbum } from '@mui/icons-material';

const MotionDiv = motion.div;

const WeddingGallery = () => {
    const { photos, addPhoto } = usePhotos();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const showQuantityPhotos = 6;

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
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    gap: 2
                }}>
                    <Box>
                        <Typography variant="h3" sx={{ mb: 1 }}>
                            Fotos de la Boda
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            ¡Comparte tus momentos favoritos con nosotros durante el evento!
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<PhotoAlbum size={20} />}
                            onClick={() => navigate('/gallery')}
                            sx={{
                                color: 'var(--primary-gold)',
                                borderColor: 'var(--primary-gold)',
                                '&:hover': {
                                    backgroundColor: 'rgba(197, 160, 89, 0.05)',
                                    borderColor: 'var(--secondary-gold)'
                                },
                                borderRadius: '50px',
                                px: 4,
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Ver todos los momentos
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<Plus size={20} />}
                            onClick={() => setIsModalOpen(true)}
                            sx={{
                                backgroundColor: 'var(--primary-gold)',
                                '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                                borderRadius: '50px',
                                px: 4,
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: '0 8px 20px rgba(197, 160, 89, 0.3)'
                            }}
                        >
                            Subir Foto
                        </Button>
                    </Box>
                </Box>

                {photos.length > 0 ? (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {photos.slice(0, showQuantityPhotos).map((photo, index) => (
                                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                                    <MotionDiv
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        layout
                                    >
                                        <Card sx={{
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease'
                                            }
                                        }}>
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="350"
                                                    image={photo.url}
                                                    alt="Wedding memory"
                                                    sx={{
                                                        objectFit: 'cover',
                                                        cursor: 'zoom-in'
                                                    }}
                                                    onClick={() => openLightbox(index)}
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
                        </AnimatePresence>
                    </Grid>
                ) : (
                    <Box sx={{
                        textAlign: 'center',
                        py: 10,
                        border: '2px dashed #ddd',
                        borderRadius: '30px'
                    }}>
                        <ImageIcon size={48} style={{ color: '#ccc', marginBottom: '16px' }} />
                        <Typography variant="h6" color="text.secondary">
                            Aún no hay fotos. ¡Sé el primero en compartir una!
                        </Typography>
                    </Box>
                )}
            </Container>

            <UploadModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUploadSuccess={addPhoto}
            />

            <PhotoLightbox
                isOpen={isLightboxOpen}
                photo={photos[currentPhotoIndex]}
                onClose={() => setIsLightboxOpen(false)}
                onNext={photos.length > 1 ? nextPhoto : null}
                onPrev={photos.length > 1 ? prevPhoto : null}
            />
        </Box>
    );
};

export default WeddingGallery;
