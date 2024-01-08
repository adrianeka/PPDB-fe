import { TextInput, PasswordInput } from '../components/TextField';
import { BlueButton } from '../components/button';
import { Logo } from '../components/logo';
import { LinkPage } from '../components/Link'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/style.css';

const LoginPage = () => {
    return (
        <div className='center-box'>
            <Logo />
            <Box className='box-title font-white bg-pink' >
                <Typography  >
                    Login
                </Typography>
            </Box >
            <Box className="box-form center-box">
                <TextInput label="Username" id="username" customStyle={{ margin: 1, width: '70%' }} />
                <PasswordInput label="Kata Sandi" id="password" customStyle={{ margin: 1, width: '70%' }} />
                <BlueButton text="Login" customStyle={{width: '70%'}} />
                <Box className="footer-link">
                    <Typography sx={{ fontSize: '16px' }} >
                        Belum punya akun?
                        
                    </Typography>
                    <LinkPage text='Daftar Disini' address="#" />
                </Box>
                <Box className="footer-link">
                <LinkPage text='About' address="#"  />
                <LinkPage text='Contact' address="#" />
                </Box>


            </Box>

        </div>
    )
}


export default LoginPage;