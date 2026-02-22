import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import weddingPhoto from '../assets/photos/foto_karen_leo.jpeg';

const PhotoCarousel = () => {
    const images = [
        weddingPhoto,
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: "linear"
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1000px',
            mx: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <Slider {...settings}>
                {images.map((img, index) => (
                    <Box key={index} sx={{ height: { xs: '300px', md: '500px' }, position: 'relative' }}>
                        <img
                            src={img}
                            alt={`Wedding moment ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default PhotoCarousel;
