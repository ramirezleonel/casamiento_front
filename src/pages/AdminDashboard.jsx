import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Tooltip
} from '@mui/material';
import { Trash2, Image as ImageIcon, MessageSquare, LogOut, ChevronLeft, Download, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import { useMessages } from '../context/MessageContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { photos, deletePhoto } = usePhotos();
    const { messages, deleteMessage } = useMessages();
    const [tabValue, setTabValue] = useState(0);

    // States for Modals
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewItem, setPreviewItem] = useState(null); // { type: 'photo'|'message', data: {} }

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/authenticationpro');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/');
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            if (tabValue === 0) {
                await deletePhoto(deleteId);
            } else {
                await deleteMessage(deleteId);
            }
            setDeleteId(null);
        } catch (error) {
            alert('Error al eliminar');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename || 'boda-foto.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            alert('No se pudo descargar la imagen directamente. Intenta abrirla y guardarla manualmente.');
        }
    };

    const openPreview = (type, data) => {
        setPreviewItem({ type, data });
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fdfaf5', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => navigate('/')} sx={{ bgcolor: 'white', border: '1px solid #eee' }}>
                            <ChevronLeft size={20} />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>Admin Panel</Typography>
                    </Box>
                    <Button
                        startIcon={<LogOut size={18} />}
                        onClick={handleLogout}
                        sx={{ color: 'red', textTransform: 'none' }}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>

                <Paper sx={{ borderRadius: '20px', overflow: 'hidden', mb: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <Tabs
                        value={tabValue}
                        onChange={(e, v) => setTabValue(v)}
                        sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab icon={<ImageIcon size={20} />} label="Fotos" iconPosition="start" />
                        <Tab icon={<MessageSquare size={20} />} label="Mensajes" iconPosition="start" />
                    </Tabs>

                    <Box sx={{ p: 4 }}>
                        {tabValue === 0 ? (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vista Previa</TableCell>
                                            <TableCell>Autor</TableCell>
                                            <TableCell>Fecha</TableCell>
                                            <TableCell align="right">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {photos.map((photo) => (
                                            <TableRow key={photo.id} hover sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => openPreview('photo', photo)}>
                                                <TableCell>
                                                    <Avatar variant="rounded" src={photo.url} sx={{ width: 60, height: 60 }} />
                                                </TableCell>
                                                <TableCell>{photo.author}</TableCell>
                                                <TableCell>{new Date(photo.created_at).toLocaleString()}</TableCell>
                                                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                        <Tooltip title="Descargar">
                                                            <IconButton color="primary" onClick={() => handleDownload(photo.url, `boda_${photo.author}_${photo.id}.jpg`)}>
                                                                <Download size={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                            <IconButton color="error" onClick={() => handleDeleteClick(photo.id)}>
                                                                <Trash2 size={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Mensaje</TableCell>
                                            <TableCell>Autor</TableCell>
                                            <TableCell>Fecha</TableCell>
                                            <TableCell align="right">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages.map((m) => (
                                            <TableRow key={m.id} hover sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => openPreview('message', m)}>
                                                <TableCell sx={{
                                                    maxWidth: 300,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {m.content}
                                                </TableCell>
                                                <TableCell>{m.author}</TableCell>
                                                <TableCell>{new Date(m.created_at).toLocaleString()}</TableCell>
                                                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                        <Tooltip title="Ver más">
                                                            <IconButton onClick={() => openPreview('message', m)}>
                                                                <Eye size={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                            <IconButton color="error" onClick={() => handleDeleteClick(m.id)}>
                                                                <Trash2 size={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Paper>
            </Container>

            {/* Modal de Confirmación de Borrado */}
            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Confirmar eliminación?</DialogTitle>
                <DialogContent>
                    Esta acción no se puede deshacer. Se borrará permanentemente.
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setDeleteId(null)} disabled={isDeleting}>Cancelar</Button>
                    <Button
                        onClick={confirmDelete}
                        variant="contained"
                        color="error"
                        disabled={isDeleting}
                        startIcon={isDeleting && <CircularProgress size={16} color="inherit" />}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Vista Previa (Fotos y Mensajes) */}
            <Dialog
                open={!!previewItem}
                onClose={() => setPreviewItem(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '24px', overflow: 'hidden' }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {previewItem?.type === 'photo' ? 'Vista de Foto' : 'Mensaje de Invitado'}
                    </Typography>
                    <IconButton onClick={() => setPreviewItem(null)}>
                        <X size={24} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
                    {previewItem?.type === 'photo' ? (
                        <Box>
                            <img
                                src={previewItem.data.url}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            />
                            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                                Enviado por: {previewItem.data.author}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 2 }}>
                            <Paper variant="outlined" sx={{ p: 4, borderRadius: '16px', bgcolor: '#fbfbfb', mb: 2 }}>
                                <Typography variant="h5" sx={{ fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.6 }}>
                                    "{previewItem?.data?.content}"
                                </Typography>
                            </Paper>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                — {previewItem?.data?.author}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, bgcolor: '#f9f9f9' }}>
                    {previewItem?.type === 'photo' && (
                        <Button
                            startIcon={<Download size={18} />}
                            variant="outlined"
                            onClick={() => handleDownload(previewItem.data.url, `boda_${previewItem.data.author}.jpg`)}
                        >
                            Descargar
                        </Button>
                    )}
                    <Button onClick={() => setPreviewItem(null)} variant="contained" sx={{ px: 4 }}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
