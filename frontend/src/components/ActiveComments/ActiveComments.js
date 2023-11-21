import React, { useContext, useState, useEffect } from "react";
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
import { truncateString, userId } from "../GetUser";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import AxiosInstance from "../AxiosInstance";
import Selected_Favorite from "../../assets/Selected Favorite.svg";
import Dark_Unselected_Favorite from "../../assets/Dark - Unselected Favorite.svg";
import Light_Unselected_Favorite from "../../assets/Light - Unselected Favorite.svg";
import Spinner from "react-bootstrap/esm/Spinner";
import BankUpdateModal from "../BankUpdateModal/BankUpdateModal";
import moment from "moment";
import { Cookies, useCookies } from "react-cookie";

const ActiveComments = (props) => {
  const [setCookie, removeCookie] = useCookies();

  const { activeResolved, profileData, profileLoading, setActiveCommentsshow } =
    props;
  const [showBankUpdate, setShowBankUpdate] = useState(false);
  // const profileData = props?.profileData;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [SubscribeModalShow, setSubscribeModalShow] = useState(false);
  const [PromoteModalShow, setPromoteModalShow] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [AddCommentModalModalShow, setAddCommentModalModalShow] =
    useState(false);

  const [textareaValue, setTextareaValue] = useState(profileData?.description);

  const [editProfile, setEditProfile] = useState(false);
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);

  const truncated = truncateString(profileData?.username, 7);

  const [user, setUser] = useState(null);

  const [commentatorUser, setCommentatorUser] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    if (props?.from === "editor" && props?.activeCommentsshow) {
      setUser(props.activeCommentsshow);
    } else if (props?.from === "dashboard" && userId) {
      setUser(userId);
    } else {
      const user = cookies.get("user-id");
      setUser(user);
    }
  }, []);

  async function handleChangeProfilePic(e) {
    try {
      const file = e.target.files[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.type)) {
          if (file.size >= 5000000) {
            Swal.fire({
              title: "Error",
              text: "Please select a image file less than 5MB.",
              icon: "error",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          } else {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("update", "profile");

            const res = await AxiosInstance.post(
              `${config.apiUrl}/profile/`,
              formData
            );
            if (res.status === 200) {
              setPreveiwProfilePic(URL.createObjectURL(e.target.files[0]));
              setEditProfile(false);
              props.getProfileData();
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
    } catch (error) {
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
    }
  }
  const userPhone = cookies.get("user-id");
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

  const [userPoints, setUserPoints] = useState({
    success_rate: "",
    score_point: "",
    winning: "",
    lose: "",
    avg_odd: "",
    league: "",
  });

  const favEditor = async (id) => {
    const user_id = cookies.get("user-id");
    try {
      const response = await AxiosInstance.post(
        `${config.apiUrl}/fav-editor/`,
        {
          id: id,
        }
      );
      // console.log("API Response:", response);
      props?.setIsFavorite(!props?.isFavorite);
      props?.homeApiData(user_id);
      if (response.status == 204) {
        localStorage.clear();
        removeCookie("access-token");
        window.location.reload();
      }
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

  useEffect(() => {
    if (user)
      try {
        AxiosInstance
          .get(`${config.apiUrl}/user-statistics/${user}/`)
          .then((res) => {
            setUserPoints({
              success_rate: res.data.Success_rate,
              score_point: res.data.Score_point,
              winning: res.data.win_count,
              lose: res.data.lose_count,
              avg_odd: res.data.avg_odd,
              league: res.data.leagues[0],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
  }, [user]);
  const [followLabel, setFollowLabel] = useState("Follow");

  const followCommentator = async (commentator_id, isFollowing) => {
    if (userId == null) {
      await Swal.fire({
        title: "Error",
        text: `Please log in to continue.`,
        icon: "error",
        backdrop: false,
        customClass:
          currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
      });
      return;
    }
    try {
      if (isFollowing) {
        const confirmation = await Swal.fire({
          title: "Unfollow?",
          text: "Are you sure you want to unfollow this commentator?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
        // console.log(confirmation.value);
        if (confirmation.value === true) {
          const res = await AxiosInstance.get(
            `${config.apiUrl}/follow-commentator/?id=${commentator_id}`
          );
          // console.log("On Unfollow",res)
          setFollowLabel(() =>
            followLabel === "Follow" ? "Followed" : "Follow"
          );

          Swal.fire({
            customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
            title: "You have Unfollowed",
            icon: "success",
          });
          profileData.Follower_Count = profileData?.Follower_Count - 1;
          const user_id = cookies.get("user-id");
          props?.homeApiData(user_id);
        }
      } else {
        const res = await AxiosInstance.get(
          `${config.apiUrl}/follow-commentator/?id=${commentator_id}`
        );
        // console.log("On Follow",res)
        const user_id = cookies.get("user-id");
        props?.homeApiData(user_id);
        profileData.Follower_Count = profileData?.Follower_Count + 1;
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data}`,
        icon: "error",
        backdrop: false,
        // customClass: "dark-mode-alert",
        customClass:
          currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
      });
      console.error("Error fetching data.", error);
    }
  };

  const handleSavedata = async () => {
    try {
      const res = await AxiosInstance.post(`${config.apiUrl}/profile/`, {
        description: textareaValue,
        update: "comment",
      });
      setTextareaValue(res.data.data.description);
      setDescriptionShow(false);
      setEditProfile(false);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Description Updated!",
          icon: "success",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    } catch (error) {
      console.log("error", error);
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

  const [isLoading, setIsLoading] = useState(false);
  const handleDeactivation = async () => {
    try {
      setIsLoading(true);
      const res = await AxiosInstance.patch(
        `${config.apiUrl}/deactivate-commentator/`
      );
      if (res.status === 200) {
        setIsLoading(false);
        setEditProfile(false);
        Swal.fire({
          title: "Success",
          text: res?.data?.data,
          icon: "success",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setIsLoading(false);
        setEditProfile(false);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.data,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  // Bank update
  const [bankDetails, setBankDetails] = useState([]);
  const handleBankUpdate = async () => {
    try {
      const res = await AxiosInstance.get(`${config.apiUrl}/bank-details/${userId}`);
      if (res?.status === 200) {
        const bank_iban = res?.data?.data?.bank_iban;
        if (bank_iban) {
          const withdrawal_amount = res?.data?.data?.withdrawable_balance;
          if (withdrawal_amount === null || withdrawal_amount === 0) {
            Swal.fire({
              title: "Error",
              text: "Check your pending balance.",
              icon: "error",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          } else {
            setBankDetails(res?.data?.data);
            setWithdrawalModal(true);
          }
        } else {
          setShowBankUpdate(true);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
      if (
        error?.response?.status === 500 &&
        error?.response?.data?.error ===
          "No BankDetails matches the given query."
      ) {
        setShowBankUpdate(true);
      }
    }
  };

  const [commentatorLevel, setCommentatorLevel] = useState(null);
  // const currentDate = new Date()
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear();
  // const formattedCurrentDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  const currentDate = moment();
  const formattedCurrentDate = currentDate.format('DD/MM/YYYY');
  
  // check activation
  const checkDeactivation = async (value, editor_id) => {
    try {
      const res = await AxiosInstance.get(
        `${config.apiUrl}/check-deactivated-account/?editor_id=${editor_id}`
      );
      if (res.status === 200) {
        if (value === "add comment") {
          setAddCommentModalModalShow(true);
        } else if (value === "promote me") {
          try {
            const res = await AxiosInstance.get(
              `${config.apiUrl}/highlight-purchase/`
            );
            if (res?.status === 200) {
              setCommentatorLevel(profileData);
              setPromoteModalShow(true);
            }
          } catch (error) {
            console.log(error);
            if (error?.response?.status === 400) {
              const end_date = moment(error?.response?.data?.end_date).format('DD/MM/YYYY');
              
              Swal.fire({
                text: end_date == formattedCurrentDate ? 
                'Your Highlight plan has expired today. You will be able to purchase it again starting tomorrow.' : 
                `Your Highlight plan will expire on ${end_date}. You can purchase it again after this date.`,
                // text: 'Your Highlight plan has expired today. You will be able to purchase it again starting tomorrow.' ,
                
                backdrop: false,
                customClass:
                  currentTheme === "dark"
                    ? "dark-mode-alert"
                    : "light-mode-alert",
              });
            }
          }
        } else if (value === "bank update") {
          handleBankUpdate();
        } else if (value === "edit profile") {
          setEditProfile(!editProfile);
          setDescriptionShow(editProfile);
        } else if (value === "subscribe model") {
          setCommentatorUser(profileData);
          setSubscribeModalShow(true);
          // try{
          //   const checkSubscriptionPlan = await axios.get(
          //     `${config.apiUrl}/subscription/${userId}/?id=${profileData?.id}`
          //   );
          //   if(checkSubscriptionPlan.status === 200){
          //     setCommentatorUser(profileData);
          //     setSubscribeModalShow(true);
          //   }
          // }catch(error){
          //   // console.log("error", error)
          //   if (error?.response?.status === 400) {
          //     const end_date = moment(error?.response?.data?.end_date).format('DD/MM/YYYY');

          //     Swal.fire({
          //       title: "Error",
          //       // text: `${error?.response?.data?.data}`,
          //       text: end_date == formattedCurrentDate ? 
          //         'Your Subscription plan has expired today. You will be able to purchase it again starting tomorrow.' : 
          //         `Your Subscription plan will expire on ${end_date}. You can purchase it again after this date.`,
          //       icon: "error",
          //       backdrop: false,
          //       customClass:
          //         currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          //     });
          //   }
          // }
        } else if (value === "cancel subscription") {
          Swal.fire({
            title: "Are you sure to cancel your subscription??",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel Subscription!",
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          }).then((result) => {
            if (result.isConfirmed) {
              cancelSubcription();
            }
          });
        }
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

  // Cancel Subcription
  const cancelSubcription = async () => {
    try {
      // const res = await axios.post(`${config.apiUrl}/subscription/${userId}/`, {
      //   commentator_id: profileData?.id,
      // });
      const res = await AxiosInstance.patch(
        `${config.apiUrl}/subscription/${userId}/?commentator_id=${profileData?.id}`
      );
      if (res?.status === 200) {
        window.location.reload();
        // Swal.fire({
        //   title: "Success",
        //   text: res?.data?.data,
        //   icon: "success",
        //   backdrop: false,
        //   customClass:
        //     currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        // }).then((res) => {
        //   if (res.isConfirmed) {
        //   }
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!profileData || !profileData?.is_subscribe) {
  //     return; // No need to continue if not subscribed
  //   }

  //   const currentTime = Date.now();
  //   const subExpDate = new Date(profileData?.subscription_end_date).getTime();

  //   if (currentTime >= subExpDate) {
  //     // cancelSubcription();
  //     // console.log("Subscription expired - cancelling");
  //   } else {
  //     // console.log("Subscription is active");
  //   }
  // }, [profileData]);

  const expirationDate = moment(profileData?.subscription_end_date);
  const [daysUntilExpiration, setDaysUntilExpiration] = useState(
    expirationDate.diff(moment(), "days")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newDaysUntilExpiration = expirationDate.diff(moment(), "days");
      setDaysUntilExpiration(newDaysUntilExpiration);
    }, 1000 * 60 * 60 * 24); // Update every day

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
  }, [daysUntilExpiration]);

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
              const currentPage =
                localStorage.getItem("priviouspage") || "home";
              const priviusPage = localStorage.getItem("priviouspage");
              const deshboardShow =
                localStorage.getItem("dashboardShow") || false;
              localStorage.setItem(
                "currentpage",
                currentPage == "show-all-comments" ||
                  currentPage == "notifications"
                  ? currentPage
                  : "home"
              );
              props.setSelectContent(
                currentPage == "show-all-comments" ||
                  currentPage == "notifications"
                  ? "home"
                  : currentPage || "home"
              );
              props.setDashboardSUser(
                deshboardShow == "true"
                  ? false
                  : priviusPage == "fav"
                  ? false
                  : true
              );
              localStorage.setItem(
                "dashboardShow",
                priviusPage == "fav" ? false : true
              );
              localStorage.removeItem("activeCommentId");
              setActiveCommentsshow && setActiveCommentsshow(null);
            }}
            fontSize={"1.6rem"}
          />
          {props?.from === "editor" && (
            <>
              {props?.isFavorite ? (
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => {
                    if (userId) {
                      props?.profileData?.id != userId &&
                        favEditor(profileData?.id);
                    }
                  }}
                  src={Selected_Favorite}
                  alt=""
                  height={20}
                  width={20}
                />
              ) : (
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => {
                    if (userId && userPhone != profileData?.id) {
                      favEditor(profileData?.id);
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
            </>
          )}
        </div>
        <div className="row g-0 flex-nowrap">
          <div className="col pe-0 d-flex ">
            <div className="position-relative">
              {profileLoading &&
              preveiwProfilePic == null &&
              profileData?.profile_pic == "" ? (
                <Spinner />
              ) : (
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  src={
                    preveiwProfilePic
                      ? preveiwProfilePic
                      : profileData?.profile_pic
                      ? `${config?.apiUrl}${profileData?.profile_pic}`
                      : initialProfile
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
              )}
            </div>
            <div className="">
              <img
                onContextMenu={(e) => e.preventDefault()}
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
                    onContextMenu={(e) => e.preventDefault()}
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
              <div>
                <button
                  className="px-3 text-capitalize"
                  style={{
                    border: "1px solid #FFA200",
                    color: "#FFA200",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                    fontSize: "12px",
                  }}
                >
                  {profileData?.commentator_level}
                </button>
              </div>
              <div
                className="blueTick-responsive align-items-center mt-1 responsive-username"
                style={{ fontSize: "14px" }}
              >
                {truncated}
                {props.verifyid?.includes(profileData?.id) && (
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    className="responsive-blue-tick"
                    src={blueTick}
                    alt=""
                    width={19}
                    height={19}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                {profileData && profileData?.city}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
                {moment(profileData?.membership_date).format("DD.MM.YYYY")}
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
                  onClick={() => {
                    checkDeactivation("edit profile");
                  }}
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
                <>
                  {userId != profileData?.id && (
                    <button
                      onClick={() => {
                        if (userPhone != profileData?.id) {
                          followCommentator(
                            profileData?.id,
                            props?.followingid?.includes(profileData?.id)
                          );
                        }
                      }}
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
                      {props.followingid?.includes(profileData?.id)
                        ? "Followed"
                        : "Follow"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {(props?.from === "dashboard" || textareaValue) && (
          <div
            className="my-2 p-1 content-font position-relative"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              opacity: editProfile ? (!descriptionShow ? "0.3" : "") : "",
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
              placeholder="No Data Found"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              disabled={editProfile ? (descriptionShow ? false : true) : true}
            />
          </div>
        )}
        <img
          onContextMenu={(e) => e.preventDefault()}
          onClick={() => setDescriptionShow(!descriptionShow)}
          src={currentTheme === "dark" ? edit : editLight}
          alt=""
          height={35}
          width={35}
          style={{
            display: editProfile
              ? !descriptionShow
                ? "block"
                : "none"
              : "none",
            position: "absolute",
            right: "10rem",
            top: "10rem",
          }}
        />
        <button
          style={{
            display: editProfile
              ? descriptionShow
                ? "block"
                : "none"
              : "none",
            position: "absolute",
            right: "1rem",
            top: "13.5rem",
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
            padding: "0.1rem 1.2rem",
            fontSize: "13px",
          }}
          onClick={() => handleSavedata()}
        >
          Save
        </button>
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
            <span style={{ fontSize: "1.1rem", color: "#D2DB08" }}>
              %{userPoints.success_rate}
            </span>
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
            <span style={{ fontSize: "1.1rem", color: "#FFA200" }}>
              {userPoints.score_point}
            </span>
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
            <span style={{ fontSize: "1.1rem", color: "#37FF80" }}>
              {userPoints.winning}
            </span>
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
            <span style={{ fontSize: "1.1rem", color: "#FF5757" }}>
              {userPoints.lose}
            </span>
          </div>
        </div>
        <div
          className="d-flex align-items-center ps-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="flex-grow-1">Category</div>
          {profileData?.category?.some(
            (categoryItem) =>
              categoryItem.includes("Basketball") ||
              categoryItem.includes("Basketbol")
          ) && (
            <div className="">
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={basketball}
                alt=""
                height={45}
                width={45}
              />
            </div>
          )}
          {profileData?.category?.some(
            (categoryItem) =>
              categoryItem.includes("Football") ||
              categoryItem.includes("Futbol")
          ) && (
            <div className="">
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={football}
                alt=""
                height={45}
                width={45}
              />
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-between p-2 my-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Experience</div>
          <div className="py-1">{profileData?.experience || 0}</div>
        </div>
        <div
          className="d-flex justify-content-between p-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Leagues</div>
          <div className="py-1">
            {userPoints.league ? userPoints.league : "No League"}
          </div>
        </div>
        {props.profile !== "commentator" &&
          profileData?.commentator_level !== "apprentice" && (
            <div
              className={`d-flex justify-content-center align-items-center my-3 ${
                props.content === ("home" || "wallet") && "mb-5"
              }`}
            >
              {/* {Number(userId) !== profileData?.id && */}
              {!profileData?.is_cancelled ? (
                <button
                  onClick={() => {
                    if (userId) {
                      if (!profileData?.is_subscribe) {
                        checkDeactivation("subscribe model", profileData?.id);
                      } else {
                        checkDeactivation("cancel subscription", profileData?.id);
                      }
                    }
                  }}
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
                  {profileData?.is_subscribe
                    ? "Cancel Subscription"
                    : "Subscribe"}
                </button>
              ) : (
                <span>
                  Your subscription will end on{" "}
                  <span style={{ color: "red" }}>
                    {new Date(
                      profileData?.subscription_end_date
                    ).toLocaleDateString()}{" "}
                  </span>
                  date.
                </span>
              )}
              {daysUntilExpiration + 1 < 3 &&
                daysUntilExpiration >= 0 &&
                profileData?.is_subscribe &&
                !profileData?.is_cancelled && (
                  <button
                    onClick={() => {
                      if (userId) {
                        checkDeactivation("subscribe model", profileData?.id);
                      }
                    }}
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
                    Renew
                  </button>
                )}
            </div>
          )}
        {props.profile === "commentator" && (
          <div
            className="d-flex justify-content-center my-3 gap-2"
            style={{ height: "32.5px" }}
          >
            {props.content === "home" && (
              <button
                onClick={() => {
                  checkDeactivation("add comment");
                }}
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
            {props.content === "wallet" &&
              profileData?.commentator_level !== "apprentice" && (
                <button
                  onClick={() => {
                    checkDeactivation("bank update");
                  }}
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
              <>
                {profileData?.commentator_level !== "apprentice" && (
                  <button
                    onClick={() => {
                      checkDeactivation("promote me");
                    }}
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
              </>
            )}
            {editProfile && (
              <button
                onClick={() => {
                  if (userId) {
                    handleDeactivation();
                  }
                }}
                className="p-1 px-2"
                style={{
                  color: "#FF5757",
                  border: "1px solid #FF5757",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {isLoading ? "Loading..." : "Deactive"}
              </button>
            )}
          </div>
        )}
      </div>

      <SubscribeModal
        commentatorUser={commentatorUser}
        show={SubscribeModalShow}
        onHide={() => setSubscribeModalShow(false)}
      />
      <PromoteMeModal
        commentatorUser={commentatorLevel}
        show={PromoteModalShow}
        onHide={() => setPromoteModalShow(false)}
      />
      <AddCommentModal
        show={AddCommentModalModalShow}
        onHide={() => setAddCommentModalModalShow(false)}
        activeResolved={activeResolved}
        profileData={profileData}
      />
      <WithdrawalModal
        bankDetails={bankDetails}
        show={withdrawalModal}
        onHide={() => setWithdrawalModal(false)}
      />
      <BankUpdateModal
        show={showBankUpdate}
        onHide={() => setShowBankUpdate(false)}
      />
    </>
  );
};

export default ActiveComments;
