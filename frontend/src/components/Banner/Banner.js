import React, { useContext } from "react";
import bannerimg from "../../assets/bannerimg.png";
import "./Banner.css";
import CurrentTheme from "../../context/CurrentTheme";

const Banner = ({ data }) => {

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const server_url = "http://127.0.0.1:8000";
  return (
    <>
      <div className={`row g-0 mt-2 mb-1 bannerText`}>
        <div className="col-6">
          <img
            src={bannerimg}
            alt=""
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className={`col-6 mt-1 mb-2 d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <a href={`${data?.link}`} target="_blank">
            <div style={{ width: "300px", height: "150px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`${server_url + data?.picture}`}
                alt=""
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
