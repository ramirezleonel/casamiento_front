import { useState, useCallback } from 'react';
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
    CardMedia,
    TextField
} from '@mui/material';
import { X, Upload, Camera, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const UploadModal = ({ open, onClose, onUploadSuccess }) => {
    const [step, setStep] = useState(1); // 1: Selection/Preview, 2: Guest Name
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [guestName, setGuestName] = useState('');
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

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
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
        setGuestName('');
        setStep(1);
        setIsUploading(false);
        setDragActive(false);
    };

    const handleClose = () => {
        if (!isUploading) {
            resetState();
            onClose();
        }
    };

    const handleNextStep = () => {
        if (selectedFiles.length > 0) {
            setStep(2);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || !guestName.trim()) return;

        setIsUploading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        try {
            // Step 1: Get presigned URLs
            const urlResponse = await fetch(`${baseUrl}/photos/generate-upload-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: selectedFiles.map(file => ({
                        file_name: file.name,
                        file_type: file.type
                    }))
                })
            });

            if (!urlResponse.ok) throw new Error('Failed to get upload URLs');
            const { items } = await urlResponse.json();

            // Step 2: Upload files directly to S3
            const uploadPromises = items.map(async (item, index) => {
                const file = selectedFiles[index];
                const uploadResponse = await fetch(item.url, {
                    method: 'PUT',
                    body: file,
                    headers: { 'Content-Type': file.type }
                });

                if (!uploadResponse.ok) throw new Error(`Failed to upload ${file.name}`);

                return {
                    file_key: item.file_key,
                    description: "", // Could be enhanced later
                    uploader_name: guestName.trim()
                };
            });

            const uploadedPhotosMetadata = await Promise.all(uploadPromises);

            // Step 3: Confirm upload in backend
            const confirmResponse = await fetch(`${baseUrl}/photos/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    photos: uploadedPhotosMetadata
                })
            });

            if (!confirmResponse.ok) throw new Error('Failed to confirm upload');
            const confirmData = await confirmResponse.json();

            // Notify parent components
            confirmData.items.forEach(photo => {
                onUploadSuccess({
                    id: photo.id,
                    url: photo.url,
                    author: guestName.trim(),
                    timestamp: new Date().toISOString()
                });
            });

            handleClose();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Hubo un error al subir las fotos. Por favor intenta de nuevo.");
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={step === 1 ? "md" : "xs"}
            PaperProps={{
                className: 'glass-card',
                sx: {
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.5s ease'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                    {step === 1 ? `Subir Fotos (${selectedFiles.length}/15)` : "Cuentanos quién eres"}
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
                    {step === 1 ? (
                        /* STEP 1: PHOTO SELECTION */
                        selectedFiles.length === 0 ? (
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
                                <input id="file-upload" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleChange} />
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    color: 'var(--primary-gold)'
                                }}>
                                    <Upload size={32} />
                                </div>
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>Arrastra tus fotos aquí (máx. 15)</Typography>
                                <Typography variant="body2" color="text.secondary">O haz clic para seleccionar de tu galería</Typography>
                                <Button variant="outlined" startIcon={<Camera size={18} />} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>Abrir Galería</Button>
                            </MotionDiv>
                        ) : (
                            <MotionDiv key="previews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Grid container spacing={2} sx={{ mb: 3, maxHeight: '400px', overflowY: 'auto', p: 1 }}>
                                    {previews.map((url, index) => (
                                        <Grid item xs={4} sm={3} key={index}>
                                            <Card sx={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                                                <CardMedia component="img" height="100" image={url} sx={{ objectFit: 'cover' }} />
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                                    sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255, 255, 255, 0.8)', '&:hover': { bgcolor: 'white', color: 'red' } }}
                                                >
                                                    <Trash2 size={14} />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    ))}
                                    {selectedFiles.length < 15 && (
                                        <Grid item xs={4} sm={3}>
                                            <Box
                                                onClick={() => document.getElementById('file-upload-more').click()}
                                                sx={{ height: '100px', border: '2px dashed #ddd', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <Plus size={24} color="#999" />
                                                <input id="file-upload-more" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleChange} />
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button onClick={resetState} sx={{ color: 'var(--text-muted)', textTransform: 'none' }}>Limpiar todo</Button>
                                    <Button variant="contained" onClick={handleNextStep} sx={{ backgroundColor: 'var(--primary-gold)', borderRadius: '12px', px: 6, py: 1.5, textTransform: 'none' }}>Continuar</Button>
                                </Box>
                            </MotionDiv>
                        )
                    ) : (
                        /* STEP 2: GUEST NAME */
                        <MotionDiv
                            key="name-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Box sx={{ mb: 4, mt: 2 }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    color: 'var(--primary-gold)'
                                }}>
                                    <Camera size={40} />
                                </div>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>¿A nombre de quién subimos estas fotos?</Typography>
                                <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 3 }}>Tu nombre aparecerá junto a tus fotos para que Karen y Leo sepan quién las compartió.</Typography>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    placeholder="Tu nombre completo"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: 'var(--primary-gold)' },
                                            '&.Mui-focused fieldset': { borderColor: 'var(--primary-gold)' },
                                        },
                                        '& .MuiInputBase-input': { textAlign: 'center', padding: '16px' }
                                    }}
                                />
                            </Box>
                            {isUploading ? (
                                <Box sx={{ py: 2 }}>
                                    <CircularProgress size={24} sx={{ mb: 1 }} />
                                    <Typography variant="body2">Subiendo imagenes...</Typography>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button onClick={() => setStep(1)} sx={{ color: 'var(--text-muted)', textTransform: 'none' }}>Atrás</Button>
                                    <Button variant="contained" onClick={handleUpload} disabled={!guestName.trim()} sx={{ backgroundColor: 'var(--primary-gold)', borderRadius: '12px', px: 4, textTransform: 'none' }}>Subir Momentos</Button>
                                </Box>
                            )}
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};

export default UploadModal;
