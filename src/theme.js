import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern vibrant royal blue
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Emerald green for success actions/accents
      light: '#34d399',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Premium light slate grey background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Deep slate for primary text
      secondary: '#475569', // Muted grey for descriptions
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#0f172a',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#0f172a',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#0f172a',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#0f172a',
    },
    button: {
      textTransform: 'none', // Remove uppercase style for a more modern look
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Smooth, modern rounded corners
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)', // Medium shadow
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)', // Premium soft shadow
    ...Array(20).fill('none'), // Fill other shadow levels to avoid index errors
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.02)',
          border: '1px solid #e2e8f0',
          padding: '24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
            },
          },
        },
      },
    },
  },
});

export default theme;
