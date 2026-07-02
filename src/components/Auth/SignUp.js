import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Alert } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../http-common';
import Button from '../common/Button';
import InputField from '../common/InputField';

/**
 * Modernized SignUp (registration) screen.
 */
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Semua field wajib diisi');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    apiClient
      .post('/auth/signup', { username, password })
      .then(() => {
        setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke halaman login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message || 'Registrasi gagal, silakan coba lagi.');
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
            Daftar Akun
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Silakan lengkapi formulir di bawah ini untuk membuat akun baru.
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
            <InputField
              label="Username"
              placeholder="Masukkan Username Baru"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Masukkan Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <InputField
              label="Konfirmasi Password"
              type="password"
              placeholder="Ulangi Password Baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Daftar Sekarang
            </Button>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Sudah punya akun?{' '}
                <Link to="/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                  Masuk di sini
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
