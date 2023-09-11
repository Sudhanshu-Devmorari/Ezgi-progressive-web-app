import React, { useContext } from "react";

import bannerimg from "../../assets/bannerimg.png";
import "./Banner.css";
import CurrentTheme from "../../context/CurrentTheme";
import config from "../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { countsAdsAPI } from "../CountsAdViewAPI";
import { useEffect } from "react";

const Banner = ({ leftCornerAds, rightCornerAds }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const server_url = `${config.apiUrl}`;

  const [showBanner, setShowBanner] = useState(false);

  const banner1 =
    leftCornerAds[(Math.random() * (leftCornerAds?.length - 1) + 1).toFixed(0)];
  const banner2 =
    rightCornerAds[
      (Math.random() * (rightCornerAds?.length - 1) + 1).toFixed(0)
    ];

  useEffect(() => {
    async function addViewCount() {
      try {
        const res1 = await countsAdsAPI("ads_view", banner1?.id);
        console.log(res1);
        const res2 = await countsAdsAPI("ads_view", banner2?.id);
        console.log(res2);
      } catch (error) {
        // console.log(error)
      }
    }
    addViewCount();
  }, [banner1, banner2]);

  // Redirected & click count
  const handleLinkClick = (ads_id) => {
    try {
      axios
        .patch(`${config.apiUrl}/ads-management/${ads_id}/`, {
          count: "count",
          data: "redirected_to_ad",
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`row g-0 mt-2 mb-2 bannerText gap-2`}>
        <div
          className={`col d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ height: "135px" }}
        >
          <Link to={banner1?.link} onClick={() => handleLinkClick(banner2?.id)} target="_blank">
            <img
              src={`${
                banner1?.picture ? server_url + banner1?.picture : bannerimg
              }`}
              alt="Main Page Left Corner"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Link>
        </div>

        <div
          className={`col d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ height: "135px" }}
        >
          <Link to={banner2?.link} onClick={() => handleLinkClick(banner2?.id)} target="_blank">
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={`${banner2?.picture ? server_url + banner2?.picture : bannerimg}`}
              alt="Main Page Right Corner"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
