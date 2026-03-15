import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import weddingPhoto from '../assets/photos/Karen&Leo-4831.jpg';
import weddingPhoto2 from '../assets/photos/Karen&Leo-4760.jpg';
import weddingPhoto3 from '../assets/photos/Karen&Leo-4840.jpg';

const PhotoCarousel = () => {
    const images = [
        weddingPhoto,
        weddingPhoto2,
        weddingPhoto3,
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
            mx: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <Slider {...settings}>
                {images.map((img, index) => (
                    <Box key={index} sx={{ height: { xs: '300px', md: '900px' }, position: 'relative' }}>
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
