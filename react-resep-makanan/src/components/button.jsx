import * as React from 'react';
import Button from '@mui/material/Button';

export function BlueButton({ text, customStyle }) {
    return (
        <Button 
        style = {customStyle}
        sx={{customStyle,fontSize: '14px', backgroundColor: '#01BFBF', textTransform: 'none'}}
        variant="contained">{text}</Button>
    );
}
