import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./SubscribeRenewModal.css";
import PromoteMeModal from "../PromoteMeModal/PromoteMeModal";
import { currentTheme } from "../GetCurrentTheme";
import CheckBoxDark from "../../assets/CheckBoxDark.svg";
import CheckBoxSelectDark from "../../assets/CheckBoxSelectDark.svg";

const SubscribeRenewModal = (props) => {
  const [promoteMeShow, setPromoteMeShow] = useState();
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
              <div className="row">
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div
                    className="p-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    Success Rate
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#D2DB08",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    %67.6
                  </div>
                  <div className="">
                    <span
                      className="px-3 py-1"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      }}
                    >
                      Win
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#37FF80",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
                  </div>
                </div>
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div className="">
                    <img src={profile} width={75} height={75} alt="" />
                    <img
                      src={crown}
                      width={25}
                      height={25}
                      className="crown-img"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className="fs-5">johndoe</div>
                    <div className="">Ankara/Turkey</div>
                    <div className="">22.04.2022</div>
                    <div className="">
                      <CiBasketball
                        style={{ color: "#FF9100" }}
                        fontSize={"1.8rem"}
                      />
                      <RiFootballLine
                        style={{ color: "#00C936" }}
                        fontSize={"1.8rem"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div
                    className="p-1"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    Score Points
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#FF9100",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
                  </div>
                  <div className="">
                    <span
                      className="px-3 py-1"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      }}
                    >
                      Lose
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#FF5757",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="fs-4 my-2">Subscription Plans</div>
                <div className="d-flex mb-2">
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "BlankCircle-dark-mode"
                        : "BlankCircle-light-mode"
                    } me-2`}
                  ></div>
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
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "BlankCircle-dark-mode"
                        : "BlankCircle-light-mode"
                    } me-2`}
                  ></div>
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
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "FilledCircle-dark-mode"
                        : "FilledCircle-light-mode"
                    } me-2`}
                  ></div>
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
                      onClick={() => setPromoteMeShow(true)}
                    >
                      Renew
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="">
                      Subscription plans do not renew automatically.
                    </div>
                    <div className="">
                      You can cancel the subscription at any time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <PromoteMeModal
        show={promoteMeShow}
        onHide={() => setPromoteMeShow(false)}
      />
    </>
  );
};

export default SubscribeRenewModal;
