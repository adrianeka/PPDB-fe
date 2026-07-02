import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Alert } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../http-common';
import Button from '../common/Button';
import InputField from '../common/InputField';

/**
 * Modernized Login screen styled using design system theme.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Username dan Password wajib diisi');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    apiClient
      .post('/auth/signin', { username, password })
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
          }}
        >
          {logo && (
            <Box sx={{ mb: 2, height: 60, display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="PPDB Logo" style={{ maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          )}

          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 800 }}
          >
            PPDB OCR
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Penerimaan Peserta Didik Baru
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <InputField
              label="Username"
              placeholder="Masukkan Username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Masukkan Password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Masuk ke Akun
            </Button>

            <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Belum punya akun?{' '}
                  <Link
                    to="/signup"
                    style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Daftar di sini
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
