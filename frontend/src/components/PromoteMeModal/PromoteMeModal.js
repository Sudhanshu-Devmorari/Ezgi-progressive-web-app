import React, { useContext, useState } from "react";
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

const PromoteMeModal = (props) => {
  const [commentsModalShow, setCommentsModalShow] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [planSelected, setplanSelected] = useState(false);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
        >
          <div>
            <div className="">
              <span className="mb-2">
                <RxCross2
                  onClick={() => {
                    props.onHide();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
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
              <div className="my-2">
                <div className="my-2">Subscription Plans</div>
                <div className="d-flex mb-2">
                  <img
                    onClick={() => setplanSelected(!planSelected)}
                    src={
                      currentTheme === "dark"
                        ? planSelected
                          ? darkradioSelected
                          : darkradio
                        : planSelected
                        ? lightradioSelected
                        : lightradio
                    }
                    alt=""
                    height={28}
                    width={28}
                  />
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>1 Month</span>
                    <span style={{ fontSize: "19px" }}>69.90₺</span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <img
                    onClick={() => setplanSelected(!planSelected)}
                    src={
                      currentTheme === "dark"
                        ? planSelected
                          ? darkradioSelected
                          : darkradio
                        : planSelected
                        ? lightradioSelected
                        : lightradio
                    }
                    alt=""
                    height={28}
                    width={28}
                  />
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>1 Month</span>
                    <span style={{ fontSize: "19px" }}>69.90₺</span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <img
                    onClick={() => setplanSelected(!planSelected)}
                    src={
                      currentTheme === "dark"
                        ? planSelected
                          ? darkradioSelected
                          : darkradio
                        : planSelected
                        ? lightradioSelected
                        : lightradio
                    }
                    alt=""
                    height={28}
                    width={28}
                  />
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>1 Month</span>
                    <span style={{ fontSize: "19px" }}>
                      <span className="pe-2" style={{ color: "#7BFFAB" }}>
                        %20 Save!
                      </span>
                      69.00₺
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-center my-2">
                  <div>Total Amount</div>
                  <div style={{ fontSize: "19px" }}>329.90₺</div>
                </div>
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
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                      onClick={() => {
                        props.setShowModal(3);
                      }}
                    >
                      Terms of use
                    </span>
                  </div>
                  <div className="d-flex justify-content-center my-3">
                    <button
                      style={{ fontSize: "14px" }}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-btn"
                          : "lightMode-btn"
                      } px-3 py-1`}
                    >
                      Checkout
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
            </div>
          </div>
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
