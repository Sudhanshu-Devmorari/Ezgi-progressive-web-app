import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import starIcon from "../../assets/star-1.svg";
import starDark from "../../assets/star.svg";
import { BsArrowLeft } from "react-icons/bs";
import "./ProfileSU.css"

const ProfileSU = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`card border-0 rounded-0 my-2 p-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="d-flex justify-content-between pb-2">
          <BsArrowLeft
            // onClick={() => props.setSelectContent("home")}
            fontSize={"1.6rem"}
          />
        </div>
        <div className="row g-0">
          <div className="col pe-0 d-flex position-relative">
            <img src={profile} width={100} height={100} alt="" />
            <div className="d-flex flex-column ps-1">
              <div className="blueTick-responsive align-items-center mt-4 responsive-username">
                melih1905
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                Ankara/Turkiye
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                22.05.2022
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end gap-2 me-3">
              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>256</span>
                <span
                  style={{
                    fontSize: "12px",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  Abonelik
                </span>
              </div>

              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>256</span>
                <span
                  style={{
                    fontSize: "12px",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  Takip
                </span>
              </div>

            </div>
            <div className="mt-2 d-flex justify-content-end">
              <button
              className="edit-profile-btn"
                style={{
                  border:
                    currentTheme === "dark"
                      ? "1px solid #E6E6E6" 
                      : "1px solid #0D2A53",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  backgroundColor: "transparent",
                  borderRadius: "18px",
                  padding: "0.2rem 2.4rem",
                  fontSize: "13px",
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSU;
