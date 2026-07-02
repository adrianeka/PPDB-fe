import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../http-common';
import studentsBanner from '../../assets/students_banner.png';

/**
 * Split-screen BIMA login page styled precisely according to design.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Email dan Password wajib diisi');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // Call authentication backend (email mapping to username for authentication api)
    apiClient
      .post('/auth/signin', { username: email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('idUser', res.data.id);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message || 'Login gagal, silakan periksa kembali akun Anda.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side: Form */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 4, sm: 6, md: 8, lg: 10 },
          bgcolor: '#ffffff',
        }}
      >
        {/* Spacer to push content center */}
        <Box />

        {/* Form Container */}
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          {/* Logo BIMA */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#0078d4',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SchoolIcon sx={{ color: '#ffffff', fontSize: 22 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: '28px',
                color: '#0078d4',
                letterSpacing: '1px',
                fontStyle: 'Bold',
                fontFamily: '"SF Compact Rounded", sans-serif',
              }}
            >
              BIMA
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            sx={{
              fontFamily: '"SF Compact Rounded", sans-serif',
              fontWeight: 600,
              fontSize: '30px',
              lineHeight: '40px',
              letterSpacing: 0,
              color: '#0f172a',
              mb: 1,
            }}
          >
            Selamat Datang
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#5C5E66',
              mb: 4,
            }}
          >
            Silakan masuk ke portal siswa untuk melanjutkan pendaftaran.
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 0.7 }}>
              {errorMsg}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0.7,
                  bgcolor: '#ffffff',
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 100px #ffffff inset',
                    WebkitTextFillColor: '#000',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: '#5D6283', mr: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0.7,
                  bgcolor: '#FFFFFF',
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 100px #ffffff inset',
                    WebkitTextFillColor: '#000',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#5D6283', mr: 0.5 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{
                      color: '#cbd5e1',
                      '&.Mui-checked': {
                        color: '#0078d4',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Ingat saya di perangkat ini
                  </Typography>
                }
              />
              <Link
                to="#"
                style={{
                  color: '#0078d4',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  textDecoration: 'none',
                }}
              >
                Lupa Password
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#0078d4',
                color: '#ffffff',
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: 0.7,
                boxShadow: 'none',
                textTransform: 'none',
                mb: 3,
                '&:hover': {
                  bgcolor: '#0062cc',
                  boxShadow: '0 4px 12px rgba(0, 120, 212, 0.2)',
                },
              }}
            >
              Masuk Sekarang
            </Button>

            {/* SignUp Link */}
            <Typography
              variant="body2"
              align="center"
              sx={{ color: '#64748b', fontSize: '0.9rem' }}
            >
              Belum memiliki akun?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#0078d4',
                  fontWeight: 400,
                  textDecoration: 'none',
                }}
              >
                Buat Akun Baru
              </Link>
            </Typography>
          </form>
        </Box>

        {/* Footer Technical Assistance */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            mt: 6,
          }}
        >
          <HelpOutlineIcon sx={{ color: '#94a3b8', fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Butuh bantuan teknis?{' '}
            <Link
              to="#"
              style={{
                color: '#64748b',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              Hubungi Admin
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Right Side: Image Banner */}
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          display: { xs: 'none', md: 'block' },
          p: 3,
          bgcolor: '#ffffffff',
        }}
      >
        <Box
          sx={{
            height: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={studentsBanner}
            alt="PPDB Banner Students"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          {/* Transparent-to-Blue Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background:
                'linear-gradient(to top, rgba(0, 120, 215, 0.95) 0%, rgba(0, 120, 215, 0.7) 50%, rgba(0, 120, 215, 0) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { md: 6, lg: 8 },
              color: '#ffffff',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontStyle: 'bold',
                fontSize: '48px',
                mb: 4,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontFamily: 'SF Compact Rounded',
                color: '#ffffff',
              }}
            >
              Wujudkan Masa Depan
              <br />
              Cerah Gemilang.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                fontWeight: 400,
                fontSize: '16px',
                maxWidth: 580,
                lineHeight: 1.6,
              }}
            >
              Platform resmi pendaftaran peserta didik baru. Proses transparan, cepat, dan
              terpercaya untuk langkah awal pendidikan Anda.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
