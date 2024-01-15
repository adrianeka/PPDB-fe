import axios from "axios";

const accessToken = localStorage.getItem("token");
console.log(accessToken);

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
