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
    Fade
} from '@mui/material';
import { X, Upload, Image as ImageIcon, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const UploadModal = ({ open, onClose, onUploadSuccess }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFile(file);
        }
    };

    const resetState = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
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
        if (!selectedFile) return;

        setIsUploading(true);

        try {
            // Here you would normally use FormData and fetch/axios
            // const formData = new FormData();
            // formData.append('photo', selectedFile);
            // await axios.post('/api/upload', formData);

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

            onUploadSuccess({
                id: Date.now(),
                url: previewUrl,
                timestamp: new Date().toISOString()
            });

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
            maxWidth="sm"
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
                    Subir Foto de la Boda
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
                    {!previewUrl ? (
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
                                padding: '40px 20px',
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
                                Arrastra tu foto aquí
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                O haz clic para seleccionar una de tu galería
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
                            style={{ textAlign: 'center' }}
                        >
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                maxHeight: '400px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                mb: 3,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        maxHeight: '400px',
                                        objectFit: 'contain'
                                    }}
                                />

                                {isUploading && (
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <CircularProgress color="primary" sx={{ mb: 2 }} />
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            Subiendo momento mágico...
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    onClick={resetState}
                                    disabled={isUploading}
                                    sx={{
                                        color: 'var(--text-muted)',
                                        textTransform: 'none'
                                    }}
                                >
                                    Cambiar foto
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
                                    Compartir Foto
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
