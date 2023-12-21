import { AppBar, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/logo.png';
import '../style/custom.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    // Show/hide password di form
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Mengambil data dari text field
    const [username, setUserame] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {username, password}
        console.log(user)
        axios.post('http://localhost:8080/api/auth/signin',
                    {username, password})
                    .then((res) => {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("idUser", res.data.id);
                        console.log(res.data);
                        navigate("/daftar-resep");
                    })                
                    .catch((err) => console.log(err))                    
    }

    return (
        <div>
            <Container maxWidth="sm">
            <Grid container spacing={2} direction="column" justifyContent="center" style={{minHeight: "100vh"}}>
                <Grid item marginBottom={6}>
                <h2>Buku Resep 79</h2>
                <img src={logo} alt="logo" className='logo'/>
                </Grid>
                <Grid item>
                <AppBar position="static" style={{ background: '#f49881' }}>
                    <Typography variant="h6" color="inherit" component="div" marginTop={1} marginBottom={1}>
                        Login
                    </Typography>
                </AppBar>
                <Paper elevation={4} sx={{paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5}}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <TextField type="username" label="Username" variant="outlined" placeholder='Masukkan Username Anda' fullWidth size="small" value={username} onChange={(e) => setUserame(e.target.value)}/>
                        </Grid>
                        <Grid item>
                        <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" fullWidth size="small" value={password} onChange={(e) => setPassword (e.target.value)}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" fullWidth style={{ background: '#f49881' }} onClick={handleSubmit}>Login</Button>
                        </Grid>
                        <Grid item>
                            <p>Belum punya akun? <Link to={'signup'}>Daftar disini</Link></p>
                        </Grid>
                        <Grid container direction="row" spacing={3} paddingLeft={2} paddingTop={2}>
                            <Grid item xs={6}>
                                <Link to="#">
                                    About
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link to="#">
                                    Contact
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>
                
            </Grid>               
            </Container>
        </div>
    )
}

export default Login