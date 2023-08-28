import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CurrentTheme from "../../context/CurrentTheme";
import { RxCross2 } from "react-icons/rx";
import camera from "../../assets/camera-plus.svg";

const BecomeAEditorModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
          style={{ fontSize: "14px" }}
        >
          <span>
            <RxCross2
              onClick={props.onHide}
              fontSize={"1.5rem"}
              className={`${
                currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
              }`}
            />
          </span>
          <label htmlFor="update-profile">
            <div
              className="my-1 cursor"
              style={{
                backgroundColor: "#E6E6E6",
                borderRadius: "50%",
                height: "8rem",
                width: "8rem",
                display: preveiwProfilePic === null ? "block" : "none",
              }}
            >
              <img
                style={{
                  position: "absolute",
                  top: "2.34rem",
                  left: "2.4rem",
                }}
                src={camera}
                alt=""
              />
            </div>
            <img
              src={
                preveiwProfilePic === null
                  ? `http://127.0.0.1${""}`
                  : preveiwProfilePic
              }
              alt=""
              height={135}
              width={135}
              style={{
                objectFit: "cover",
                borderRadius: "50%  ",
                display: preveiwProfilePic !== null ? "block" : "none",
              }}
            />
          </label>
          <input type="file" name="" id="update-profile" className="d-none" accept="image/*"/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BecomeAEditorModal;
