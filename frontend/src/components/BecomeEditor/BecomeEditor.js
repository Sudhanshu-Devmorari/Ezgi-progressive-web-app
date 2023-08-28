import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./BecomeEditor.css";
import landingPage from "../../assets/landingPage.png";
import FAQEditor from "../FAQEditor/FAQEditor";
import BecomeAEditorModal from "../BecomeAEditorModal/BecomeAEditorModal";

const BecomeEditor = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div
        className="fw-bold my-1 d-flex flex-column editor-heading px-4"
        style={{ fontFamily: "Poppins" }}
      >
        <span style={{ color: "#0AC05E" }}>
          Editör{" "}
          <span
            style={{ color: currentTheme === "dark" ? "#E6E6E6" : "#313131" }}
          >
            ol,
          </span>
        </span>
        <span
          style={{ color: currentTheme === "dark" ? "#E6E6E6" : "#313131" }}
        >
          deneyimlerini paylaş,
        </span>
        <span style={{ color: "#0AC05E" }}>
          kazanmaya{" "}
          <span
            style={{ color: currentTheme === "dark" ? "#E6E6E6" : "#313131" }}
          >
            başla!
          </span>
        </span>
      </div>
      <div className="my-2 px-4">
        <img src={landingPage} alt="" className="img-fluid" />
      </div>
      <div
        className="d-flex justify-content-center my-4"
        style={{ fontSize: "15px" }}
      >
        <button
          onClick={() => setModalShow(true)}
          style={{
            border: "1px solid #00DE51",
            color: "#00DE51",
            borderRadius: "3px",
            backgroundColor: "transparent",
            padding: ".1rem .7rem",
            fontFamily: "Poppins",
          }}
        >
          Editör Profilini Oluştur
        </button>
      </div>
      <div className="">
        <FAQEditor />
      </div>
      <BecomeAEditorModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default BecomeEditor;
