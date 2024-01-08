
import React, { useState } from 'react';
import { z, ZodError } from 'zod';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';

export function TextInput({ label, id, customStyle, schema }) {
    const helperTextId = `${id}-helper-text`;
    const labelRequired = `${label} *`;
    const helperText = `kolom ${label} tidak boleh kosong`;

    return (
        <FormControl variant="outlined" style={customStyle}>
            <Typography variant="body1" sx={{ color: '#787885', fontSize:'14px' }}>
                {labelRequired}
            </Typography>
            <OutlinedInput
                required
                id={id}
                aria-describedby={helperTextId}
                inputProps={{
                    'aria-label': { label },
                }}
                placeholder={label}
                className='field-input-text'
            />
            <FormHelperText id={helperTextId} sx={{ color: 'red' }}>{helperText}</FormHelperText>
        </FormControl>
    );
}

export function PasswordInput({ label, id, customStyle }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const helperTextId = `${id}-helper-text`;
    const labelRequired = `${label} *`;
    const helperText = `kolom ${label} tidak boleh kosong`;
    return (
        <FormControl variant="outlined" style={customStyle}>
            <Typography variant="body1" sx={{ color: '#787885' , fontSize:'14px'}}>
                {labelRequired}
            </Typography>
            <OutlinedInput
                required
                id={id}
                aria-describedby={helperTextId}
                inputProps={{
                    'aria-label': { label },
                }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                placeholder={label}
                sx={{ height: '5ch' }}
            />
            <FormHelperText id={helperTextId} sx={{ color: 'red' }}>{helperText}</FormHelperText>
        </FormControl>
    )
}

