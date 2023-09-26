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

const Banner = ({ leftCornerAds, rightCornerAds, ads }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const server_url = `${config.apiUrl}`;

  const [showBanner, setShowBanner] = useState(false);
  const [adsLeftdata, setAdsLeftdata] = useState([]);
  const [adsRightdata, setAdsRightdata] = useState([]);

  // const banner1 =
  //   leftCornerAds[(Math.random() * (leftCornerAds?.length - 1) + 1).toFixed(0)];
  // const banner2 =
  //   rightCornerAds[
  //     (Math.random() * (rightCornerAds?.length - 1) + 1).toFixed(0)
  //   ];

  useEffect(() => {
    const adsLeftIdFilter = leftCornerAds.map((res) => res.id);
    const adsRightIdFilter = rightCornerAds.map((res) => res.id);

    function get_random(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    // setAdsId(get_random(adsIdFilter));
    const leftAdsdata =
      ads && ads.filter((res) => res.id == get_random(adsLeftIdFilter));
    const rightAdsdata =
      ads && ads.filter((res) => res.id == get_random(adsRightIdFilter));
    setAdsLeftdata(leftAdsdata);
    setAdsRightdata(rightAdsdata);
    async function addViewCount() {
      try {
        const res1 = await countsAdsAPI(
          "ads_view",
          get_random(adsLeftIdFilter)
        );
        const res2 = await countsAdsAPI(
          "ads_view",
          get_random(adsRightIdFilter)
        );
      } catch (error) {
        // console.log(error)
      }
    }
    adsLeftIdFilter && adsRightIdFilter && addViewCount();
  }, [leftCornerAds, rightCornerAds]);

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
        <Link
          className={`col ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ height: "135px" }}
          to={adsLeftdata[0]?.link}
          onClick={() => handleLinkClick(adsLeftdata[0]?.id)}
          target="_blank"
        >
          <img
            src={`${
              adsLeftdata[0]?.picture
                ? server_url + adsLeftdata[0]?.picture
                : bannerimg
            }`}
            alt="Main Page Left Corner"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Link>

        <Link
          className={`col ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ height: "135px" }}
          to={adsRightdata[0]?.link}
          onClick={() => handleLinkClick(adsRightdata[0]?.id)}
          target="_blank"
        >
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={`${
              adsRightdata[0]?.picture
                ? server_url + adsRightdata[0]?.picture
                : bannerimg
            }`}
            alt="Main Page Right Corner"
          />
        </Link>
      </div>
    </>
  );
};

export default Banner;
