import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./SubscribeModal.css";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import football from "../../assets/Profile Card Football.svg";
import CurrentTheme from "../../context/CurrentTheme";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import PlanSelection from "../PlanSelection/PlanSelection";
import TermsOfUse from "../TermsOfUse/TermsOfUse";
import axios from "axios";
import config from "../../config";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import moment from "moment";
import { ref, transcationQueryAPI } from "../GetRefNo";
import { currentTheme } from "../GetCurrentTheme";

const SubscribeModal = (props) => {
  const {
    commentatorUser,
    handleMambership,
    isRenewLoading,
    isRenewTerms,
    preveiwProfilePic,
    setMembershipData,
  } = props;
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  useEffect(() => {
    isRenewTerms && setSelectCheckBox(isRenewTerms);
  }, [isRenewTerms]);

  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [validationError, setValidationError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (selectCheckBox && selectedPlan) {
      setValidationError("");
      const money =
        (selectedPlan === "1 Year" && subscriptionPlan?.year_1) ||
        (selectedPlan === "1 Months" && subscriptionPlan?.month_1) ||
        (selectedPlan === "3 Months" && subscriptionPlan?.month_3) ||
        (selectedPlan === "6 Months" && subscriptionPlan?.month_6);
      try {
        setIsLoading(true);
        const payment_res = await axios.post(`${config.apiUrl}/payment/`, {
          payment: "subscription",
          duration: selectedPlan,
          amount: money,
          id: commentatorUser?.id,
          commentator_username: commentatorUser?.username,
        });
        console.log(payment_res, "==========payment_res");

        if (payment_res.status === 200) {
          const url = payment_res?.data?.URL_3DS;
          window.location.replace(url);
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
    } else {
      setValidationError("Please select a Plan or Checkbox");
    }
  };

  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState([]);
  const [renewPlan, setRenewPlan] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        setIsSubscriptionLoading(true);
        const res = await axios.get(
          `${
            config?.apiUrl
          }/subscription-setting/?commentator_level=${commentatorUser?.commentator_level?.toLowerCase()}`
        );
        if (res.status === 200) {
          const data = res?.data[0];
          setSubscriptionPlan(data);
          setIsSubscriptionLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function getRenewData() {
      const level =
        commentatorUser?.commentator_level == null
          ? "apprentice"
          : commentatorUser?.commentator_level;
      try {
        setIsSubscriptionLoading(true);
        const res = await axios.get(
          `${
            config?.apiUrl
          }/membership-setting/?commentator_level=${level?.toLowerCase()}`
        );
        if (res.status === 200) {
          const data = res?.data[0];
          setRenewPlan(data);
          setIsSubscriptionLoading(false);
          setMembershipData && setMembershipData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (props?.text === "renew") {
      getRenewData();
    } else {
      commentatorUser?.commentator_level && getData();
    }
  }, [commentatorUser?.commentator_level]);

  useEffect(() => {
    setSelectedPlan(renewPlan?.promotion_duration);
  }, [props?.text, renewPlan?.promotion_duration]);

  const handleRenew = async () => {
    try {
      const checkMembership = await axios.get(
        `${config.apiUrl}/subscription-reNew/${userId}/`
      );

      const formData = new FormData();

      if (checkMembership?.status === 200) {
        formData.append("payment", "membership renew");
        formData.append("duration", checkMembership.data.duration);
        formData.append("amount", checkMembership.data.money);
        formData.append("id", userId);

        const payment_res = await axios.post(`${config.apiUrl}/payment/`, 
        formData);
        // console.log(payment_res, "==========payment_res");

        if (payment_res.status === 200) {
          const url = payment_res?.data?.URL_3DS;
          // console.log("URL: ", url)
          window.location.replace(url);
        }
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 500) {
        // setIsLoading(false);
        props?.onHide();
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
        // setIsLoading(false);
        props?.onHide();
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
          if (category === "membership renew") {
            const category = result?.PRODUCTS[1]?.PRODUCT_CATEGORY
            const experience = result?.PRODUCTS[1]?.PRODUCT_NAME
            const monthly_amount = result?.PRODUCTS[0]?.PRODUCT_AMOUNT
            const duration = result?.PRODUCTS[0]?.PRODUCT_NAME
            const startdate = result?.PAYMENT_DATE
            // handleMambership(category, experience, monthly_amount, duration, startdate);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (ref_no) {
      testPurchase();
    }
  }, [ref_no]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
        >
          <div className="">
            <span className="mb-2">
              <RxCross2
                onClick={() => {
                  setSelectCheckBox(false);
                  setSelectedPlan(null);
                  setValidationError("");
                  props.onHide();
                  setShowModal(1);
                }}
                fontSize={"1.8rem"}
                className={`${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
              />
            </span>
            {ShowModal !== 3 && (
              <>
                <div className="row">
                  <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                    <div
                      className="p-1"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                        fontSize: "13px",
                      }}
                    >
                      Success Rate
                    </div>
                    <div
                      className=""
                      style={{
                        color: "#D2DB08",
                        fontSize: "1.3rem",
                      }}
                    >
                      %{commentatorUser?.success_rate || 0}
                    </div>
                    <div className="">
                      <span
                        className="px-3 py-1"
                        style={{
                          backgroundColor:
                            currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          fontSize: "13px",
                        }}
                      >
                        Win
                      </span>
                    </div>
                    <div
                      className=""
                      style={{
                        color: "#37FF80",
                        fontSize: "1.3rem",
                      }}
                    >
                      {commentatorUser?.win || 0}
                    </div>
                  </div>
                  <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                    <div className="position-relative">
                      <img
                        onContextMenu={(e) => e.preventDefault()}
                        src={crown}
                        alt=""
                        height={27}
                        width={27}
                        className="crown-img"
                        style={{
                          backgroundColor:
                            currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                          borderRadius: "50%",
                          top: "1.8rem",
                          right: "0.35rem",
                          position: "absolute",
                        }}
                      />
                      <img
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        src={
                          commentatorUser?.profile_pic
                            ? `${config.apiUrl}${commentatorUser.profile_pic}`
                            : preveiwProfilePic
                            ? preveiwProfilePic
                            : profile
                        }
                        width={105}
                        height={105}
                        alt=""
                        className="responsive-profile"
                      />
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ fontSize: "15px" }}
                    >
                      <span className="">{commentatorUser?.username}</span>
                      <span className="">{commentatorUser?.city}</span>
                      <span className="">
                        {moment(commentatorUser?.created).format("DD.MM.YYYY")}
                      </span>
                      <div className="">
                        {commentatorUser?.category?.some((categoryItem) =>
                          categoryItem.includes("Basketball")
                        ) && (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={basketball}
                            alt=""
                            height={40}
                            width={40}
                          />
                        )}
                        {commentatorUser?.category?.some((categoryItem) =>
                          categoryItem.includes("Football")
                        ) && (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={football}
                            alt=""
                            height={40}
                            width={40}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                    <div
                      className="p-1"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                        fontSize: "13px",
                      }}
                    >
                      Score Points
                    </div>
                    <div
                      className=""
                      style={{
                        color: "#FF9100",
                        fontSize: "1.3rem",
                      }}
                    >
                      {commentatorUser?.score_points || 0}
                    </div>
                    <div className="">
                      <span
                        className="px-3 py-1"
                        style={{
                          backgroundColor:
                            currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          fontSize: "13px",
                        }}
                      >
                        Lose
                      </span>
                    </div>
                    <div
                      className=""
                      style={{
                        color: "#FF5757",
                        fontSize: "1.3rem",
                      }}
                    >
                      {commentatorUser?.lose || 0}
                    </div>
                  </div>
                </div>

                <PlanSelection
                  renewPlan={renewPlan}
                  isSubscriptionLoading={isSubscriptionLoading}
                  text={props?.text}
                  subscriptionPlan={subscriptionPlan}
                  setSelectedPlan={setSelectedPlan}
                  selectedPlan={selectedPlan}
                  commentatorUser={commentatorUser}
                />
                <div className="">
                  {props?.text === "renew" ? (
                    <>
                      {selectedPlan && (
                        <div className="text-center my-2">
                          <div>Total Amount</div>
                          <div style={{ fontSize: "19px" }}>
                            {renewPlan?.plan_price -
                              renewPlan?.plan_price *
                                (renewPlan?.promotion_rate / 100)}
                            ₺
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedPlan && (
                        <div className="text-center my-2">
                          <div>Total Amount</div>
                          <div style={{ fontSize: "19px" }}>
                            {(selectedPlan === "1 Year" &&
                              subscriptionPlan?.year_1) ||
                              (selectedPlan === "1 Months" &&
                                subscriptionPlan?.month_1) ||
                              (selectedPlan === "3 Months" &&
                                subscriptionPlan?.month_3) ||
                              (selectedPlan === "6 Months" &&
                                subscriptionPlan?.month_6)}
                            ₺
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="text-center">
                    <div
                      className={`${validationError && "mb-0"} 'my-3'`}
                      style={{ fontSize: "13px" }}
                    >
                      {currentTheme === "dark" ? (
                        <img
                          onContextMenu={(e) => e.preventDefault()}
                          alt=""
                          src={
                            !selectCheckBox ? CheckBoxDark : CheckBoxSelectDark
                          }
                          style={{ width: "25px", cursor: "pointer" }}
                          className="me-2"
                          onClick={() => setSelectCheckBox(!selectCheckBox)}
                        />
                      ) : (
                        <img
                          onContextMenu={(e) => e.preventDefault()}
                          src={
                            !selectCheckBox
                              ? CheckBoxLight
                              : CheckBoxSelectLight
                          }
                          style={{ width: "25px", cursor: "pointer" }}
                          className="me-2"
                          onClick={() => setSelectCheckBox(!selectCheckBox)}
                          alt=""
                        />
                      )}
                      I have read and agree to the{" "}
                      <span
                        style={{
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                        }}
                        onClick={() => {
                          setShowModal(3);
                        }}
                      >
                        Terms of use
                      </span>
                    </div>
                    <small className="text-danger">{validationError}</small>
                    <div className="d-flex justify-content-center my-3">
                      <button
                        onClick={() =>
                          {
                            // props.text == 'renew'&& handleRenew()
                          props.text == "renew"
                            ? handleMambership(
                                renewPlan?.promotion_duration,
                                renewPlan?.plan_price
                              )
                            : handleSubscription()
                            }
                            
                        }
                        style={{ fontSize: "14px" }}
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-btn"
                            : "lightMode-btn"
                        } px-3 py-1`}
                      >
                        {props.text == "renew"
                          ? isRenewLoading
                            ? "Loading..."
                            : "Renew"
                          : isLoading
                          ? "Loading"
                          : "Checkout"}
                      </button>
                    </div>
                    <div className="text-center" style={{ fontSize: "12px" }}>
                      <div className="">
                        {props.text == "renew" ? "Membership" : "Subscription"}{" "}
                        plans do not renew automatically.
                      </div>
                      <div className="">
                        You can cancel the{" "}
                        {props.text == "renew" ? "membership" : "subscription"}{" "}
                        at any time.
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {ShowModal === 3 && (
            <TermsOfUse
              hide={props.onHide}
              setSelectCheckBox={setSelectCheckBox}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscribeModal;

  // Save the subscription entry to DB when successful payment is received
  export const subcriptionEntry = async (
    amount,
    duration,
    commentator_user_id,
    commentator_username
  ) => {
    try {
      const res = await axios.post(`${config.apiUrl}/subscription/${userId}/`, {
        duration: duration,
        money: amount,
        commentator_id: commentator_user_id,
      });
      if (res?.status === 200) {
        await Swal.fire({
          title: "Success",
          text: `You've subscribe to ${commentator_username}`,
          icon: "sucess",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.replace("/");
            // After successful payment 
            // window.history.replaceState(null, null, "/");
            // window.history.pushState(null, null, "/");
            // window.location.reload()


          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
