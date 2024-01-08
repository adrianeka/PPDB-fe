import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterInput } from "../components/register-input";

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
  fullName: z
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
  confirmPassword: z
    .string()
    .min(1, {
      message: "Kolom Konfirmasi Kata Sandi tidak boleh kosong"
    }),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
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

  const formWrapper = {
    maxWidth: "32rem",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "calc(0.5rem - 2px)",
    width: "100%",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    paddingBottom: "0.5rem",
    backgroundColor: "white"
  }

  const formTitleWrapper = {
    backgroundColor: "#f49881",
    paddingTop: "0.5rem", // py-2
    paddingBottom: "0.5rem",
    fontSize: "1.125rem", // text-lg
    lineHeight: "1.75rem",
    color: "white",
    textAlign: "center"
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

  const linkStyle = {
    color: "#f49881", 
    fontSize: "0.875rem", 
    lineHeight: "1.25rem", 
    textDecoration: "none",
    textAlign: "center",
  }

  return (
    <div style={wrapper}>
      <style>{cssReset}</style>
      <div style={titleWrapper}>
        <div style={titleStyle}>Buku Resep 79</div>
        <img 
          src="/logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>
      <div style={formWrapper}>
        <div style={formTitleWrapper}>
          Daftar
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={formContentWrapper}>
          <RegisterInput 
            label="Username"
            registerName="username"
            type="text"
            register={register}
            errors={errors}
          />
          <RegisterInput 
            label="Nama Lengkap"
            registerName="fullName"
            type="text"
            register={register}
            errors={errors}
          />
          <RegisterInput 
            label="Kata Sandi"
            registerName="password"
            type="password"
            register={register}
            errors={errors}
          />
          <RegisterInput 
            label="Konfirmasi Kata Sandi"
            registerName="confirmPassword"
            type="password"
            register={register}
            errors={errors}
          />
          <button style={buttonStyle} type="submit">Daftar</button>
        </form>
        <div style={{ width: "100%", paddingBottom: "0.25rem", display: "inline-flex", justifyContent: "center"}}>
          <a href="/login" style={linkStyle}>
            Batal, Kembali ke Halaman Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;