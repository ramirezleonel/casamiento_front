import React from 'react'
import { Typography } from '@mui/material'

const TextGold = ({ value }) => {
    return (
        <Typography
            className="gold-gradient-text"
            variant="h3"
            fontWeight="700"
            sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}
        >
            {value}
        </Typography>
    )
}

export default TextGold