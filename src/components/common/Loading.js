import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * A customized reusable Loading placeholder component.
 * Displays a clean spinner and optional status text, perfect for route fallbacks and fetch states.
 */
const Loading = ({ message = 'Memuat data...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        width: '100%',
        p: 3,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: 'primary.main',
          mb: 2,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
