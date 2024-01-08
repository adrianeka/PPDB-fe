import React from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';

export const TextInput = ({
    label,
    fieldName,
    field,
    errors
}) => {
    const FieldWrapper = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "0.25rem",
        backgroundColor: "white",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    }

    const errorColor = {
        color: "#ff0000"
    }

    const inputStyle = {
        borderColor: errors[fieldName] ? "#ff0000" : "#b4b4bb",
    }

    const inputWrapper = {
        backgroundColor: "white",
    }

    return (
        <div style={FieldWrapper}>
            <Typography sx={{ color: errors[fieldName] ? "#ff0000" : "#7f7f7f", fontSize: "0.875rem", lineHeight: "1.25rem", }}>
                {label}{" "}
                <span style={errorColor}>*</span>
            </Typography>
            <OutlinedInput
                {...field(fieldName)}
                style={inputStyle}
                className='field-input-text'
                placeholder={label}
            />
            {errors[fieldName] && (
                <FormHelperText sx={errorColor}>{errors[fieldName].message}</FormHelperText>
            )}

        </div>
    )
}

export const PasswordInput = ({
    label,
    fieldName,
    field,
    errors
}) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const FieldWrapper = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "0.25rem",
        backgroundColor: "white",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    }

    const errorColor = {
        color: "#ff0000"
    }

    const inputStyle = {
        borderColor: errors[fieldName] ? "#ff0000" : "#b4b4bb",
    }

    const inputWrapper = {
        backgroundColor: "white",
    }

    return (
        <div style={FieldWrapper}>
            <Typography sx={{ color: errors[fieldName] ? "#ff0000" : "#7f7f7f", fontSize: "0.875rem", lineHeight: "1.25rem", }}>
                {label}{" "}
                <span style={errorColor}>*</span>
            </Typography>
            <OutlinedInput
                {...field(fieldName)}
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
                style={inputStyle}
                className='field-input-text'
            />
            {errors[fieldName] && (
                <FormHelperText sx={errorColor}>{errors[fieldName].message}</FormHelperText>
            )}

        </div>
    )
}