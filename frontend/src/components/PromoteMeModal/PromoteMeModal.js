import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./PromoteMeModal.css";
import { RxCross2 } from "react-icons/rx";
import { BsStar } from "react-icons/bs";
import CommentsPageModal from "../CommentsPageModal/CommentsPageModal";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CurrentTheme from "../../context/CurrentTheme";
import lightradio from "../../assets/Ellipse 217.svg";
import lightradioSelected from "../../assets/Ellipse 58.svg";
import darkradioSelected from "../../assets/Ellipse 217 (1).svg";
import darkradio from "../../assets/Ellipse 216.svg";
import PromoteMeSubScription from "./PromoteMeSubScription";
import TermsOfUse from "../TermsOfUse/TermsOfUse";
import config from "../../config";
import axios from "axios";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import { ref, transcationQueryAPI } from "../GetRefNo";

const PromoteMeModal = (props) => {
  const [commentsModalShow, setCommentsModalShow] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);
  const [planSelected, setplanSelected] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowModal(7);
  }, []);

  const { commentatorUser } = props;

  const [isHighlightLoading, setIsHighlightLoading] = useState(false);
  const [highlightPlan, setHighlightPlan] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        setIsHighlightLoading(true);
        const res = await axios.get(
          `${
            config?.apiUrl
          }/highlight-setting/?commentator_level=${commentatorUser?.commentator_level?.toLowerCase()}`
        );
        if (res.status === 200) {
          const data = res?.data[0];
          setHighlightPlan(data);
          setIsHighlightLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    commentatorUser?.commentator_level && getData();
  }, [commentatorUser]);

  const handleHighlight = async () => {
    if (selectCheckBox && selectedPlan) {
      setValidationError("");
      const money =
        (selectedPlan === "1 Month" && highlightPlan?.month_1) ||
        (selectedPlan === "1 Week" && highlightPlan?.week_1) ||
        (selectedPlan === "2 Week" && highlightPlan?.week_2);
      try {
        setIsLoading(true);

        const checkHighlightPlan = await axios.get(
          `${config.apiUrl}/highlight-purchase/?id=${userId}`
        );

        if (checkHighlightPlan?.status === 200) {
          const payment_res = await axios.post(`${config.apiUrl}/payment/`, {
            payment: "highlight",
            duration: selectedPlan,
            amount: money,
            id: userId,
          });
          console.log(payment_res, "==========payment_res");

          if (payment_res.status === 200) {
            const url = payment_res?.data?.URL_3DS;
            window.location.replace(url);
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
    } else {
      setValidationError("Please select a Plan or Checkbox");
    }
  };

  const promoteMeEntry = async (amount, duration) => {
    try {
      const res = await axios.post(`${config.apiUrl}/highlight-purchase/`, {
        duration: duration,
        amount: amount,
        id: userId,
      });
      if (res?.status === 200) {
        Swal.fire({
          title: "Success",
          text: `You've successfully purchase highlight.`,
          icon: "sucess",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.replace("/");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ref_no = ref();
  useEffect(() => {
    async function testPurchase() {
      try {
        const result = await transcationQueryAPI(ref_no);
        if (result?.STATUS === "SUCCESS" && result?.RETURN_CODE === "0") {
          console.log("payment succesffull");
          const category = result?.PRODUCTS[0]?.PRODUCT_CATEGORY;
          if (category === "highlight") {
            const duration = result?.PRODUCTS[0]?.PRODUCT_NAME;
            const amount = result?.PRODUCTS[0]?.PRODUCT_AMOUNT;
            promoteMeEntry(amount, duration);
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
                  setSelectedPlan("");
                  setSelectCheckBox(false);
                  props.onHide();
                  setShowModal(7);
                }}
                fontSize={"1.8rem"}
                className={`${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
              />
            </span>
            {ShowModal !== 3 && (
              <>
                <div className="">
                  <div className="text-center">
                    <div className="my-3" style={{ color: "#FFDD00" }}>
                      <div className="">
                        <BsStar fontSize={"2rem"} />
                      </div>
                      <span>
                        <BsStar fontSize={"1.7rem"} className="me-4" />
                        <BsStar fontSize={"1.7rem"} />
                      </span>
                    </div>
                    <div
                      className=""
                      style={{
                        color: currentTheme === "dark" ? "#E6E6E6" : "#00659D",
                      }}
                    >
                      <h1>Highlights</h1>
                      <h2>
                        Stand out among the best increase your interactions!
                      </h2>
                    </div>
                  </div>
                </div>

                <PromoteMeSubScription
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  highlightPlan={highlightPlan}
                  isHighlightLoading={isHighlightLoading}
                />
                <div className="">
                  {selectedPlan && (
                    <div className="text-center my-2">
                      <div>Total Amount</div>
                      <div style={{ fontSize: "19px" }}>
                        {(selectedPlan === "1 Week" && highlightPlan?.week_1) ||
                          (selectedPlan === "2 Week" &&
                            highlightPlan?.week_2) ||
                          (selectedPlan === "1 Month" &&
                            highlightPlan?.month_1)}
                        ₺
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="my-3" style={{ fontSize: "13px" }}>
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
                        onClick={handleHighlight}
                        style={{ fontSize: "14px" }}
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-btn"
                            : "lightMode-btn"
                        } px-3 py-1`}
                      >
                        {isLoading ? "Loading..." : "Checkout"}
                      </button>
                    </div>
                    <div className="text-center" style={{ fontSize: "11px" }}>
                      <div className="">
                        <p>
                          With Highlights, your profile and contents will be
                          prominently displayed at the top of the lists for the
                          duration of the plan you purchased.
                        </p>
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

      <CommentsPageModal
        show={commentsModalShow}
        onHide={() => setCommentsModalShow(false)}
      />
    </>
  );
};

export default PromoteMeModal;
