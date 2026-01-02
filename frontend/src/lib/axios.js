import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default apiClient;
