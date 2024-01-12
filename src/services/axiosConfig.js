import axios from "axios";

const accessToken = localStorage.getItem("token");
console.log(accessToken);

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
