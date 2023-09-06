import React, { useContext } from "react";

import bannerimg from "../../assets/bannerimg.png";

import "./Banner.css";

import CurrentTheme from "../../context/CurrentTheme";

import config from "../../config";

const Banner = ({ data }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const server_url = `${config.apiUrl}`;

  return (
    <>
      <div className={`row g-0 mt-2 mb-2 bannerText `}>
        <div className="col-6" style={{ height: "135px" }}>
          <img
            src={bannerimg}
            alt="banner pic"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          className={`col-6 d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ height: "135px" }}
        >
          <a
            href={`${data?.link}`}
            target="_blank"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={`${server_url + data?.picture}`}
              alt="ads pic"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
