import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import starIcon from "../../assets/star-1.svg";
import starDark from "../../assets/star.svg";
import { BsArrowLeft } from "react-icons/bs";
import basketball from "../../assets/Profile Card Basketball.svg";
import football from "../../assets/Profile Card Football.svg";
import "./ActiveComments.css";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import PromoteMeModal from "../PromoteMeModal/PromoteMeModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import camera from "../../assets/camera-plus.svg";
import edit from "../../assets/edit.png";
import editLight from "../../assets/edit.svg";
import WithdrawalModal from "../WithdrawalModal/WithdrawalModal";
import axios from "axios";
import { userId } from "../GetUser";
import Form from "react-bootstrap/Form";

const ActiveComments = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [SubscribeModalShow, setSubscribeModalShow] = useState(false);
  const [PromoteModalShow, setPromoteModalShow] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [AddCommentModalModalShow, setAddCommentModalModalShow] =
    useState(false);

  const [textareaValue, setTextareaValue] = useState(
    "2012 yılından beri profesyonel olarak..."
  );

  const [editProfile, setEditProfile] = useState(false);
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);

  const profileData = props.profileData;

  function handleChangeProfilePic(e) {
    setPreveiwProfilePic(URL.createObjectURL(e.target.files[0]));
    setEditProfile(false);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = axios.post(`http://127.0.0.1:8000/profile/${userId}`, formData);
    console.log("res: ", res);
  }

  return (
    <>
      <div
        className={`card border-0 rounded-0 my-2 p-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
        style={{ fontSize: "14px" }}
      >
        <div className="d-flex justify-content-between pb-2">
          <BsArrowLeft
            onClick={() => {
              props.setSelectContent("home");
              props.setDashboardSUser(false);
            }}
            fontSize={"1.6rem"}
          />
          <img
            src={`${currentTheme === "dark" ? starDark : starIcon}`}
            alt=""
            height={25}
            width={25}
          />
        </div>
        <div className="row g-0">
          <div className="col pe-0 d-flex ">
            <div className="position-relative">
              <img
                src={
                  preveiwProfilePic
                    ? preveiwProfilePic
                    : `http://127.0.0.1:8000${profileData?.profile_pic}`
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
              <img
                className="crown-img-Editor"
                src={crown}
                alt=""
                height={25}
                width={25}
                style={{
                  background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                }}
              />
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
                onChange={handleChangeProfilePic}
              />
            </div>
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
                style={{ fontSize: "14px" }}
              >
                {profileData?.username}
                <img
                  className="responsive-blue-tick"
                  src={blueTick}
                  alt=""
                  width={19}
                  height={19}
                />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                {profileData?.city}/{profileData?.country}
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
            <div className="d-flex justify-content-end gap-2">
              <div className="flex-column d-flex text-center">
                <span style={{ fontSize: "1.2rem" }}>
                  {profileData?.Subscriber_Count}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  Abone
                </span>
              </div>

              <div className="flex-column d-flex text-center">
                <span style={{ fontSize: "1.2rem" }}>
                  {profileData?.Follower_Count}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  Takipci
                </span>
              </div>

              <div className="flex-column d-flex text-center">
                <span style={{ fontSize: "1.2rem" }}>
                  {profileData?.Comment_Count}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  Yorum
                </span>
              </div>
            </div>
            <div className="mt-2 d-flex justify-content-end">
              {props.profile === "commentator" ? (
                <button
                  onClick={() => setEditProfile(!editProfile)}
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
                    padding: "0.1rem 1.7rem",
                    fontSize: "13px",
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #4DD5FF"
                        : "1px solid #007BF6",
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                    padding: "0.1rem 2.2rem",
                    fontSize: "13px",
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className="my-2 p-1 content-font position-relative"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            opacity: editProfile ? "0.3" : "",
          }}
        >
          <Form.Control
            as="textarea"
            maxLength={250}
            className={`${
              currentTheme === "dark"
                ? "textArea-dark-mode content-font"
                : "textArea-light-mode content-font"
            }`}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            disabled={!editProfile}
          />
        </div>
        <img
          // onClick={() => setEditProfile(!editProfile)}
          src={currentTheme === "dark" ? edit : editLight}
          alt=""
          height={35}
          width={35}
          style={{
            display: editProfile ? "block" : "none",
            position: "absolute",
            right: "10rem",
            top: "10rem",
          }}
        />
        <div className="row g-0 text-center my-2 gap-1">
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Success Rate
            </span>
            <span style={{ fontSize: "1.1rem", color: "#D2DB08" }}>%67.6</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Score Points
            </span>
            <span style={{ fontSize: "1.1rem", color: "#FFA200" }}>1.356</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Winning
            </span>
            <span style={{ fontSize: "1.1rem", color: "#37FF80" }}>256</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Lose
            </span>
            <span style={{ fontSize: "1.1rem", color: "#FF5757" }}>256</span>
          </div>
        </div>
        <div
          className="d-flex align-items-center ps-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="flex-grow-1">Category</div>
          <div className="">
            <img src={basketball} alt="" height={45} width={45} />
          </div>
          <div className="">
            <img src={football} alt="" height={45} width={45} />
          </div>
        </div>
        <div
          className="d-flex justify-content-between p-2 my-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Average Odds</div>
          <div className="py-1">1.80</div>
        </div>
        <div
          className="d-flex justify-content-between p-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Leagues</div>
          <div className="py-1">UK Premier League + 3</div>
        </div>
        {props.profile !== "commentator" && (
          <div
            className={`d-flex justify-content-center align-items-center my-3 ${
              props.content === ("home" || "wallet") && "mb-5"
            }`}
          >
            Month/29.90₺
            <button
              onClick={() => setSubscribeModalShow(true)}
              className="ms-1 px-3 py-1"
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
        {props.profile === "commentator" && (
          <div className="d-flex justify-content-center my-3 gap-2" style={{height:"32.5px"}}>
            {props.content === "home" && (
              <button
                onClick={() => setAddCommentModalModalShow(true)}
                className="p-1 px-2"
                style={{
                  color: currentTheme === "dark" ? "#4DD5FF" : "#00659D",
                  border:
                    currentTheme === "dark"
                      ? "1px solid #4DD5FF"
                      : "1px solid #00659D",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  fontSize: "15px",
                }}
              >
                Add Comment
              </button>
            )}
            {props.content === "wallet" && (
              <button
                onClick={() => setWithdrawalModal(true)}
                className="p-1 px-2"
                style={{
                  color: currentTheme === "dark" ? "#C66EF8" : "#00659D",
                  border:
                    currentTheme === "dark"
                      ? "1px solid #C66EF8"
                      : "1px solid #00659D",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  fontSize: "15px",
                }}
              >
                Withdrawal
              </button>
            )}
            {(props.content === "home" ||
              props.content === "wallet" ||
              props.content === "subscribers") && (
              <button
                onClick={() => setPromoteModalShow(true)}
                className="p-1 px-2"
                style={{
                  color: currentTheme === "dark" ? "#6BFFC4" : "#C66EF8",
                  border:
                    currentTheme === "dark"
                      ? "1px solid #6BFFC4"
                      : "1px solid #C66EF8",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Promote Me
              </button>
            )}
          </div>
        )}
      </div>

      <SubscribeModal
        show={SubscribeModalShow}
        onHide={() => setSubscribeModalShow(false)}
      />
      <PromoteMeModal
        show={PromoteModalShow}
        onHide={() => setPromoteModalShow(false)}
      />
      <AddCommentModal
        show={AddCommentModalModalShow}
        onHide={() => setAddCommentModalModalShow(false)}
      />
      <WithdrawalModal
        show={withdrawalModal}
        onHide={() => setWithdrawalModal(false)}
      />
    </>
  );
};

export default ActiveComments;
