import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import config from "../../config";

export const AdvertisementBanner = ({data}) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const server_url = `${config?.apiUrl}`;
  return (
    <>
      <div
        className={`my-2 d-flex align-items-center justify-content-center ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
        // style={{ minHeight: "153px" }}
      >
      <a href={`${data?.link}`} target="_blank">
      
      <div style={{width:"300px", height:"150px"}}>
        <img
          style={{width:"100%", height:"100%"}}
          src= {`${server_url + data?.picture}`}
          alt=""
        />
      </div>
      </a>
      </div>
    </>
  );
};
