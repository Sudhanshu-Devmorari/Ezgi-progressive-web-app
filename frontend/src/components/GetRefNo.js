import axios from "axios";
import config from "../config";
import AxiosInstance from "./AxiosInstance";

export const ref = () => {
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);

  const ref_no = queryParams.get("ref");
  return ref_no;
};

export const transcationQueryAPI = async (ref_no) => {
  try {
    const res = await AxiosInstance.post(`${config.apiUrl}/transcation-query/`, {
      ref_no: ref_no,
    });
    const data = res?.data?.data;
    // sessionStorage.setItem("reloadCount", String(1))
    return data;
  } catch (error) {
    console.log(error);
  }
};
