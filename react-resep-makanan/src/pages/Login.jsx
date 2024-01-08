import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthWrapper from "../components/AuthWrapper";
import {BlueButton} from "../components/Button"
import { Logo } from '../components/Logo';
import { TextInput, PasswordInput } from "../components/TextField";

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
    
      const wrapper = {
        fontFamily: 'Mulish, sans-serif',
        margin: "0", // m-0
        display: "flex", // flex
        flexDirection: "column", // flex-col
        alignItems: "center", // items-center
        marginRight: "auto", // mx-auto
        marginLeft: "auto",
        marginBottom:"auto",
        marginTop:"auto",
        paddingRight: "1rem", // px-4
        paddingLeft: "1rem",
        gap: "0.5rem", // gap-2
        paddingTop: "2.5rem", // py-10
        paddingBottom: "2.5rem",
      };
    
      const titleWrapper = {
        display: "flex", // flex
        flexDirection: "column", // flex-col
        alignItems: "center", // items-center
        marginBottom: "1rem"
      };
    
      const titleStyle = {
        fontSize: "1.125rem", // text-lg
        lineHeight: "1.75rem",
        fontWeight: "700" // font-bold
      }
    
      const formContentWrapper = {
        backgroundColor: "white",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }
    
      const buttonStyle = {
        backgroundColor: "#01bfbf",
        color: "white",
        border: "transparent",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderRadius: "calc(0.5rem - 4px)",
        "&:hover": {
          backgroundColor: "#01acac",
        },
      }

  return (
    <div style={wrapper} >
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
    </div>
  );
};

export default LoginPage;