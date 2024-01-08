import React from "react";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthWrapper from "../components/AuthWrapper";
import {BlueButton} from "../components/Button"
import { Logo } from '../components/Logo';
import { 
  TextInput, 
  PasswordInput
} from "../components/TextField";
import { 
  wrapper,
  formContentWrapper
} from '../styles/style.jsx';

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
    .max(50,{
        message: "Kata sandi tidak sesuai."
      }),
});

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
      });
    
      const onSubmit = (data) => {
        console.log(data);
      };
    
  return (
    <Box sx={wrapper} >
      <style>{cssReset}</style>
      <Logo />
      <AuthWrapper
        title="Login"
        linkText=" Daftar Disini"
        url="/register"
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
          <BlueButton text="Login" customStyle={{width: '100%'}} />
        </form>
      </AuthWrapper>
      
    </Box>
  );
};

export default LoginPage;