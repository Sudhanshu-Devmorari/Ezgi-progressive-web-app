import React, { useContext } from "react";
import { useState, useEffect } from "react";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import starIcon from "../../assets/star-1.svg";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import "./SharedProfile.css";
import football from "../../assets/Profile Card Football.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import startDarkIcon from "../../assets/star.svg";
import axios from "axios";
import initialProfile from "../../assets/profile.png";
import config from "../../config";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { BsStar, BsStarFill } from "react-icons/bs";

import Selected_Favorite from "../../assets/Selected Favorite.svg";
import Dark_Unselected_Favorite from "../../assets/Dark - Unselected Favorite.svg";
import Light_Unselected_Favorite from "../../assets/Light - Unselected Favorite.svg";

const SharedProfile = (props) => {
  const {
    data,
    setSelectContent,
    setActiveCommentsshow,
    verifyid,
    mergedEditorResult,
    setMergedEditorResult,
    setHighlights,
    highlights,
    mergeArrays,
  } = props;
  const [highlightdata, setHighlightData] = useState([]);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Initialize with the API data

  const server_url = `${config.apiUrl}`;
  const [commentatorUser, setCommentatorUser] = useState([]);

  // console.log("=>>>data", data?.value?.user);

  const editorProfile = [
    { name: "adnankeser", rate: "%67.5" },
    { name: "adnankeser", rate: "%67.5" },
    { name: "adnankeser", rate: "%67.5" },
  ];

  function getfav(e) {
    // console.log(e,"=>>>e")
    axios
      .get(`${config.apiUrl}/fav-editor/${userId}/?commentator=${e}`)
      .then((res) => {
        // console.log(res, "========>>>>>res");
        if (res.status === 200) {
          const favIs = res?.data[0]?.is_fav_editor;
          setIsFavorite(favIs);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.error,
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
      });
  }

  useEffect(() => {
    console.log("data::::::::::::", data)
    // getfav(data?.value?.user?.id);
  }, []);
  useEffect(() => {
    setIsFavorite(data?.value?.is_fav_editor);
  }, []);

  const favEditor = async (id) => {
    const user_id = localStorage.getItem("user-id");
    try {
      const response = await axios.post(
        `${config.apiUrl}/fav-editor/${user_id}/`,
        {
          id: id,
        }
      );
      // console.log("API Response:", response.data);

      if (mergedEditorResult) {
        // console.log("mergedEditorResult:::::::::::::", mergedEditorResult);

        const filterArray = mergedEditorResult.filter(
          (res) => res?.value?.user?.id == response.data.user_id
        );
        // console.log("filterArray::::::::::::::", filterArray);

        mergedEditorResult.filter(
          (res) => res?.value?.user?.id == response.data.user_id
        )[0].value.is_fav_editor = response.data.is_fav_editor;
        setMergedEditorResult(mergedEditorResult);
      }

      // if (highlights) {
      //   // console.log("mergedResult::::::::::::::", highlights);
      //   const filterArray = highlights.filter(
      //     (res) => res?.user?.id == response.data.user_id
      //   );

      //   highlights.filter(
      //     (res) => res?.user?.id == response.data.user_id
      //   )[0].is_fav_editor = response.data.is_fav_editor;

      //   console.log("highlights::::::::::::::", highlights);

      //   setHighlights(highlights);
      //   mergeArrays();

      // }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error making POST request:", error);
      if (error.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  return (
    <>
      {/* {props.data?.value?.highlights?.map((res, index) => ( */}
      <div
        className={`card p-1 my-2 border-0 rounded-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="text-end mt-1">
          <span className="pe-2 shared-font" style={{ fontSize: "13px" }}>
            <span
              className="pe-2"
              style={{
                color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
              }}
            >
              {data?.value?.subscriber_count}
            </span>
            Kişi abone oldu
          </span>
          {data?.value?.is_fav_editor ? (
            <img
              onClick={() => {
                // console.log("star click:::::::::::::", data);
                if (userId && userId != data?.value?.user?.id) {
                  favEditor(data?.value?.user?.id);
                }
              }}
              src={Selected_Favorite}
              alt=""
              height={20}
              width={20}
            />
          ) : (
            <img
              onClick={() => {
                // console.log("star click:::::::::::::", data);
                if (userId && userId != data?.value?.user?.id) {
                  favEditor(data?.value?.user?.id);
                }
              }}
              src={
                currentTheme === "dark"
                  ? Dark_Unselected_Favorite
                  : Light_Unselected_Favorite
              }
              alt=""
              height={20}
              width={20}
            />
          )}
        </div>
        <div className="row">
          <div
            className="col pe-0 d-flex position-relative"
            onClick={() => {
              if (userId) {
                setSelectContent("show-all-comments");
                setActiveCommentsshow(data?.value?.user?.id);
              } else {
                Swal.fire({
                  // title: "Success",
                  text: "You need to become a member to be able to view it.",
                  // icon: "success",
                  backdrop: false,
                  customClass: `${
                    currentTheme === "dark"
                      ? "dark-mode-alert"
                      : "light-mode-alert"
                  }`,
                });
              }
            }}
          >
            <div className="position-absolute">
              <img
                src={crown}
                alt=""
                height={21}
                width={21}
                style={{
                  background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                  borderRadius: "50%",
                  left: "3.2rem",
                  position: "absolute",
                }}
              />
            </div>
            <img
              style={{ objectFit: "cover" }}
              src={`${
                data?.value?.user?.profile_pic
                  ? server_url + data?.value?.user?.profile_pic
                  : initialProfile
              }`}
              className="rounded-circle"
              width={75}
              height={75}
              alt=""
            />
            <div className="d-flex flex-column ps-1">
              <div>
                <button
                  className="px-3"
                  style={{
                    border: "1px solid #FFA200",
                    color: "#FFA200",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                    fontSize: "13px",
                  }}
                >
                  {data?.value?.user?.commentator_level
                    ?.charAt(0)
                    ?.toUpperCase() +
                    data?.value?.user?.commentator_level?.substring(1)}
                </button>
              </div>
              <div
                className="blueTick-responsive align-items-center mt-1 responsive-username"
                style={{ fontSize: "13px" }}
              >
                <span className="pe-1">{data?.value?.user?.username}</span>
                {verifyid?.includes(data?.value?.user?.id) && (
                  <img
                    className="responsive-blue-tick"
                    src={blueTick}
                    alt=""
                    width={17}
                    height={17}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                %{data?.value?.user?.success_rate || 0}
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end flex-column align-items-end me-3">
            <div className="mt-1">
              {data?.value?.user?.category.includes("Football") || data?.value?.user?.category.includes("Futbol") && (
                <img
                  src={football}
                  alt=""
                  height={38}
                  width={38}
                  style={{ color: "#00C936" }}
                />
              )}
              {data?.value?.user?.category.includes("Basketball") || data?.value?.user?.category.includes("Basketbol") && (
                <img
                  src={basketball}
                  alt=""
                  height={38}
                  width={38}
                  style={{ color: "#FF9100" }}
                />
              )}
            </div>
            {data?.value?.user?.commentator_level !== "apprentice" && (
              <div className="" style={{ fontSize: "12px" }}>
                <button
                  onClick={() => {
                    setCommentatorUser(data?.value?.user);
                    setShowModal(true);
                  }}
                  className="my-2 px-2 py-1"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #37FF80"
                        : "1px solid #00659D",
                    color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                    backgroundColor: "transparent",
                    borderRadius: "3px",
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubscribeModal
        commentatorUser={commentatorUser}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default SharedProfile;
