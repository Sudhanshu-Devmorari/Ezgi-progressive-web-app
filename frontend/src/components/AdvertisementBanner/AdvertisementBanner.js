import React, { useContext, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import config from "../../config";
import { Link } from "react-router-dom";
import axios from "axios";

export const AdvertisementBanner = ({ data, setAdsId }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const server_url = `${config?.apiUrl}`;

  useEffect(() => {
    console.log("data:::::::::::", data)
  
   
  }, [data])
  

  // Redirected & click count
  const handleLinkClick = (ads_id) => {
    try {
      axios
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
          to={data?.link}
          onClick={() => {
            handleLinkClick(data?.id);
          }}
        >
          <div style={{ width: "300px", height: "150px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`${server_url + data?.picture}`}
              alt=""
            />
          </div>
        </Link>
      </div>
    </>
  );
};
