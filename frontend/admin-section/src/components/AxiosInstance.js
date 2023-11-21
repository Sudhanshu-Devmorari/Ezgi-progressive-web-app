import axios from "axios";
import { Cookies } from "react-cookie";

// Functional component that uses the custom hook
const AxiosInstance = () => {
  const cookies = new Cookies();
  const token = cookies.get("access-token");

  const instance = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return instance;
};

export default AxiosInstance();
