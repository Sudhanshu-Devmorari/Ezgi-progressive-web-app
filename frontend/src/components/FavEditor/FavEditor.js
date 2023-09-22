import React, { useContext, useState } from "react";
import crown from "../../assets/crown.png";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import football from "../../assets/Profile Card Football.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import yellowStarIcon from "../../assets/star-1 (1).svg";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import config from "../../config";
import axios from "axios";
import { userId } from "../GetUser";
import { useEffect } from "react";
import initialProfile from "../../assets/profile.png";
import Swal from "sweetalert2";

const FavEditor = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [favEditorCommentsLike, setFavEditorCommentsLike] = React.useState([]);

  useEffect(() => {
    setFavEditorCommentsLike(props?.favEditorData);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [props?.favEditorData]);

  const errorSwal = () => {
    // console.log(localStorage.getItem("user-active"))

    Swal.fire({
      title: "Error",
      text: `Your account has been deactivated. Contact support for assistance.`,
      icon: "error",
      backdrop: false,
      customClass:
        currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    });
  };

  const onFavEditorSelect = async (id) => {
    const user_id = localStorage.getItem("user-id");
    try {
      const response = await axios.post(
        `${config.apiUrl}/fav-editor/${user_id}/`,
        {
          id: id,
        }
      );

      const favEditorData = favEditorCommentsLike.filter(
        (res) => res?.data?.commentator_user?.id !== response.data.user_id
      );
      // console.log("filerdata:::::::::::::", favEditorData);
      setFavEditorCommentsLike(favEditorData);

      props?.setFavEditorData(favEditorData);
      const mergedEditorResult = props.mergedEditorResult;
      if (mergedEditorResult) {
        mergedEditorResult.filter(
          (res) => res?.value?.user?.id == response.data.user_id
        )[0].value.is_fav_editor = response.data.is_fav_editor;
        props?.setMergedEditorResult(mergedEditorResult);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const [commentatorUser, setcommentatorUser] = useState([]);

  // check activation
  const checkDeactivation = async (value) => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/check-deactivated-account/${userId}`
      );
      if (res.status === 200) {
        setcommentatorUser(value);
        setModalShow(true);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
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
      {isLoading ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          Loading...
        </div>
      ) : favEditorCommentsLike.length == 0 ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          No Record Found!
        </div>
      ) : (
        <>
          {favEditorCommentsLike &&
            favEditorCommentsLike?.map((res, index) => (
              <div
                className={`card p-1 my-2 border-0 rounded-0 ${
                  currentTheme === "dark" ? "dark-mode" : "light-mode"
                }`}
              >
                <div className="text-end mt-1">
                  <span
                    className="pe-2 shared-font"
                    style={{ fontSize: "13px" }}
                  >
                    <span
                      className="pe-2"
                      style={{
                        color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                      }}
                    >
                      {res?.subscriber_count}
                    </span>
                    Kişi abone oldu
                  </span>
                  <img
                    className=""
                    src={yellowStarIcon}
                    alt=""
                    height={22}
                    width={22}
                    onClick={() => {
                      // console.log("star click in fav editor:::::::::::::");
                      if (userId) {
                        onFavEditorSelect(res?.data?.commentator_user?.id);
                      }
                    }}
                  />
                </div>
                <div className="row">
                  <div
                    className="col pe-0 d-flex position-relative"
                    onClick={() => {
                      props?.setActiveCommentsshow(
                        res?.data?.commentator_user?.id
                      );
                      props?.setDashboardSUser(false);
                      props?.setSelectContent("show-all-comments");
                    }}
                  >
                    <div className="position-absolute">
                      <img
                        src={crown}
                        alt=""
                        height={21}
                        width={21}
                        style={{
                          background:
                            currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                          borderRadius: "50%",
                          left: "3.2rem",
                          position: "absolute",
                        }}
                      />
                    </div>
                    <img
                      src={
                        res?.data?.commentator_user?.profile_pic
                          ? `${config?.apiUrl}${res?.data?.commentator_user?.profile_pic}`
                          : initialProfile
                      }
                      width={75}
                      height={75}
                      alt=""
                      style={{ objectFit: "cover", borderRadius: "50%" }}
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
                          Expert
                        </button>
                      </div>
                      <div
                        className="blueTick-responsive align-items-center mt-1 responsive-username"
                        style={{ fontSize: "13px" }}
                      >
                        <span className="pe-1">
                          {res?.data?.commentator_user?.username}
                        </span>
                        {props?.verifyid?.includes(
                          res?.data?.commentator_user?.id
                        ) && (
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
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                        }}
                      >
                        %{res?.data?.commentator_user?.success_rate}
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-end flex-column align-items-end me-3">
                    <div className="mt-1">
                      {res?.data?.commentator_user?.category.includes(
                        "Football"
                      ) ||
                        (res?.data?.commentator_user?.category.includes(
                          "Futbol"
                        ) && (
                          <img
                            src={football}
                            alt=""
                            height={38}
                            width={38}
                            style={{ color: "#00C936" }}
                          />
                        ))}
                      {res?.data?.commentator_user?.category.includes(
                        "Basketball"
                      ) ||
                        (res?.data?.commentator_user?.category.includes(
                          "Basketbol"
                        ) && (
                          <img
                            src={basketball}
                            alt=""
                            height={38}
                            width={38}
                            style={{ color: "#FF9100" }}
                          />
                        ))}
                    </div>
                    {res?.data?.commentator_user?.commentator_level !==
                      "apprentice" && (
                      <div className="" style={{ fontSize: "12px" }}>
                        <button
                          onClick={() => {
                            checkDeactivation(res?.data?.commentator_user);
                          }}
                          className="my-2 px-2 py-1"
                          style={{
                            border:
                              currentTheme === "dark"
                                ? "1px solid #37FF80"
                                : "1px solid #00659D",
                            color:
                              currentTheme === "dark" ? "#37FF80" : "#00659D",
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
            ))}
        </>
      )}

      <SubscribeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        commentatorUser={commentatorUser}
      />
    </>
  );
};

export default FavEditor;
