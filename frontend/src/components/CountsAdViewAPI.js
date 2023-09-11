import axios from "axios";
import config from "../config";

export const countsAdsAPI = async (data, adsId) => {
  try {
    const res = await axios.patch(`${config.apiUrl}/ads-management/${adsId}/`, {
      count: 'count',
      data : data
    });
    return res.data; 
  } catch (error) {
    // console.error("Error updating counts:", error);
    throw error; 
  }
};
