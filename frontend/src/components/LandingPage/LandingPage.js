import React, { useContext, useState, useEffect } from "react";
import landingPage from "../../assets/landingPage.png";
import "./LandingPage.css";
import CurrentTheme from "../../context/CurrentTheme";

const LandingPage = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  
  return (
    <>
      <div
        className="px-4 container-fluid mt-4"
        style={{ fontFamily: "Poppins" }}
      >
        <div
          className="logo"
          style={{ fontSize: "1.5rem", fontFamily: "Poppins" }}
        >
          LOGO
        </div>
        <div className="row g-0">
          <div className="col-6 p-0">
            <div
              className="fw-bold my-3 d-flex flex-column bold-fonts"
              style={{ fontSize: "2.2rem" }}
            >
              <span style={{ color: "#0AC05E" }}>
                Editör <span style={{ color: "#313131" }}>ol,</span>
              </span>
              <span style={{ color: "#313131" }}>deneyimlerini paylaş,</span>
              <span style={{ color: "#0AC05E" }}>
                kazanmaya <span style={{ color: "#313131" }}>başla!</span>
              </span>
            </div>
            <div
              className=" fonts-p"
              style={{ color: "#313131", fontSize: "15px" }}
            >
              Motiwy, spor tutkunlarını bir araya getiren sosyal bir
              platformdur. Sen de deneyimlerini paylaşarak diğer spor
              tutkunlarına rehberlik ederken aynı zamanda gelir elde
              edebilirsin.
            </div>
            <div
              className="mt-3 fonts-p"
              style={{ color: "#313131", fontSize: "15px" }}
            >
              Detaylı bilgi ve editör üye profilini oluşturmak için mobil
              cihazından{" "}
              <a style={{ textDecoration: "none", color: "#0AC05E" }} href="">
                https://motiwy.com
              </a>{" "}
              adresini ziyaret edebilirsin.
            </div>
          </div>
          <div className="col p-0">
            <img
              src={landingPage}
              alt=""
              style={{ height: "90%", width: "80%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
