import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Countdown from '../components/Countdown';
import PhotoCarousel from '../components/PhotoCarousel';
import WeddingGallery from '../components/WeddingGallery';
import GuestMessages from '../components/GuestMessages';
import DonationQR from '../components/DonationQR';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Home = () => {
    const weddingDate = "2026-04-11T10:00:00";

    return (
        <Box sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography
                            variant="overline"
                            sx={{ letterSpacing: '8px', color: 'var(--primary-gold)', fontWeight: 600 }}
                        >
                            NOS CASAMOS
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem' },
                                mt: 2,
                                mb: 1,
                                fontWeight: 400
                            }}
                        >
                            Karen & Leo
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontStyle: 'italic',
                                color: 'var(--text-muted)',
                                mb: 6
                            }}
                        >
                            11 de Abril del 2026 • Chaco, Argentina
                        </Typography>
                    </MotionDiv>

                    <Countdown targetDate={weddingDate} />
                </Box>

                {/* Carousel Section */}
                <Box sx={{ mb: 12 }}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6 }}
                    >
                        Nuestra Historia
                    </Typography>
                    <PhotoCarousel />
                </Box>

                {/* New Wedding Gallery Section */}
                <WeddingGallery />

                {/* Guest Messages Section */}
                <GuestMessages />

                {/* Gift Section / Donation QR */}
                <Box id="regalos" sx={{ mt: 10 }}>
                    <DonationQR />
                </Box>

                {/* Footer */}
                <Box sx={{ textAlign: 'center', pb: 4 }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Eclesiastés 4:12 (NVI): Uno solo puede ser vencido,pero dos pueden resistir. ¡La cuerda de tres hilos no se rompe fácilmente!
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
