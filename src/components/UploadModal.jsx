import React, { useState, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardMedia
} from '@mui/material';
import { X, Upload, Camera, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const UploadModal = ({ open, onClose, onUploadSuccess }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const processFiles = (files) => {
        const fileList = Array.from(files);
        const validFiles = fileList.filter(file => file.type.startsWith('image/'));

        if (validFiles.length + selectedFiles.length > 15) {
            alert("Solo puedes subir un máximo de 15 fotos.");
            return;
        }

        const newPreviews = [];
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
            newPreviews.push(file);
        });

        setSelectedFiles(prev => [...prev, ...validFiles]);
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    }, [selectedFiles]);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const resetState = () => {
        setSelectedFiles([]);
        setPreviews([]);
        setIsUploading(false);
        setDragActive(false);
    };

    const handleClose = () => {
        if (!isUploading) {
            resetState();
            onClose();
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setIsUploading(true);

        try {
            // Simulate upload for each file
            for (let i = 0; i < selectedFiles.length; i++) {
                // Here you would normally upload each file to your backend
                await new Promise(resolve => setTimeout(resolve, 500));

                onUploadSuccess({
                    id: Date.now() + i,
                    url: previews[i],
                    timestamp: new Date().toISOString()
                });
            }

            handleClose();
        } catch (error) {
            console.error("Upload failed", error);
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                className: 'glass-card',
                sx: {
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                    Subir Fotos de la Boda ({selectedFiles.length}/15)
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
                <AnimatePresence mode="wait">
                    {selectedFiles.length === 0 ? (
                        <MotionDiv
                            key="uploader"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{
                                position: 'relative',
                                border: dragActive ? '2px dashed var(--primary-gold)' : '2px dashed #ddd',
                                borderRadius: '20px',
                                padding: '60px 20px',
                                textAlign: 'center',
                                backgroundColor: dragActive ? 'rgba(197, 160, 89, 0.05)' : 'transparent',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('file-upload').click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />

                            <Box sx={{ mb: 2 }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    color: 'var(--primary-gold)'
                                }}>
                                    <Upload size={32} />
                                </div>
                            </Box>

                            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                                Arrastra tus fotos aquí (máx. 15)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                O haz clic para seleccionar de tu galería
                            </Typography>

                            <Button
                                variant="outlined"
                                startIcon={<Camera size={18} />}
                                sx={{
                                    mt: 3,
                                    borderColor: 'var(--primary-gold)',
                                    color: 'var(--primary-gold)',
                                    '&:hover': {
                                        borderColor: 'var(--secondary-gold)',
                                        backgroundColor: 'rgba(197, 160, 89, 0.05)',
                                    },
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    px: 4
                                }}
                            >
                                Abrir Galería
                            </Button>
                        </MotionDiv>
                    ) : (
                        <MotionDiv
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Grid container spacing={2} sx={{ mb: 3, maxHeight: '400px', overflowY: 'auto', p: 1 }}>
                                {previews.map((url, index) => (
                                    <Grid item xs={4} sm={3} key={index}>
                                        <Card sx={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={url}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            {!isUploading && (
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFile(index);
                                                    }}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        '&:hover': { backgroundColor: 'white', color: 'red' }
                                                    }}
                                                >
                                                    < Trash2 size={14} />
                                                </IconButton>
                                            )}
                                        </Card>
                                    </Grid>
                                ))}
                                {selectedFiles.length < 15 && !isUploading && (
                                    <Grid item xs={4} sm={3}>
                                        <Box
                                            onClick={() => document.getElementById('file-upload-more').click()}
                                            sx={{
                                                height: '100px',
                                                border: '2px dashed #ddd',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: 'var(--primary-gold)', color: 'var(--primary-gold)' }
                                            }}
                                        >
                                            <Plus size={24} />
                                            <input
                                                id="file-upload-more"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                style={{ display: 'none' }}
                                                onChange={handleChange}
                                            />
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>

                            {isUploading && (
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <CircularProgress size={24} sx={{ mb: 1 }} />
                                    <Typography variant="body2">
                                        Subiendo tus momentos mágicos...
                                    </Typography>
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    onClick={resetState}
                                    disabled={isUploading}
                                    sx={{
                                        color: 'var(--text-muted)',
                                        textTransform: 'none'
                                    }}
                                >
                                    Limpiar todo
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    sx={{
                                        backgroundColor: 'var(--primary-gold)',
                                        '&:hover': { backgroundColor: 'var(--secondary-gold)' },
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        px: 6,
                                        py: 1.5,
                                        boxShadow: '0 4px 14px rgba(197, 160, 89, 0.4)'
                                    }}
                                >
                                    Compartir {selectedFiles.length} {selectedFiles.length === 1 ? 'Foto' : 'Fotos'}
                                </Button>
                            </Box>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};

export default UploadModal;
