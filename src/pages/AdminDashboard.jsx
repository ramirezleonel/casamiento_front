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
    CircularProgress
} from '@mui/material';
import { Trash2, Image as ImageIcon, MessageSquare, LogOut, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import { useMessages } from '../context/MessageContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { photos, deletePhoto, loading: loadingPhotos } = usePhotos();
    const { messages, deleteMessage, loading: loadingMessages } = useMessages();
    const [tabValue, setTabValue] = useState(0);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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
                                            <TableRow key={photo.id}>
                                                <TableCell>
                                                    <Avatar variant="rounded" src={photo.url} sx={{ width: 60, height: 60 }} />
                                                </TableCell>
                                                <TableCell>{photo.author}</TableCell>
                                                <TableCell>{new Date(photo.created_at).toLocaleString()}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton color="error" onClick={() => handleDeleteClick(photo.id)}>
                                                        <Trash2 size={20} />
                                                    </IconButton>
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
                                            <TableRow key={m.id}>
                                                <TableCell sx={{ maxWidth: 300 }}>{m.content}</TableCell>
                                                <TableCell>{m.author}</TableCell>
                                                <TableCell>{new Date(m.created_at).toLocaleString()}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton color="error" onClick={() => handleDeleteClick(m.id)}>
                                                        <Trash2 size={20} />
                                                    </IconButton>
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

            {/* Modal de Confirmación */}
            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Confirmar eliminación?</DialogTitle>
                <DialogContent>
                    Esta acción no se puede deshacer. Se borrará permanentemente de la base de datos y de AWS S3.
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
        </Box>
    );
};

export default AdminDashboard;
