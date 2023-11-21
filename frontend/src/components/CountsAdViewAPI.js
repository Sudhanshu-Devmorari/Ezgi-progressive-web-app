import axios from "axios";
import config from "../config";
import AxiosInstance from "./AxiosInstance";

export const countsAdsAPI = async (data, adsId) => {
  if (adsId) {
    try {
      const res = await AxiosInstance.patch(
        `${config.apiUrl}/ads-management/${adsId}/`,
        {
          count: "count",
          data: data,
        }
      );
      return res.data;
    } catch (error) {
      // console.error("Error updating counts:", error);
      throw error;
    }
  }
};
