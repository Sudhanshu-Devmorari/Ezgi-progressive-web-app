import React, { useContext, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import config from "../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import resize from "../../assets/resize-16957191194402187617e45f878782891a9fbe48c5fbaa7a2d.jpg";
import AxiosInstance from "../AxiosInstance";

export const AdvertisementBanner = ({ data, setAdsId }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const server_url = `${config?.apiUrl}`;

  // Redirected & click count
  const handleLinkClick = (ads_id) => {
    try {
      AxiosInstance
        .patch(`${config.apiUrl}/ads-management/${ads_id}/`, {
          count: "count",
          data: "redirected_to_ad",
        })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div
        className={`my-2 d-flex align-items-center justify-content-center ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
        // style={{ minHeight: "153px" }}
      >
        <Link
          target="_blank"
          to={data?.link ? data?.link : ""}
          onClick={() => {
            handleLinkClick(data?.id);
          }}
          style={{ width: "100%", height: "180px" }}
        >
          <img
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", height: "100%" }}
            src={`${server_url + data?.picture}`}
            // src={resize}
            alt="Motiwy"
          />
        </Link>
      </div>
    </>
  );
};
