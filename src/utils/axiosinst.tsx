import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = "https://upskilling-egypt.com:3005/api";
const staticURL = "https://upskilling-egypt.com:3005";

//Without Token mostly for Auth
const apiPuplic = axios.create({
  baseURL,
});

//With Token mostly for Lists 3lshan el m7taga token
const apiToken = axios.create({
  baseURL,
});
const cookies = new Cookies();
apiToken.interceptors.request.use((config) => {
  config.headers.Authorization = cookies.get("accessToken");
  return config;
});

export { apiPuplic, apiToken, baseURL, staticURL };
