import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { QRCodeSVG } from 'qrcode.react';
import { Heart } from 'lucide-react';
import TextGold from './TextGold';

const DonationQR = () => {
    // Mock donation link or crypto address or bank info
    // const donationValue = "https://example.com/donate-to-the-couple";

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            mb: 10,
            px: 2
        }}>
            <Paper className="glass-card" sx={{
                p: 2,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1500px',
                width: '100%'
            }}>
                <Heart color="var(--primary-gold)" size={48} style={{ marginBottom: '16px' }} />
                <Typography variant="h4" gutterBottom fontWeight="600">
                    Regalo de Bodas
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 3 }}>
                    Tu presencia es nuestro mayor regalo, pero si te interesa contribuir a nuestra luna de miel, podés hacerlo por transferencia.
                    Te dejamos los datos de nuestras cuentas a continuación:
                </Typography>

                {/* <Box sx={{
                    p: 2,
                    background: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    mb: 2
                }}>
                    <QRCodeSVG
                        value={donationValue}
                        size={200}
                        fgColor="var(--text-dark)"
                        includeMargin={true}
                    />
                </Box> */}

                <TextGold value={"Leo"} fontSize={{ xs: '1rem', sm: '2rem' }} />

                <Typography variant="caption" sx={{ color: 'var(--text-muted)', mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        Alias: leo.ramirez.mati.mp
                        <IconButton size="small" color="inherit" onClick={() => navigator.clipboard.writeText('leo.ramirez.mati.mp')} sx={{ ml: 0.5, p: 0.5 }}>
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </span>
                    <span>Nombre: Leonel Matias Ramirez</span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        CVU: 0000003100020350649566
                        <IconButton size="small" color="inherit" onClick={() => navigator.clipboard.writeText('0000003100020350649566')} sx={{ ml: 0.5, p: 0.5 }}>
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </span>
                </Typography>

                {/* <Box sx={{
                    p: 2,
                    background: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    mb: 2
                }}>
                    <QRCodeSVG
                        value={donationValue}
                        size={200}
                        fgColor="var(--text-dark)"
                        includeMargin={true}
                    />
                </Box> */}

                <TextGold value={"Karen"} fontSize={{ xs: '1rem', sm: '2rem' }} />
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        Alias: karen.ari.delpalacio
                        <IconButton size="small" color="inherit" onClick={() => navigator.clipboard.writeText('karen.ari.delpalacio')} sx={{ ml: 0.5, p: 0.5 }}>
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </span>
                    <span>Nombre: Karen Ariadna del Palacio</span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        CVU: 0000003100054143537903
                        <IconButton size="small" color="inherit" onClick={() => navigator.clipboard.writeText('0000003100054143537903')} sx={{ ml: 0.5, p: 0.5 }}>
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </span>
                </Typography>

                <Typography variant="caption" sx={{ color: 'var(--text-muted)', mb: 3 }}>
                    ¡Muchas gracias por ser parte de nuestra historia!
                </Typography>
            </Paper>
        </Box>
    );
};

export default DonationQR;
