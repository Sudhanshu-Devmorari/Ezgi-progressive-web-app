import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./SubscribeModal.css";
import CheckBoxDark from "../../assets/Checkbox Selected.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Unselected.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import football from "../../assets/Profile Card Football.svg";
import CurrentTheme from "../../context/CurrentTheme";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import PlanSelection from "../PlanSelection/PlanSelection";
import TermsOfUse from "../TermsOfUse/TermsOfUse";

const SubscribeModal = (props) => {
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

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
                      %67.6
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
                      256
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
                        src={profile}
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
                      <span className="">johndoe</span>
                      <span className="">Ankara/Turkey</span>
                      <span className="">22.04.2022</span>
                      <div className="">
                        <img src={basketball} alt="" height={40} width={40} />
                        <img src={football} alt="" height={40} width={40} />
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
                      256
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
                      256
                    </div>
                  </div>
                </div>

                <PlanSelection />
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
                    <div className="d-flex justify-content-center my-3">
                      <button
                        style={{ fontSize: "14px" }}
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-btn"
                            : "lightMode-btn"
                        } px-3 py-1`}
                      >
                        {props.text == "renew" ? "Renew " : "Checkout"}
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
          {ShowModal === 3 && <TermsOfUse hide={props.onHide} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscribeModal;
