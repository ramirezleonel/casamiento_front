import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { Heart } from 'lucide-react';
import TextGold from './TextGold';

const DonationQR = () => {
    // Mock donation link or crypto address or bank info
    const donationValue = "https://example.com/donate-to-the-couple";

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
                    Su presencia es nuestro mayor regalo, pero si desean contribuir a nuestra luna de miel, pueden hacerlo escaneando este QR.
                </Typography>

                <Box sx={{
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
                </Box>

                <TextGold value={"Leo"} fontSize={{ xs: '1rem', sm: '2rem' }} />

                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    Alias: leo.ramirez.mati.mp  <br /> Nombre: Leonel Matias Ramirez <br /> CVU: 0000003100020350649566
                </Typography>

                <Box sx={{
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
                </Box>

                <TextGold value={"Karen"} fontSize={{ xs: '1rem', sm: '2rem' }} />
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    Alias: leo.ramirez.mati.mp  <br /> Nombre: Leonel Matias Ramirez <br /> CVU: 0000003100020350649566
                </Typography>

                <Typography variant="caption" sx={{ color: 'var(--text-muted)', mt: 2 }}>
                    ¡Muchas gracias por ser parte de nuestra historia!
                </Typography>
            </Paper>
        </Box>
    );
};

export default DonationQR;
