import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthWrapper from "../components/AuthWrapper";
import { BlueButton } from "../components/Button";
import { Logo } from "../components/Logo";
import { TextInput, PasswordInput } from "../components/TextField";
import { cssReset, wrapper, formContentWrapper } from "../styles/style.jsx";
import axios from "axios";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong.",
    })
    .max(100, {
      message: "Format username belum sesuai.",
    })
    .refine((value) => !/\s/.test(value), {
      message: "Format username belum sesuai.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Kolom Kata Sandi tidak boleh kosong.",
    })
    .min(6, {
      message: "Kata sandi tidak boleh kurang dari 6 karakter.",
    })
    .max(50, {
      message: "Kata sandi tidak sesuai.",
    })
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value), {
      message:
        "Kata sandi harus memiliki minimal 6 karakter kombinasi angka/huruf.",
    }),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const apiLogin = import.meta.env.VITE_API_SIGNIN;

  const client = axios.create({
    baseURL: apiLogin,
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    addPosts(data.username, data.password);
  };

  const addPosts = async (username, password) => {
    try {
      let response = await client.post("", {
        username: username,
        password: password,
      });

      toast.success("Login berhasil!");

      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("token", response.data.data.token);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/daftar-resep");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Username atau Kata sandi yang anda masukkan salah");
      } else {
        toast.error("Terjadi kesalahan server. Silahkan coba kembali.");
      }
      reset();
    }
    
  };

  return (
    <Box sx={wrapper}>
      <style>{cssReset}</style>
      <div>
        <Toaster />
      </div>
      <Logo />
      <AuthWrapper
        title="Login"
        linkText=" Daftar Disini"
        url="/signup"
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
          <BlueButton
            text="Login"
            customStyle={{ width: "100%" }}
            type="submit"
          />
        </form>
      </AuthWrapper>
    </Box>
  );
};

export default Login;
