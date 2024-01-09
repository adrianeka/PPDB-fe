import React from 'react'
import logo from '../assets/logo.png';
import './style/custom.css';
import {Link, useNavigate} from 'react-router-dom';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    const navigate = useNavigate();

    const navigateDaftarResep = () => {
        navigate("/daftar-resep");
    }

    const handleLogout = () => {
        navigate("/");
        localStorage.clear();
      };
    

    return (
        <div>
            <AppBar position="static" style={{ background: '#f49881', paddingLeft: '64px', paddingRight: '64px'}}>
                <Toolbar>
                    <img src={logo} alt="logo" className='nav'/>
                    <Typography variant="h6" component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '12px',
                            flexGrow: 1
                        }}
                    >
                        Buku Resep 79
                    </Typography>
                        <Stack direction="row" spacing={4} justifyContent="flex-end" alignItems="center">
                            <Link to={'/daftar-resep'}>
                                <Button sx={{fontWeight: 'bold', color: '#FFFFFF', textTransform: 'none'}}>Daftar Resep</Button>
                            </Link>
                            <Link to={'/resep-saya'}>
                                <Button sx={{fontWeight: 'bold', color: '#FFFFFF', textTransform: 'none'}}>Resep Saya</Button>
                            </Link>
                            <Link to={'/resep-favorit'}>
                                <Button sx={{fontWeight: 'bold', color: '#FFFFFF', textTransform: 'none'}}>Resep Favorit</Button>
                            </Link>
                        <div>
                            <IconButton                                
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle fontSize="large"/>
                            </IconButton >
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navigation