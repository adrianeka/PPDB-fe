import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthWrapper from "../components/AuthWrapper";
import { BlueButton } from "../components/Button"
import { Logo } from '../components/Logo';
import { TextInput, PasswordInput } from "../components/TextField";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';
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

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong."
    })
    .max(100)
    .refine((value) => !/\s/.test(value), {
      message: "Format username belum sesuai."
    }),
  fullname: z
    .string()
    .min(1, {
      message: "Kolom nama lengkap tidak boleh kosong."
    })
    .max(255).refine((value) => /^[a-zA-Z0-9\s]*$/.test(value), {
      message: "Format nama lengkap belum sesuai. (Tidak menggunakan special character dan maksimal 255 charackter)."
    }),
  password: z
    .string()
    .min(6, {
      message: "Kata sandi tidak boleh kurang dari 6 karakter."
    })
    .max(50),
  retypePassword: z
    .string()
    .min(1, {
      message: "Kolom Konfirmasi Kata Sandi tidak boleh kosong"
    }),
}).refine((data) => data.password === data.retypePassword, {
  message: "Konfirmasi kata sandi tidak sama dengan kata sandi.",
  path: ["retypePassword"]
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/user-management/users/sign-up", data);
      if (response.data.status === "OK") {
        toast.success('Berhasil daftar!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={wrapper} >
      <style>{cssReset}</style>
      <Logo />
      <AuthWrapper
        title="Daftar"
        linkText="Batal, Kembali ke Halaman Login"
        url="/user-management/users/signin"
      >
        <form onSubmit={handleSubmit(onSubmit)} style={formContentWrapper}>
          <TextInput
            label="Username"
            fieldName="username"
            field={register}
            errors={errors}
          />
          <TextInput
            label="Nama Lengkap"
            fieldName="fullname"
            field={register}
            errors={errors}
          />
          <PasswordInput
            label="Kata Sandi"
            fieldName="password"
            field={register}
            errors={errors}
          />
          <PasswordInput
            label="Konfirmasi Kata Sandi"
            fieldName="retypePassword"
            field={register}
            errors={errors}
          />
          <BlueButton text="Daftar" customStyle={{ width: '100%' }} type='submit' />
        </form>
      </AuthWrapper>
    </Box>
  );
};

export default Register;