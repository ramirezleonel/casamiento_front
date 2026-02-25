import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Box,
    Typography,
    TextField,
    CircularProgress
} from '@mui/material';
import { X, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const MessageModal = ({ open, onClose, onMessageAdded }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxLength = 500;

    const resetState = () => {
        setAuthor('');
        setContent('');
        setIsSubmitting(false);
    };

    const handleClose = () => {
        if (!isSubmitting) {
            resetState();
            onClose();
        }
    };

    const handleSubmit = async () => {
        if (!author.trim() || !content.trim()) return;

        setIsSubmitting(true);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${baseUrl}/messages/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: author.trim(),
                    content: content.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje');
            }

            const data = await response.json();

            onMessageAdded({
                id: data.id,
                author: data.author,
                content: data.content,
                timestamp: data.timestamp
            });

            handleClose();
        } catch (error) {
            console.error("Error submitting message:", error);
            alert("No se pudo enviar el mensaje. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                className: 'glass-card',
                sx: {
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Heart size={24} color="var(--primary-gold)" fill="var(--primary-gold)" />
                    Deja tu mensaje
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        color: 'var(--text-muted)',
                        '&:hover': { color: 'var(--text-dark)' }
                    }}
                >
                    <X size={24} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <AnimatePresence>
                    <MotionDiv
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Tu Nombre"
                                variant="outlined"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: '#ddd' },
                                        '&:hover fieldset': { borderColor: 'var(--primary-gold)' },
                                        '&.Mui-focused fieldset': { borderColor: 'var(--primary-gold)' },
                                    }
                                }}
                            />

                            <Box>
                                <TextField
                                    fullWidth
                                    label="Tu mensaje para los novios"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: 'var(--primary-gold)' },
                                            '&.Mui-focused fieldset': { borderColor: 'var(--primary-gold)' },
                                        }
                                    }}
                                />
                                <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'right', color: content.length >= maxLength ? 'red' : 'var(--text-muted)' }}>
                                    {content.length}/{maxLength} caracteres
                                </Typography>
                            </Box>

                            {isSubmitting ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                                    <CircularProgress size={24} sx={{ mb: 1, color: 'var(--primary-gold)' }} />
                                    <Typography variant="body2" color="var(--text-muted)">Enviando mensaje...</Typography>
                                </Box>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={!author.trim() || !content.trim()}
                                    startIcon={<MessageSquare size={18} />}
                                    sx={{
                                        backgroundColor: 'var(--primary-gold)',
                                        '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                                        borderRadius: '12px',
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        boxShadow: '0 4px 14px rgba(197, 160, 89, 0.4)'
                                    }}
                                >
                                    Enviar mis deseos
                                </Button>
                            )}
                        </Box>
                    </MotionDiv>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};

export default MessageModal;
