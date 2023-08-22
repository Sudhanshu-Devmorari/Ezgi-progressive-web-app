import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CurrentTheme from "../../context/CurrentTheme";
import buletick from "../../assets/blueTick.png";
import crossLight from "../../assets/crossLight.svg";
import crossDark from "../../assets/crossDark.svg";
import "./VerificationModal.css";

const VerificationModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } p-2`}
        >
          <div className="d-flex justify-content-end">
            <img
              onClick={props.onHide}
              src={currentTheme === "dark" ? crossDark : crossLight}
              alt=""
              height={29}
              width={29}
            />
          </div>
          <div
            className="d-flex justify-content-center flex-column align-items-center"
            style={{ fontSize: "14px" }}
          >
            <img src={buletick} alt="" height={50} width={50} />
            <p className="text-center">Doğrulanmış Hesap Rozeti</p>
            <p className="text-center">
              Doğrulanmış hesap rozeti talep edebilmen için hesabın uygun değil.
            </p>
            <p className="text-center">
              En az 3 aylık aktif üyeliğinin bulunması ve 250+ aboneye ulaşmış
              olman gerekmektedir. Gereksinimleri karşıladığında tekrar talepte
              bulunabilirsin.
            </p>
            <button
              onClick={props.onHide}
              className="px-2 py-1 my-2 mb-3"
              style={{
                color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                border:
                  currentTheme === "dark"
                    ? "1px solid  #D2DB08"
                    : "1px solid #00659D",
                borderRadius: "3px",
                backgroundColor: "transparent",
              }}
            >
              Tamam
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerificationModal;
