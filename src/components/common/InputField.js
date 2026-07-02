import React from 'react';
import { TextField } from '@mui/material';

/**
 * A customized reusable TextField component.
 * Standardizes styling, spacing, and error handling across forms.
 */
const InputField = ({ label, error, helperText, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      error={Boolean(error)}
      helperText={helperText}
      margin="normal"
      {...props}
      sx={{
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
        },
        ...props.sx,
      }}
    />
  );
};

export default InputField;
