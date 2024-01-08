import * as React from 'react';
import Typography from '@mui/material/Typography';
import '../styles/style.css';
import { Padding } from '@mui/icons-material';

export function Logo() {
    return (
        <div className='center-box logo'>
            <Typography sx={{fontSize:'25px', fontWeight: 700, lineHeight:' 28px'}}>
                Buku Resep 79
            </Typography>
            <img
                src='/img/logo.png' style={{ width: '50px' }}
            />
        </div>
    );
}
