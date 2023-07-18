import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import camera from "../../assets/camera-plus.svg";
import { BsArrowLeft } from "react-icons/bs";
import "./ProfileSU.css";

const ProfileSU = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [editProfile, setEditProfile] = useState(false);

  const EditButtonStyle = {
    border: editProfile
      ? currentTheme === "dark"
        ? "1px solid #4DD5FF"
        : "1px solid #007BF6"
      : currentTheme === "dark"
      ? "1px solid #E6E6E6"
      : "1px solid #0D2A53",
    color: editProfile
      ? currentTheme === "dark"
        ? "#4DD5FF"
        : "#007BF6"
      : currentTheme === "dark"
      ? "#E6E6E6"
      : "#0D2A53",
    backgroundColor: "transparent",
    borderRadius: "18px",
    padding: "0.1rem 2.2rem",
    fontSize: "13px",
  };
  const cameraImageStyles = {
    display: editProfile ? "block" : "none",
    position: "absolute",
    backgroundColor: "#",
    top: "4.4rem",
    left: "2.3rem",
  };

  return (
    <>
      <div
        className={`card border-0 rounded-0 my-2 p-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="d-flex justify-content-between pb-2">
          <BsArrowLeft
            onClick={() => {
              props.setSelectContent("home");
              props.setDashboardSUser(false);
            }}
            fontSize={"1.6rem"}
          />
        </div>
        <div className="row g-0">
          <div className="col pe-0 d-flex">
            <div className="position-relative">
              <img
                src={profile}
                width={100}
                height={100}
                alt=""
                style={{
                  opacity: editProfile
                    ? currentTheme === "dark"
                      ? "0.4"
                      : "0.7"
                    : "",
                }}
              />
            </div>
            <div className="">
              <label htmlFor="camera-icon">
                <img
                  src={camera}
                  alt=""
                  style={cameraImageStyles}
                  height={40}
                  width={40}
                />
              </label>
              <input type="file" name="" id="camera-icon" className="d-none" />
            </div>
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
                onClick={() => setEditProfile(!editProfile)}
                className="edit-profile-btn"
                style={EditButtonStyle}
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
