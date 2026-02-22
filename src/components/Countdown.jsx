import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import TimeUnit from './TimeUnit';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        setIsFinished(true);
        return true; // isFinished
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        return false;
      }
    };

    const initialFinished = calculateTime();
    if (initialFinished) return;

    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Box sx={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <MotionDiv
            key="timer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 3 }}
              sx={{
                mt: 4,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <TimeUnit value={timeLeft.days} label="Días" />
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </Stack>
          </MotionDiv>
        ) : (
          <MotionDiv
            key="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #c5a059 30%, #f1d592 50%, #c5a059 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shine 3s linear infinite',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mt: 4,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                '@keyframes shine': {
                  '0%': { backgroundPosition: '0% center' },
                  '100%': { backgroundPosition: '200% center' }
                }
              }}
            >
              ¡Hoy es el gran día! ❤️
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                mt: 1
              }}
            >
              Llegó el momento de celebrar nuestro amor.
            </Typography>
          </MotionDiv>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Countdown;

