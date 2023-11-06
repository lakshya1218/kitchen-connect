import axios from "axios";

const instance = axios.create({
  baseURL: "https://kitchen-connect-pegc.onrender.com",
});

export default instance;
