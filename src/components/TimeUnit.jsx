import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import TextGold from './TextGold';

const MotionDiv = motion.div;

const TimeUnit = ({ value, label }) => (
    <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Box sx={{
            textAlign: 'center',
            p: { xs: 1, sm: 2 },
            minWidth: { xs: '60px', sm: '100px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <TextGold
                className="gold-gradient-text"
                variant="h3"
                fontWeight="700"
                sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}
                value={String(value).padStart(2, '0')}
            />
            <Typography
                variant="caption"
                sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--text-muted)'
                }}
            >
                {label}
            </Typography>
        </Box>
    </MotionDiv>
);

export default TimeUnit;
