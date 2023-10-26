import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CurrentTheme from "../../context/CurrentTheme";
import { RxCross2 } from "react-icons/rx";
import camera from "../../assets/camera-plus.svg";
import initialProfile from "../../assets/profile.png";
import config from "../../config";
import { CustomDropdownBecomeEditor } from "../CustomDropdownBecomeEditor";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import Swal from "sweetalert2";
import { userId } from "../GetUser";
import axios from "axios";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { useEffect } from "react";
import { ref, transcationQueryAPI } from "../GetRefNo";

const BecomeAEditorModal = (props) => {
  const userId = localStorage.getItem("user-id");
  const { profileData } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);

  const kategoriOptions = ["Futbol", "Basketbol", "Futbol, Basketbol"];

  const deneyimOptions = ["1-2 years", "3-4 years", "5+ years", "10+ years"];

  const [selectedKategori, setSelectedKategori] = useState("Select");
  const [kategoriDropdown, setKategoriDropdown] = useState(false);

  const [selectedDeneyim, setSelectedDeneyim] = useState("Select");
  const [deneyimDropdown, setDeneyimDropdown] = useState(false);

  const handleKategoriSelection = (kategori) => {
    setSelectedKategori(kategori);
    setCategoryError("");
  };

  const handleDeneyimSelection = (deneyim) => {
    setSelectedDeneyim(deneyim);
    setExperienceError("");
  };

  const toggleKategoriDropdown = () => {
    setDeneyimDropdown(false);
    setKategoriDropdown(!kategoriDropdown);
  };

  const toggleDeneyimDropdown = () => {
    setKategoriDropdown(false);
    setDeneyimDropdown(!deneyimDropdown);
  };

  const [selectCheckBox, setSelectCheckBox] = useState(false);

  const [showTermsOfUse, setShowTermsOfUse] = useState(1);
  const [file, setFile] = useState(null);

  useEffect(() => {
    profileData?.profile_pic &&
      setPreveiwProfilePic(`${config.apiUrl}${profileData.profile_pic}`);
  }, [profileData]);

  const formData = new FormData();
  function handleProfile(e) {
    try {
      const file = e.target.files[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.type)) {
          setPreveiwProfilePic(URL.createObjectURL(e.target.files[0]));
          setProfileError("");
          setFile(file);
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
  const [categoryError, setCategoryError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      selectedKategori === "Select" &&
      !preveiwProfilePic &&
      selectedDeneyim === "Select" &&
      !selectCheckBox
    ) {
      setCategoryError("Please select a Kategori");
      setExperienceError("Please select a Deneyim");
      setProfileError("Please add a profile");
      setCheckboxError("Please select a checkbox");
      return;
    }
    if (selectedKategori === "Select") {
      setCategoryError("Please select a Kategori");
    } else if (!preveiwProfilePic) {
      setProfileError("Please add a profile");
    } else if (selectedDeneyim === "Select") {
      setExperienceError("Please select a Deneyim");
    } else if (!selectCheckBox) {
      setCheckboxError("Please select a checkbox");
    } else {

      try {
        setIsLoading(true);

        const checkMembership = await axios.get(
          `${config.apiUrl}/become-editor/?id=${userId}`
        );

        const formData = new FormData();

        if (checkMembership?.status === 200) {
          formData.append("payment", "membership");
          formData.append("duration", checkMembership.data.promotion_duration);
          formData.append("amount", checkMembership.data.monthly_amount);
          formData.append("id", userId);
          formData.append("category", selectedKategori);
          formData.append("experience", selectedDeneyim);
          formData.append("profile_pic", preveiwProfilePic);
          file && formData.append("profile_file", file);

          const payment_res = await axios.post(`${config.apiUrl}/payment/`, 
          formData);
          // console.log(payment_res, "==========payment_res");

          if (payment_res.status === 200) {
            const url = payment_res?.data?.URL_3DS;
            // console.log("URL: ", url)
            // window.location.replace(url);
            window.location.href = url;
            // window.location.reload()
          }
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 500) {
          setIsLoading(false);
          props.onHide();
          Swal.fire({
            title: "Error",
            text: "something went wrong",
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
        if (error?.response?.status === 400) {
          setIsLoading(false);
          props.onHide();
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

      // handleMambership();



      // props.onHide();
      // setShowPaymentModal(true);
      // if (preveiwProfilePic) {
      //   setIsLoading(true);
      //   const splitdata = selectedKategori.split(", ");
      //   formData.append("category", splitdata);
      //   formData.append("experience", selectedDeneyim);
      //   file && formData.append("profile_pic", file);
      //   axios
      //     .patch(`${config.apiUrl}/become-editor/${userId}/`, formData)
      //     .then(async (res) => {
      //       if (res.status === 200) {
      //         // setShowPaymentModal(true);
      //         localStorage.setItem("user-role", res.data.user_role);
      //         props.onHide();
      //         await Swal.fire({
      //           title: "Success",
      //           text: "User has successfully become a commentator",
      //           icon: "success",
      //           backdrop: false,
      //           customClass:
      //             currentTheme === "dark"
      //               ? "dark-mode-alert"
      //               : "light-mode-alert",
      //         });
      //         setIsLoading(false);
      //         const currentPage = localStorage.getItem("currentpage");
      //         localStorage.setItem("dashboardShow", true);
      //         (currentPage !== "show-all-comments" ||
      //         currentPage !== "notifications") &&
      //         localStorage.setItem("priviouspage", currentPage);
      //         localStorage.setItem("currentpage", "show-all-comments");
      //         localStorage.setItem("subcurrentpage", "home");
      //         localStorage.removeItem("activeCommentId");
      //         props?.setSelectContent("show-all-comments");
      //         props?.setActiveCommentsshow(null);
      //         props?.setDashboardSUser(true);
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       setIsLoading(false);
      //       if (error.response.status === 404) {
      //         Swal.fire({
      //           title: "Error",
      //           text: error.response.data.error,
      //           icon: "error",
      //           backdrop: false,
      //           customClass:
      //             currentTheme === "dark"
      //               ? "dark-mode-alert"
      //               : "light-mode-alert",
      //         });
      //       } else if (error.response.status === 400) {
      //         Swal.fire({
      //           title: "Error",
      //           text: error?.response?.data?.error,
      //           icon: "error",
      //           backdrop: false,
      //           customClass:
      //             currentTheme === "dark"
      //               ? "dark-mode-alert"
      //               : "light-mode-alert",
      //         });
      //       }
      //     });
      // }
    }
  }
  const ref_no = ref();

  useEffect(() => {
    const ref_no = ref();
    async function testPurchase() {
      try {
        const result = await transcationQueryAPI(ref_no);
        if (result?.STATUS === "SUCCESS" && result?.RETURN_CODE === "0") {
          // console.log("payment succesffull");
          const category = result?.PRODUCTS[0]?.PRODUCT_CATEGORY;
          const ID = result?.PRODUCTS[0]?.PRODUCT_ID
          if (category === "membership" && ID == userId) {
            const category = result?.PRODUCTS[1]?.PRODUCT_CATEGORY
            const experience = result?.PRODUCTS[1]?.PRODUCT_NAME
            const monthly_amount = result?.PRODUCTS[0]?.PRODUCT_AMOUNT
            const duration = result?.PRODUCTS[0]?.PRODUCT_NAME
            const startdate = result?.PAYMENT_DATE
            handleMambership(category, experience, monthly_amount, duration, startdate);
          }
          // const url = new URL(window.location.href);
          // const refExists = url.searchParams.has("ref");
          // if (refExists) {
          //   window.location.replace(window.location.origin + "/");
          // }
        }
      } catch (error) {
        console.log(error); 
      }
    }
    if (ref_no) {
      testPurchase();
    }
  }, [ref_no]);

  const [renewLoading, setRenewLoading] = useState(false);
  const [commentatorUser, setCommentatorUser] = useState([]);
  const getUserdata = async () => {
    try {
      setRenewLoading(true);
      const res = await axios.get(`${config.apiUrl}/user-data/${userId}`);
      setCommentatorUser(res?.data?.data);
      if (res.status === 200) {
        setRenewLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userId && getUserdata();
  }, [userId]);

  const handleMambership = async (category, experience, monthly_amount, duration, startdate) => {
   
    // if (preveiwProfilePic) {
      setIsLoading(true);
      const splitdata = category.split(", ");
      formData.append("category", splitdata);
      formData.append("experience", experience);
      formData.append("monthly_amount", monthly_amount);
      formData.append("duration", duration);
      formData.append("startdate", startdate);
      // file && formData.append("profile_pic", file);
      // formData.append("promotion_duration", promotion);
      // formData.append("plan_price", plan_price);

      await axios
        .patch(`${config.apiUrl}/become-editor/${userId}/`, formData)
        .then(async (res) => {
          if (res.status === 200) {

            // setShowPaymentModal(true);
            localStorage.setItem("user-role", res.data.user_role);
            props.onHide();
            setShowPaymentModal(false);
            const confirm = await Swal.fire({
              title: "Success",
              text: "User has successfully become a commentator",
              icon: "success",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
            setIsLoading(false);
            const currentPage = localStorage.getItem("currentpage");
            localStorage.setItem("dashboardShow", true);
            (currentPage !== "show-all-comments" ||
              currentPage !== "notifications") &&
              localStorage.setItem("priviouspage", currentPage);
            localStorage.setItem("currentpage", "show-all-comments");
            localStorage.setItem("subcurrentpage", "home");
            localStorage.removeItem("activeCommentId");
            props?.setSelectContent("show-all-comments");
            props?.setActiveCommentsshow(null);
            props?.setDashboardSUser(true);
            if (confirm.value === true) {
              // window.location.replace(window.location.origin+'/')
              window.history.pushState(null, null, window.location.origin + "/");
              window.addEventListener("popstate", () => {
                window.history.pushState(null, null, window.location.origin + "/");
              });
              // return () => {
                // Remove event listener when component unmounts
                window.removeEventListener("popstate", () => {
                  window.history.pushState(null, null, window.location.origin + "/");
                  window.location.replace(window.location.origin + "/");
                });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.response.status === 404) {
            Swal.fire({
              title: "Error",
              text: error.response.data.error,
              icon: "error",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          } else if (error.response.status === 400) {
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
    // }
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
          style={{ fontSize: "14px" }}
        >
          {showTermsOfUse === 1 && (
            <>
              <RxCross2
                onClick={() => {
                  setSelectCheckBox(false);
                  props.onHide();
                  setPreveiwProfilePic(null);
                  setSelectedKategori("Select");
                  setSelectedDeneyim("Select");
                }}
                fontSize={"1.5rem"}
                className={`position-absolute ${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
                style={{ zIndex: 1 }}
              />
              <form onSubmit={handleSubmit}>
                <div className="position-relative d-flex justify-content-center align-items-center">
                  {preveiwProfilePic !== null ? (
                    <img
                      onContextMenu={(e) => e.preventDefault()}
                      src={preveiwProfilePic}
                      width={100}
                      height={100}
                      alt="profile image"
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        opacity: currentTheme === "dark" ? "0.4" : "0.7",
                      }}
                    />
                  ) : (
                    <img
                      onContextMenu={(e) => e.preventDefault()}
                      src={initialProfile}
                      width={100}
                      height={100}
                      alt="default profile image"
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        opacity: currentTheme === "dark" ? "0.4" : "0.7",
                      }}
                    />
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="camera-icon"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      onContextMenu={(e) => e.preventDefault()}
                      src={camera}
                      alt=""
                      style={{
                        position: "absolute",
                        backgroundColor: "#",
                        top: "2.8rem",
                      }}
                      height={40}
                      width={40}
                    />
                  </label>
                  <input
                    type="file"
                    name="profile_pic"
                    id="camera-icon"
                    className="d-none"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleProfile(e)}
                  />
                </div>
                <div className="text-center">
                  <span>{profileData?.username}</span>
                </div>
                <div className="text-center">
                  <small className="text-danger">{profileError}</small>
                </div>
                <div className="my-2">
                  <CustomDropdownBecomeEditor
                    label="Kategori"
                    options={kategoriOptions}
                    selectedOption={selectedKategori}
                    onSelectOption={handleKategoriSelection}
                    isOpen={kategoriDropdown}
                    toggleDropdown={toggleKategoriDropdown}
                  />
                  <small className="text-danger">{categoryError}</small>
                </div>
                <div className="my-2">
                  <CustomDropdownBecomeEditor
                    label="Deneyim"
                    options={deneyimOptions}
                    selectedOption={selectedDeneyim}
                    onSelectOption={handleDeneyimSelection}
                    isOpen={deneyimDropdown}
                    toggleDropdown={toggleDeneyimDropdown}
                  />
                  <small className="text-danger">{experienceError}</small>
                </div>
                <div className="my-3 mb-2 d-flex justify-content-center">
                  {currentTheme === "dark" ? (
                    <img
                      onContextMenu={(e) => e.preventDefault()}
                      alt=""
                      src={!selectCheckBox ? CheckBoxDark : CheckBoxSelectDark}
                      style={{ width: "25px", cursor: "pointer" }}
                      className="me-2"
                      onClick={() => setSelectCheckBox(!selectCheckBox)}
                    />
                  ) : (
                    <img
                      onContextMenu={(e) => e.preventDefault()}
                      src={
                        !selectCheckBox ? CheckBoxLight : CheckBoxSelectLight
                      }
                      style={{ width: "25px", cursor: "pointer" }}
                      className="me-2"
                      onClick={() => setSelectCheckBox(!selectCheckBox)}
                      alt=""
                    />
                  )}
                  I have read and agree to the{" "}
                  <span
                    className="ps-1"
                    style={{
                      color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                    }}
                    onClick={() => {
                      setShowTermsOfUse(2);
                    }}
                  >
                    Terms of use
                  </span>
                </div>
                <div className="text-center">
                  <small className="text-danger">
                    {selectCheckBox ? "" : checkboxError}
                  </small>
                </div>
                <div className="d-flex justify-content-center my-3">
                  <button
                    type="submit"
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                  >
                    {isLoading ? "Loading..." : "Proceed to payment"}
                  </button>
                </div>
                <div className="d-flex flex-column text-center my-3">
                  <span>Membership plans do not renew automatically.</span>
                  <span>You can cancel the membership at any time.</span>
                </div>
              </form>
            </>
          )}
          {showTermsOfUse === 2 && (
            <>
              <div
                className="m-4"
                style={{
                  color: "#0D2A53",
                  fontSize: "12px",
                }}
              >
                <div
                  className="d-flex justify-content-between m-2"
                  style={{ fontWeight: "500", color: "#0D2A53" }}
                >
                  <span>
                    <i
                      onClick={() => {
                        setShowTermsOfUse(1);
                      }}
                      className="fa-solid fa-arrow-left-long"
                      style={{
                        fontSize: "21px",
                        position: "absolute",
                        left: "17px",
                        top: "10px",
                        color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                      }}
                    ></i>
                  </span>
                  <span className="">
                    <RxCross2
                      onClick={() => {
                        props.onHide();
                        setShowTermsOfUse(1);
                      }}
                      fontSize={"1.5rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <h4
                  style={{
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  Terms of Use
                </h4>
                <div
                  style={{
                    color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                  }}
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla et est facilisis, malesuada tellus sed, tempor justo.
                    Donec nec enim mauris. Duis auctor arcu et neque malesuada
                    tristique. Sed ac sem nec metus ultrices tincidunt. Aenean
                    id nisl eget odio sollicitudin viverra. Cras quis tellus vel
                    ligula euismod dapibus. Integer eu rutrum eros. Sed
                    efficitur nulla id justo aliquet tempus. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Nulla et est
                    facilisis, malesuada tellus sed, tempor justo. Donec nec
                    enim mauris. Duis auctor arcu et neque malesuada tristique.
                    Sed ac sem nec metus ultrices tincidunt. Aenean id nisl eget
                    odio sollicitudin viverra. Cras quis tellus vel ligula
                    euismod dapibus. Integer eu rutrum eros. Sed efficitur nulla
                    id justo aliquet tempus. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Nulla et Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Nulla et est facilisis,
                    malesuada tellus sed, tempor justo. Donec nec enim mauris.
                    Duis auctor arcu et neque malesuada tristique. Sed ac sem
                    nec metus ultrices tincidunt. Aenean id nisl eget odio
                    sollicitudin viverra. Cras quis tellus vel ligula euismod
                    dapibus. Integer eu rutrum eros est facilisis, malesuada
                    tellus sed, tempor justo. Donec nec enim mauris. Duis auctor
                    arcu et neque malesuada tristique. Sed ac sem nec metus
                    ultrices tincidunt. Aenean id nisl eget odio sollicitudin
                    viverra. Cras quis tellus vel ligula euismod dapibus.
                    Integer eu rutrum eros. Sed efficitur nulla id justo aliquet
                    tempus.
                  </p>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                    onClick={() => {
                      setSelectCheckBox(true);
                      setShowTermsOfUse(1);
                    }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <SubscribeModal
        formData={formData}
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        commentatorUser={commentatorUser}
        text="renew"
        handleMambership={handleMambership}
        isRenewLoading={isLoading}
        isRenewTerms={selectCheckBox}
        preveiwProfilePic={preveiwProfilePic}
      />
    </>
  );
};

export default BecomeAEditorModal;
