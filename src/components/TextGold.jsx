import React from 'react'

import { Typography } from '@mui/material'

const TextGold = ({ value, fontSize }) => {

    const size = fontSize || { xs: '2rem', sm: '3rem' };

    return (
        <Typography
            className="gold-gradient-text"
            variant="h3"
            fontWeight="700"
            sx={{ fontSize: size, }}
        >
            {value}
        </Typography>
    )
}

export default TextGold