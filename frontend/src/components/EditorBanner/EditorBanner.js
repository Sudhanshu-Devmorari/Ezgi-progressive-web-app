import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./EditorBanner.css";
import football from "../../assets/Profile Card Football.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import { useNavigate } from "react-router-dom";
import { userId } from "../GetUser";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";
import bannerimg from "../../assets/ree.jpg";

export const EditorBanner = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const userId = localStorage.getItem("user-id");
  const [selectCategory, setSelectCategory] = useState("");
  // const [contentData, setContentData] = useState([]);
  useEffect(() => {
    try {
      if (selectCategory !== "") {
        axios
          .get(
            `${config.apiUrl}/football-basketball-content/?category=${selectCategory}&userId=${userId}`
          )
          .then((res) => {
            // console.log(res.data.data, "=>>>>5555sports btn");
            // console.log(res,"=>>>>sports btn");
            if (res.status === 200) {
              props?.setContentData(res?.data?.data);
              // props?.setCommentsReactionsSports()
            }
            if (res.status == 204) {
              localStorage.clear();
              // window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            if (
              error?.response?.status === 400 ||
              error?.response?.status === 500
            ) {
              Swal.fire({
                title: "Error",
                text: error?.response?.data?.error,
                icon: "error",
                backdrop: false,
                customClass:
                  currentTheme === "dark"
                    ? "dark-mode-alert"
                    : "light-mode-alert",
              });
            }
          });
      }
    } catch (error) {}
  }, [selectCategory]);

  const [editorBannerImg, setEditorBannerImg] = useState(null);
  useEffect(() => {
    async function getBannerImg() {
      try {
        const res = await axios.get(`${config.apiUrl}/editor-banner/`);
        setEditorBannerImg(res?.data?.data[0]?.editor_banner);
      } catch (error) {
        console.log(error);
      }
    }
    getBannerImg();
  }, []);

  const [categoryCounts, setCategoryCounts] = useState({
    futbol: 0,
    basketbol: 0,
  });
  useEffect(() => {
    async function getFutbolOrBasketbolCounts() {
      try {
        const res = await axios.get(`${config.apiUrl}/futbol-basketbol-count/`);
        setCategoryCounts({
          ...categoryCounts,
          futbol: res?.data?.futbol,
          basketbol: res?.data?.basketbol,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getFutbolOrBasketbolCounts();
  }, []);

  return (
    <>
      <div className={`row g-0 bannerText font-responsive ${"mb-2"}`}>
        <div className={`col-3`}>
          <div
            onClick={() => {
              props?.setCategory("Futbol");
            }}
            className={`${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            } gap-1 me-2 d-flex py-3 flex-column`}
          >
            <div
              className=" d-flex justify-content-center"
              style={{ color: props?.category == "Futbol" && "#D2DB08" }}
            >
              Futbol
            </div>
            <div className="d-flex justify-content-center">
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={football}
                alt=""
                height={50}
                width={50}
              />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#00C936" }}>
                  {categoryCounts.futbol}{" "}
                </span>
                Yorum
              </span>
            </div>
          </div>
        </div>
        <div className={`col-3`}>
          <div
            onClick={() => {
              props?.setCategory("Basketbol");
            }}
            className={`${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            } d-flex gap-1 me-2 py-3 flex-column`}
          >
            <div
              className="d-flex justify-content-center"
              style={{ color: props?.category == "Basketbol" && "#D2DB08" }}
            >
              Basketbol
            </div>
            <div className="d-flex justify-content-center">
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={basketball}
                alt=""
                height={50}
                width={50}
              />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#FF9100" }}>
                  {categoryCounts.basketbol}{" "}
                </span>
                Yorum
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            if (userId) {
              const currentPage = localStorage.getItem("currentpage");
              const currentuser = localStorage.getItem("user-role");
              localStorage.setItem("dashboardShow", false);
              (currentPage !== "show-all-comments" ||
                currentPage !== "notifications") &&
                localStorage.setItem("priviouspage", currentPage);
              localStorage.setItem("currentpage", "become-editor");
              localStorage.setItem(
                "subcurrentpage",
                currentuser == "standard" ? "subscribers" : "home"
              );
              localStorage.removeItem("activeCommentId");
              props?.setSelectContent("become-editor");
            }
          }}
          className={`col-6 d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ color: "#D2DB08", height: "125px" }}
        >
          {/* Become a Editor Banner */}
          {editorBannerImg ? (
            <img
              src={`${config.apiUrl}${editorBannerImg}`}
              alt="Become a Editor Banner"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          ) : (
            "Become a Editor Banner"
          )}
        </div>
      </div>
    </>
  );
};
