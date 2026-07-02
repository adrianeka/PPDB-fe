import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

/**
 * A customized reusable Button component.
 * Supports loading states and inherits the premium styling defined in theme.js.
 */
const Button = ({ children, loading, disabled, ...props }) => {
  return (
    <MuiButton
      disabled={loading || disabled}
      {...props}
      sx={{
        position: 'relative',
        minHeight: '42px',
        ...props.sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          sx={{
            color: 'inherit',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
