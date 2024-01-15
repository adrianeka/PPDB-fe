import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useToken() {
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId());

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const saveUserId = (userId) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  };

  useEffect(() => {
    if (!token && location.pathname !== "/") {
      navigate("/");
    } else if (token && location.pathname === "/") {
      navigate("/daftar-resep");
    }
  }, [token, location, navigate]);

  return {
    setToken: saveToken,
    setUserId: saveUserId,
    token,
    userId,
  };
}
