import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card } from '@mui/material';
import { MessagesSquare, Quote, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '../context/MessageContext';
import MessageModal from './MessageModal';
import { useNavigate } from 'react-router-dom';

const MotionDiv = motion.div;

const GuestMessages = () => {
    const { messages, addMessage } = useMessages();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Box sx={{ py: 10, bgcolor: 'rgba(255, 255, 255, 0.5)' }}>
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
                            Mensajes de los invitados
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            Deciles algo especial a los novios para este gran día.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>

                        <Button
                            variant="outlined"
                            startIcon={<MessagesSquare size={20} />}
                            onClick={() => navigate('/messages')}
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
                            Ver todos los mensajes
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<MessageSquare size={20} />}
                            onClick={() => setIsModalOpen(true)}
                            sx={{
                                backgroundColor: 'var(--primary-gold)',
                                '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                                borderRadius: '50px',
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: '0 8px 20px rgba(197, 160, 89, 0.3)'
                            }}
                        >
                            Dejar un Mensaje
                        </Button>
                    </Box>

                </Box>

                <Grid container spacing={3}>
                    <AnimatePresence>
                        {messages.slice(0, 6).map((msg, index) => (
                            <Grid item xs={12} sm={6} md={4} key={msg.id}>
                                <MotionDiv
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    layout
                                >
                                    <Card sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: '24px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(197, 160, 89, 0.15)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '4px',
                                            height: '100%',
                                            backgroundColor: 'var(--primary-gold)',
                                        }
                                    }}>
                                        <Quote size={24} color="var(--primary-gold)" style={{ opacity: 0.2, marginBottom: '-10px' }} />

                                        <Typography variant="body1" sx={{
                                            flexGrow: 1,
                                            mb: 3,
                                            pt: 2,
                                            fontStyle: 'italic',
                                            lineHeight: 1.6,
                                            color: 'var(--text-dark)',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            "{msg.content}"
                                        </Typography>

                                        <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.05)', pt: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--primary-gold)' }}>
                                                {msg.author}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </MotionDiv>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>

                {messages.length > 6 && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button
                            onClick={() => navigate('/messages')}
                            endIcon={<ChevronRight size={18} />}
                            sx={{ color: 'var(--primary-gold)', fontWeight: 600, textTransform: 'none' }}
                        >
                            Ver todos los mensajes ({messages.length})
                        </Button>
                    </Box>
                )}

                {messages.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                            Aún no hay mensajes. ¡Sé el primero en escribir!
                        </Typography>
                    </Box>
                )}
            </Container>

            <MessageModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onMessageAdded={addMessage}
            />
        </Box>
    );
};

export default GuestMessages;
