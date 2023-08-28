import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import camera from "../../assets/camera-plus.svg";
import { BsArrowLeft } from "react-icons/bs";
import "./ProfileSU.css";
import axios from "axios";
import { userId } from "../GetUser";
import Swal from "sweetalert2";

const ProfileSU = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [editProfile, setEditProfile] = useState(false);

  // PROFILE API
  const [progileData, setProgileData] = useState();
  useEffect(() => {
    async function getProfileData() {
      const res = await axios.get(`http://127.0.0.1:8000/profile/${userId}`);
      setProgileData(res.data);
    }
    getProfileData();
  }, []);

  // UPDATE PROFILE PIC
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  async function handleChangeProfilePic(e) {
    try {
      const file = e.target.files[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"]; 
        if (allowedTypes.includes(file.type)) {
          setPreveiwProfilePic(URL.createObjectURL(e.target.files[0]));
          setEditProfile(false);
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          const res = await axios.post(
            `http://127.0.0.1:8000/profile/${userId}`,
            formData
          );
          // console.log("res: ", res);
          // console.log("res: ", res.status);
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Profile Updated!",
              icon: "success",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          } else if (res.status === 400) {
            Swal.fire({
              title: "Error",
              text: "Failed",
              icon: "error",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid file type. Please select a valid image file.",
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
          e.target.value = "";
        }
      }
    } catch (error) {}
  }

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
                src={
                  preveiwProfilePic
                    ? preveiwProfilePic
                    : `http://127.0.0.1:8000${progileData?.profile_pic}`
                }
                width={100}
                height={100}
                alt=""
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  opacity: editProfile
                    ? currentTheme === "dark"
                      ? "0.4"
                      : "0.7"
                    : "",
                }}
              />
            </div>
            <div className="">
              {(preveiwProfilePic || editProfile) && (
                <label htmlFor="camera-icon">
                  <img
                    src={camera}
                    alt=""
                    style={{
                      display: editProfile ? "block" : "none",
                      position: "absolute",
                      backgroundColor: "#",
                      top: "4.4rem",
                      left: "2.3rem",
                    }}
                    height={40}
                    width={40}
                  />
                </label>
              )}
              <input
                type="file"
                name=""
                id="camera-icon"
                className="d-none"
                accept=".jpg, .jpeg, .png"
                onChange={handleChangeProfilePic}
              />
            </div>
            <div className="d-flex flex-column ps-1">
              <div className="blueTick-responsive align-items-center mt-4 responsive-username">
                {progileData?.username}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                {progileData && progileData?.city}
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
            <div className="d-flex justify-content-end gap-2 me-3 text-center">
              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>
                  {progileData?.Subscription_Count}
                </span>
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
                <span style={{ fontSize: "1.2rem" }}>
                  {progileData?.Follow_Up_Count}
                </span>
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
                style={{
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
