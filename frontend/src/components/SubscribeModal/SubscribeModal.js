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

const SubscribeModal = (props) => {
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [validationError, setValidationError] = useState("");

  const { commentatorUser } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (selectCheckBox && selectedPlan) {
      setValidationError("");
      const money =
        (selectedPlan === "1 Year" && subscriptionPlan?.year_1) ||
        (selectedPlan === "1 Month" && subscriptionPlan?.month_1) ||
        (selectedPlan === "3 Month" && subscriptionPlan?.month_3) ||
        (selectedPlan === "6 Month" && subscriptionPlan?.month_6);
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${config.apiUrl}/subscription/${userId}/`,
          {
            duration: selectedPlan,
            money: money,
            commentator_id: commentatorUser?.id,
          }
        );
        if (res?.status === 200) {
          setIsLoading(false);
          props.onHide();
          Swal.fire({
            title: "Success",
            text: `You've subscribe to ${commentatorUser?.username}`,
            icon: "sucess",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
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

    commentatorUser?.commentator_level && getData();
  }, []);

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
                      %{commentatorUser?.success_rate}
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
                      {commentatorUser?.win}
                    </div>
                  </div>
                  <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                    <div className="position-relative">
                      <img
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
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        src={
                          commentatorUser?.profile_pic
                            ? `${config.apiUrl}${commentatorUser.profile_pic}`
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
                      <span className="">{moment(commentatorUser?.created).format("DD.MM.YYYY")}</span>
                      <div className="">
                        {commentatorUser?.category?.some((categoryItem) =>
                          categoryItem.includes("Basketball")
                        ) && (
                          <img src={basketball} alt="" height={40} width={40} />
                        )}
                        {commentatorUser?.category?.some((categoryItem) =>
                          categoryItem.includes("Football")
                        ) && (
                          <img src={football} alt="" height={40} width={40} />
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
                      {commentatorUser?.score_points}
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
                      {commentatorUser?.lose}
                    </div>
                  </div>
                </div>

                <PlanSelection
                  isSubscriptionLoading={isSubscriptionLoading}
                  text={props?.text}
                  subscriptionPlan={subscriptionPlan}
                  setSelectedPlan={setSelectedPlan}
                  selectedPlan={selectedPlan}
                />
                <div className="">
                  {selectedPlan && (
                    <div className="text-center my-2">
                      <div>Total Amount</div>
                      <div style={{ fontSize: "19px" }}>
                        {(selectedPlan === "1 Year" &&
                          subscriptionPlan?.year_1) ||
                          (selectedPlan === "1 Month" &&
                            subscriptionPlan?.month_1) ||
                          (selectedPlan === "3 Month" &&
                            subscriptionPlan?.month_3) ||
                          (selectedPlan === "6 Month" &&
                            subscriptionPlan?.month_6)}
                        ₺
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="my-3" style={{ fontSize: "13px" }}>
                      {currentTheme === "dark" ? (
                        <img
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
                        onClick={handleSubscription}
                        style={{ fontSize: "14px" }}
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-btn"
                            : "lightMode-btn"
                        } px-3 py-1`}
                      >
                        {props.text == "renew"
                          ? "Renew "
                          : isLoading
                          ? "Loading"
                          : "Checkout"}
                      </button>
                    </div>
                    <div className="text-center" style={{ fontSize: "12px" }}>
                      <div className="">
                        Subscription plans do not renew automatically.
                      </div>
                      <div className="">
                        You can cancel the subscription at any time.
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
