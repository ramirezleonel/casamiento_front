import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia } from '@mui/material';
import { Plus, Camera, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadModal from './UploadModal';

const MotionDiv = motion.div;

const WeddingGallery = () => {
    const [photos, setPhotos] = useState([
        { id: 1, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop', timestamp: new Date().toISOString() },
        { id: 2, url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974&auto=format&fit=crop', timestamp: new Date().toISOString() },
        { id: 3, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', timestamp: new Date().toISOString() },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploadSuccess = (newPhoto) => {
        setPhotos(prev => [newPhoto, ...prev]);
    };

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 6,
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
                    <Button
                        variant="contained"
                        startIcon={<Plus size={20} />}
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            backgroundColor: 'var(--primary-gold)',
                            '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                            borderRadius: '50px',
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: '0 8px 20px rgba(197, 160, 89, 0.3)'
                        }}
                    >
                        Subir Foto
                    </Button>
                </Box>

                {photos.length > 0 ? (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {photos.map((photo, index) => (
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
                                            <CardMedia
                                                component="img"
                                                height="350"
                                                image={photo.url}
                                                alt="Wedding memory"
                                                sx={{ objectFit: 'cover' }}
                                            />
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
                onUploadSuccess={handleUploadSuccess}
            />
        </Box>
    );
};

export default WeddingGallery;
