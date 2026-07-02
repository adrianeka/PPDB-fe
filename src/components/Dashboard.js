import React from 'react';
import { Grid, Typography, Box, Card, LinearProgress, Divider } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from './common/Button';

/**
 * Modern student portal dashboard matching the design mockup exactly.
 * Standardized using relative units (rem) and responsive breakpoints for all typographies.
 */
const Dashboard = () => {
  // Define steps with progress state (Step 1 is marked 100%, Step 2 is 40% to show state differences)
  const checklistSteps = [
    {
      title: 'Data Pelajar',
      description: 'Unggah kartu pelajar dan lengkapi data pelajar.',
      progress: 100, // 100% progress representing completed state (turns green)
      active: false,
    },
    {
      title: 'Data Diri',
      description: 'Unggah KK dan lengkapi data diri.',
      progress: 40, // 40% progress representing active state (turns blue)
      active: true,
    },
    {
      title: 'Data Orang Tua / Wali',
      description: 'Unggah KTP orang tua dan lengkapi data orang tua.',
      active: false, // Locked step
    },
    {
      title: 'Data Nilai',
      description: 'Unggah nilai rapot dan lengkapi data nilai.',
      active: false,
    },
    {
      title: 'Pembayaran',
      description: 'Menunggu pembayaran dan unggah bukti.',
      active: false,
    },
  ];

  // Dynamic progress calculation based on steps
  const totalProgress = Math.round(
    checklistSteps.reduce((acc, step) => acc + (step.progress || 0), 0) / checklistSteps.length
  );

  const profileFields = [
    { label: 'Nama Lengkap', value: '-' },
    { label: 'Asal SMP', value: '-' },
    { label: 'NISN', value: '-' },
  ];

  return (
    <Grid container spacing={4}>
      {/* Left Area: Registration Cards */}
      <Grid item xs={12} md={7.5} lg={8}>
        <Card
          sx={{
            p: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
            borderRadius: '0.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            border: '1px solid #f1f5f9',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {/* Welcome Text */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '1.875rem', lg: '2.1rem' },
                color: '#0f172a',
                fontStyle: 'SemiBold',
                mb: '0.75rem',
                fontFamily: '"SF Compact Rounded", sans-serif',
              }}
            >
              Selamat Datang, Afdal Ramdan
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                mb: '2rem',
                fontSize: { xs: '0.875rem', md: '0.95rem', lg: '1rem' },
                fontWeight: 400,
                fontFamily: '"SF Compact Rounded", sans-serif',
              }}
            >
              Pendaftaran untuk SMA Harapan Bangsa sedang berlangsung.
            </Typography>

            {/* Registration Progress */}
            <Box sx={{ mb: '2.5rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '0.75rem' }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.825rem', lg: '0.875rem' },
                    lineHeight: '1.25rem',
                    color: '#404752',
                    letterSpacing: '0.05em',
                    fontFamily: '"SF Compact Rounded", sans-serif',
                  }}
                >
                  PROGRESS PENDAFTARAN
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontStyle: 'SemiBold',
                    fontSize: { xs: '0.875rem', md: '0.95rem', lg: '1rem' },
                    color: '#0078d4',
                    fontFamily: '"SF Compact Rounded", sans-serif',
                  }}
                >
                  {totalProgress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={totalProgress}
                sx={{
                  height: '0.5rem',
                  borderRadius: '0.25rem',
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#0078d4',
                    borderRadius: '0.25rem',
                  },
                }}
              />
            </Box>

            {/* Steps Checklist Stack */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', mb: '2.5rem' }}>
              {checklistSteps.map((step, idx) => {
                const isComplete = step.progress === 100;
                const isActive = step.active || (step.progress > 0 && step.progress < 100);

                // Styling configurations based on step status
                let borderColor = '#e2e8f0';
                let bgcolor = '#ffffff';
                let titleColor = '#cbd5e1';
                let descColor = '#cbd5e1';
                let iconBorderColor = '#cbd5e1';
                let iconBg = 'transparent';
                let iconElement = <CreateIcon sx={{ color: '#cbd5e1', fontSize: '1rem' }} />;

                if (isComplete) {
                  borderColor = '#10b981';
                  bgcolor = '#f0fdf4'; // Light green bg
                  titleColor = '#0f172a';
                  descColor = '#475569';
                  iconBorderColor = '#10b981';
                  iconBg = 'rgba(16, 185, 129, 0.1)';
                  iconElement = <CheckCircleIcon sx={{ color: '#10b981', fontSize: '1.15rem' }} />;
                } else if (isActive) {
                  borderColor = '#0078d4';
                  bgcolor = 'rgba(0, 120, 212, 0.02)'; // Light active blue bg
                  titleColor = '#0f172a';
                  descColor = '#64748b';
                  iconBorderColor = '#0078d4';
                  iconBg = 'rgba(0, 120, 212, 0.05)';
                  iconElement = <MoreHorizIcon sx={{ color: '#0078d4', fontSize: '1.15rem' }} />;
                }

                return (
                  <Box
                    key={idx}
                    sx={{
                      p: '1.25rem',
                      borderRadius: '0.35rem',
                      border: '1px solid',
                      borderColor: borderColor,
                      bgcolor: bgcolor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      minHeight: { xs: '5.25rem', md: '5.75rem' }, // Consistent/fixed box sizing
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <Box sx={{ flexGrow: 1, pr: '1rem' }}>
                      {/* Responsive Step Title */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: titleColor,
                          fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem', lg: '1.05rem' },
                          fontFamily: '"SF Compact Rounded", sans-serif',
                          mb: '0.25rem',
                          transition: 'color 0.25s',
                        }}
                      >
                        {step.title}
                      </Typography>
                      {/* Responsive Step Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: descColor,
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                          fontFamily: '"SF Compact Rounded", sans-serif',
                          transition: 'color 0.25s',
                        }}
                      >
                        {step.description}
                      </Typography>

                      {/* Step Progress Bar - Always Visible if defined */}
                      {step.progress !== undefined && (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: '1rem', mt: '0.75rem' }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={step.progress}
                            sx={{
                              height: '0.25rem',
                              flexGrow: 1,
                              borderRadius: '0.125rem',
                              bgcolor: isComplete ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: isComplete ? '#10b981' : '#0078d4',
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: isComplete ? '#10b981' : '#94a3b8',
                              fontWeight: 600,
                              fontFamily: '"SF Compact Rounded", sans-serif',
                            }}
                          >
                            {step.progress}%
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Status Indicator Icon Widget */}
                    <Box
                      sx={{
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '50%',
                        border: '1px solid',
                        borderColor: iconBorderColor,
                        bgcolor: iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    >
                      {iconElement}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#0078d4',
              color: '#ffffff',
              py: '1rem',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 600,
              borderRadius: '0.35rem',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#0062cc',
                boxShadow: '0 4px 12px rgba(0, 120, 212, 0.2)',
              },
            }}
          >
            Mulai Pendaftaran
          </Button>
        </Card>
      </Grid>

      {/* Right Area: Informational Cards */}
      <Grid item xs={12} md={4.5} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Deadline Information Card */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
            color: '#ffffff',
            borderRadius: '0.75rem',
            p: '1.5rem',
            border: 'none',
            boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.3)',
          }}
        >
          <Grid container spacing={2.5} alignItems="center">
            {/* Calendar Icon Widget */}
            <Grid item xs={4.5}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  py: '0.875rem',
                  px: '0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
                    fontFamily: '"SF Compact Rounded", sans-serif',
                  }}
                >
                  DESEMBER
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem' },
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    fontFamily: '"SF Compact Rounded", sans-serif',
                  }}
                >
                  24
                </Typography>
              </Box>
            </Grid>
            {/* Deadline Description */}
            <Grid item xs={7.5}>
              {/* Responsive Deadline Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem' },
                  mb: '0.5rem',
                  fontFamily: '"SF Compact Rounded", sans-serif',
                }}
              >
                Batas Akhir Pendaftaran
              </Typography>
              {/* Responsive Deadline Description */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontFamily: '"SF Compact Rounded", sans-serif',
                }}
              >
                Selesaikan unggah dokumen sebelum tanggal 24 Juni 2024 23:59 WIB untuk menghindari
                diskualifikasi otomatis.
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Candidate Profile Details Card */}
        <Card
          sx={{
            p: '2.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            border: '1px solid #f1f5f9',
          }}
        >
          {/* Card Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: '2rem' }}>
            <Box
              sx={{
                width: '2.75rem',
                height: '2.75rem',
                bgcolor: 'rgba(0, 120, 212, 0.08)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PersonIcon sx={{ color: '#0078d4', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem' },
                  color: '#0f172a',
                  fontFamily: '"SF Compact Rounded", sans-serif',
                }}
              >
                Profil Calon Siswa
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  fontFamily: '"SF Compact Rounded", sans-serif',
                }}
              >
                Data yang telah terverifikasi
              </Typography>
            </Box>
          </Box>

          {/* Profile Details List */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {profileFields.map((field, idx) => (
              <Box key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: '1.25rem',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      fontFamily: '"SF Compact Rounded", sans-serif',
                    }}
                  >
                    {field.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: '#0f172a',
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      fontFamily: '"SF Compact Rounded", sans-serif',
                    }}
                  >
                    {field.value}
                  </Typography>
                </Box>
                {idx < profileFields.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
