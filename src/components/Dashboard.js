import React from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

/**
 * Dashboard landing screen showing PPDB application statistics.
 */
const Dashboard = () => {
  const stats = [
    {
      title: 'Total Pendaftar',
      count: 124,
      icon: <GroupIcon fontSize="large" sx={{ color: 'primary.main' }} />,
      color: 'primary',
    },
    {
      title: 'Berkas Terverifikasi',
      count: 86,
      icon: <CheckCircleIcon fontSize="large" sx={{ color: 'success.main' }} />,
      color: 'success',
    },
    {
      title: 'Berkas Ditolak',
      count: 12,
      icon: <CancelIcon fontSize="large" sx={{ color: 'error.main' }} />,
      color: 'error',
    },
    {
      title: 'Menunggu Verifikasi',
      count: 26,
      icon: <PendingIcon fontSize="large" sx={{ color: 'warning.main' }} />,
      color: 'warning',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pantau status dokumen calon peserta didik baru dan verifikasi berkas secara otomatis
          dengan engine OCR.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                    {stat.count}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: (theme) => `${theme.palette[stat.color].main}12`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
