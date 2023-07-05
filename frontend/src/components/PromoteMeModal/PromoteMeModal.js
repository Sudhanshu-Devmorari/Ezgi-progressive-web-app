import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./PromoteMeModal.css";
import { RxCross2 } from "react-icons/rx";
import { BsStar } from "react-icons/bs";
import CommentsPage from "../CommentsPage/CommentsPage";
import { currentTheme } from "../GetCurrentTheme";
import CheckBoxDark from "../../assets/CheckBoxDark.svg";
import CheckBoxSelectDark from "../../assets/CheckBoxSelectDark.svg";

const PromoteMeModal = (props) => {
  const [commentsModalShow, setCommentsModalShow] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);

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
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
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
                  <div className="" style={{ color: currentTheme === "dark" ? "#E6E6E6" : "#00659D" }}>
                    <h1>Highlights</h1>
                    <h2>
                      Stand out among the best increase your interactions!
                    </h2>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="fs-4 my-2">Subscription Plans</div>
                <div className="d-flex mb-2">
                  <div className={`${
                      currentTheme === "dark"
                        ? "BlankCircle-dark-mode"
                        : "BlankCircle-light-mode"
                    } me-2`}></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      69.90
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className={`${
                      currentTheme === "dark"
                        ? "BlankCircle-dark-mode"
                        : "BlankCircle-light-mode"
                    } me-2`}></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      69.90
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="FilledCircle me-2"></div>
                  <div className={`${
                      currentTheme === "dark"
                        ? "FilledCircle-dark-mode"
                        : "FilledCircle-light-mode"
                    } me-2`}></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      <span className="pe-2" style={{ color: "#7BFFAB" }}>
                        %20 Save!
                      </span>
                      69.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-center my-2">
                  <div className="fs-5">Total Amount</div>
                  <div className="fs-5" style={{ fontWeight: "600" }}>
                    329.90
                  </div>
                </div>
                <div className="text-center">
                <div className="my-3">
                    <img
                      src={!selectCheckBox ? CheckBoxDark : CheckBoxSelectDark}
                      style={{ width: "25px", cursor: "pointer" }}
                      className="me-2"
                      onClick={() => setSelectCheckBox(!selectCheckBox)}
                      alt=""
                    />
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
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-btn"
                          : "lightMode-btn"
                      } px-3 py-1`}
                      onClick={() => setCommentsModalShow(true)}
                    >
                      Checkout
                    </button>
                  </div>
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
        </Modal.Body>
      </Modal>

      <CommentsPage
        show={commentsModalShow}
        onHide={() => setCommentsModalShow(false)}
      />
    </>
  );
};

export default PromoteMeModal;
