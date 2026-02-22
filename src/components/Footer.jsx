import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import recienCasadosImg from '../assets/photos/recien_casados-preview.png';

const MotionBox = motion(Box);

const Footer = () => {
    return (
        <Box sx={{
            width: '100%',
            py: 6,
            bgcolor: 'transparent',
            overflow: 'hidden',
            position: 'relative',
            mt: 8
        }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'var(--text-muted)',
                            fontStyle: 'italic',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.8
                        }}
                    >
                        Eclesiastés 4:12 (NVI): "Uno solo puede ser vencido, pero dos pueden resistir. ¡La cuerda de tres hilos no se rompe fácilmente!"
                    </Typography>
                </Box>
            </Container>

            {/* Car Animation Container */}
            <Box sx={{
                width: '100%',
                height: '120px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Horizontal Road Line (Optional/Subtle) */}
                <Box sx={{
                    position: 'absolute',
                    bottom: '20%',
                    width: '100%',
                    height: '2px',
                    bgcolor: 'rgba(197, 160, 89, 0.1)'
                }} />

                <MotionBox
                    initial={{ x: '-200px' }}
                    animate={{
                        x: '150vw',
                        y: [0, -4, 0]
                    }}
                    transition={{
                        x: {
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        },
                        y: {
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    sx={{
                        position: 'absolute',
                        mt: '20px',
                        height: '340px',
                        display: 'flex',
                        alignItems: 'center',
                        bottom: '5%',
                    }}
                >
                    <img
                        src={recienCasadosImg}
                        alt="Recién Casados"
                        style={{
                            height: '100%',
                            width: 'auto',
                            display: 'block'
                        }}
                    />
                </MotionBox>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4, pb: 2 }}>
                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '2px' }}>
                    KAREN & LEO • 2026
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
