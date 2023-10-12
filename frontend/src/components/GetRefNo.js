import axios from "axios";
import config from "../config";

export const ref = () => {
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);

  const ref_no = queryParams.get("ref");
  return ref_no;
};

export const transcationQueryAPI = async (ref_no) => {
  try {
    const res = await axios.post(`${config.apiUrl}/transcation-query/`, {
      ref_no: ref_no,
    });
    const data = res?.data?.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
