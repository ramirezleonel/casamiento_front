import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, TextField } from '@mui/material';
import { ChevronLeft, MessageSquare, Quote, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';
import MessageModal from '../components/MessageModal';

const MotionDiv = motion.div;

const MessageCard = ({ content, author, timestamp }) => {
    return (
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
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                borderColor: 'var(--primary-gold)',
            },
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

            <Box sx={{ flexGrow: 1, pt: 2, mb: 3 }}>
                <Typography variant="body1" sx={{
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: 'var(--text-dark)',
                    whiteSpace: 'pre-wrap'
                }}>
                    "{content}"
                </Typography>
            </Box>

            <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.05)', pt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--primary-gold)' }}>
                    {author}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>
                    {new Date(timestamp).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </Typography>
            </Box>
        </Card>
    );
};

const MessagesPage = () => {
    const { messages, addMessage, loading } = useMessages();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg =>
        msg.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg-cream)', py: 6 }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 6,
                    gap: 3
                }}>
                    <Button
                        startIcon={<ChevronLeft />}
                        onClick={() => navigate('/')}
                        sx={{ color: 'var(--text-muted)', textTransform: 'none', alignSelf: 'flex-start' }}
                    >
                        Volver al Inicio
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ mb: 1, color: 'var(--text-dark)' }}>
                            Libro de Recuerdos
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Box sx={{ height: '1px', width: '40px', bgcolor: 'var(--primary-gold)' }} />
                            <Heart size={16} color="var(--primary-gold)" fill="var(--primary-gold)" />
                            <Box sx={{ height: '1px', width: '40px', bgcolor: 'var(--primary-gold)' }} />
                        </Box>
                    </Box>

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
                        Escribir Mensaje
                    </Button>
                </Box>

                {/* Search Bar */}
                <Box sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
                    <TextField
                        fullWidth
                        placeholder="Buscar por nombre o mensaje..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                bgcolor: 'white',
                                '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                                '&:hover fieldset': { borderColor: 'var(--primary-gold)' },
                                '&.Mui-focused fieldset': { borderColor: 'var(--primary-gold)' },
                            }
                        }}
                    />
                </Box>

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                        <Typography variant="h6" sx={{ color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: 2 }}>
                            Cargando mensajes...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* Messages Grid */}
                        <Grid container spacing={4}>
                            <AnimatePresence mode="popLayout">
                                {filteredMessages.map((msg, index) => (
                                    <Grid item xs={12} sm={6} lg={4} key={msg.id}>
                                        <MotionDiv
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <MessageCard {...msg} />
                                        </MotionDiv>
                                    </Grid>
                                ))}
                            </AnimatePresence>
                        </Grid>

                        {filteredMessages.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 12 }}>
                                <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    {searchTerm ? 'No se encontraron mensajes con ese criterio' : 'Todavía no hay mensajes. ¡Sé el primero en compartir uno!'}
                                </Typography>
                            </Box>
                        )}
                    </>
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

export default MessagesPage;
