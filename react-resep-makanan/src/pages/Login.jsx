import React from 'react';
import Box from '@mui/material/Box';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate,  useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthWrapper from "../components/AuthWrapper";
import { BlueButton } from "../components/Button"
import { Logo } from '../components/Logo';
import {
  TextInput,
  PasswordInput
} from "../components/TextField";
import {
  wrapper,
  formContentWrapper
} from '../styles/style.jsx';
import axios from "axios";

const cssReset = `
  * {
    margin: 0;
    padding: 0;
  }
  body,
  html,
  :root {
    height: 100%;
    background-color: #f0f9f9;
  }
`;

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong."
    })
    .max(100, {
      message: "Format username belum sesuai."
    })
    .refine((value) => !/\s/.test(value), {
      message: "Format username belum sesuai."
    }),
  password: z
    .string()
    .min(1, {
      message: "Kolom Kata Sandi tidak boleh kosong."
    })
    .min(6, {
      message: "Kata sandi tidak boleh kurang dari 6 karakter."
    })
    .max(50, {
      message: "Kata sandi tidak sesuai."
    })
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value), {
      message: "Kata sandi harus memiliki minimal 6 karakter kombinasi angka/huruf."
    }),
});

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const client = axios.create({
    baseURL: "http://localhost:8080/user-management/users/signin"
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    addPosts(data.username, data.password);
  };

  const addPosts = async (username, password) => {
    let response = await client.post('', {
      username: username,
      password: password
    });
    notify(response.data.statusCode);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleLoginResponse(response.data.statusCode)
  };

  const notify = (status) => {
    if (status === 200) {
      toast.success('Login berhasil!')
    } else if (status === 401) {
      toast.error('Username atau Kata sandi yang anda masukkan salah')
    } else {
      toast.error('Terjadi kesalahan server. Silakan coba kembali.')
    }
  }

  const handleLoginResponse =(status) =>{
    if (status === 200) {
      navigate('/daftar-resep');
    } else if (status === 401) {
      reset();
    } else {
      reset();
    }
  }


  return (
    <Box sx={wrapper} >
      <style>{cssReset}</style>
      <div><Toaster /></div>
      <Logo />
      <AuthWrapper
        title="Login"
        linkText=" Daftar Disini"
        url="/user-management/users/signup"
        footerText="Belum punya Akun? "
        showAboutAndContact={true}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={formContentWrapper}>
          <TextInput
            label="Username"
            fieldName="username"
            field={register}
            errors={errors}
          />
          <PasswordInput
            label="Kata Sandi"
            fieldName="password"
            field={register}
            errors={errors}
          />
          <BlueButton text="Login" customStyle={{ width: '100%' }} type='submit' />
        </form>
      </AuthWrapper>

    </Box>
  );
};

export default Login;