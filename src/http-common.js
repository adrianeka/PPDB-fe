import React from 'react';
import axios from 'axios';

const accessToken = localStorage.getItem("token");
console.log(accessToken);

export default axios.create({
    baseURL: "http://localhost:8080/api",
        headers: {
            Authorization : `Bearer ${accessToken}`
    }
});