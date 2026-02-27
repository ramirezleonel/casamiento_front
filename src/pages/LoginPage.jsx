import React, { useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulación de login (Hardcoded por ahora)
        // Puedes cambiar estos valores por los que prefieras
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'boda2026') {
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/admin-control-center');
            } else {
                setError('Credenciales incorrectas');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fdfaf5 0%, #f5eadd 100%)',
            py: 4
        }}>
            <Container maxWidth="xs">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Paper elevation={0} sx={{
                        p: 5,
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(197, 160, 89, 0.1)',
                        border: '1px solid rgba(197, 160, 89, 0.2)',
                        textAlign: 'center'
                    }}>
                        <Box sx={{
                            width: 60,
                            height: 60,
                            bgcolor: 'rgba(197, 160, 89, 0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            color: 'var(--primary-gold)'
                        }}>
                            <Lock size={30} />
                        </Box>

                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                            Panel de Control
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                            Por favor ingresa tus credenciales para continuar
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Usuario"
                                margin="normal"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <User size={20} color="#999" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '12px' }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                margin="normal"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock size={20} color="#999" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '12px' }
                                }}
                            />
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    mt: 4,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--primary-gold)',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    '&:hover': { backgroundColor: 'var(--secondary-gold)' }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                            </Button>
                        </form>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;
