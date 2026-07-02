import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SchoolIcon from '@mui/icons-material/School';

const drawerWidth = 260;

/**
 * Reusable layout wrapping the Dashboard and Pendaftaran pages.
 * Implements the left sidebar, top header bar, and footer from the design.
 */
const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Pendaftaran', icon: <AssignmentIcon />, path: '/pendaftaran' },
  ];

  // Dynamic breadcrumb text
  const currentPathText = location.pathname === '/dashboard' ? 'Dashboard' : 'Pendaftaran';

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Brand Logo BIMA */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 3, mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#0078d4',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SchoolIcon sx={{ color: '#ffffff', fontSize: 20 }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '28px',
            color: '#0078d4',
            letterSpacing: '1px',
            lineHeight: '100%',
            fontFamily: '"SF Compact Rounded", sans-serif',
          }}
        >
          BIMA
        </Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 1,
                  bgcolor: isActive ? '#0078d4' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  py: 1.2,
                  px: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: isActive ? '#0062cc' : 'rgba(0, 120, 212, 0.05)',
                    color: isActive ? '#ffffff' : '#0078d4',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 36,
                    '& svg': { fontSize: 22 },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                    lineHeight: '20px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#ffffff',
          color: '#0f172a',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: '#f1f5f9',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: '#64748b',
                fontFamily: '"SF Compact Rounded", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {currentPathText}
              <span style={{ fontSize: '14px', marginLeft: '4px' }}>&gt;</span>
            </Typography>
          </Box>

          {/* Right Header Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: '#64748b' }}>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton sx={{ color: '#64748b' }}>
              <SettingsOutlinedIcon />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: '#0078d4',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                width: 36,
                height: 36,
              }}
            >
              AF
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile Navigation Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: '#f1f5f9',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Navigation Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: '#f1f5f9',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Content Area and Footer */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 3, md: 4 },
            pt: { xs: '5.5rem', sm: '6rem', md: '6.5rem' }, // Spacing below top navigation header
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2.5,
            textAlign: 'center',
            bgcolor: '#ffffff',
            borderTop: '1px solid',
            borderColor: '#f1f5f9',
            mt: 'auto',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#94a3b8',
              fontSize: '12px',
              fontFamily: '"SF Compact Rounded", sans-serif',
            }}
          >
            © 2026 Made with{' '}
            <span role="img" aria-label="heart">
              🤍
            </span>{' '}
            by{' '}
            <a
              href="https://tujuhsembilan.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0078d4', textDecoration: 'none', fontWeight: 600 }}
            >
              Tujuh Sembilan.
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
