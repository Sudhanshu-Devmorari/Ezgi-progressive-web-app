import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./BecomeEditor.css";
import landingPage from "../../assets/landingPage.png";
import FAQEditor from "../FAQEditor/FAQEditor";
import BecomeAEditorModal from "../BecomeAEditorModal/BecomeAEditorModal";
import Swal from "sweetalert2";

const BecomeEditor = ({ profileData }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  const user_role = localStorage.getItem("user-role");
  const errorSwal = () => {
    // console.log(localStorage.getItem("user-active"))

    Swal.fire({
      title: "Error",
      text: `Your account has been deactivated. Contact support for assistance.`,
      icon: "error",
      backdrop: false,
      customClass:
        currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    });
  };

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
        <img
          src={landingPage}
          alt=""
          className="img-fluid"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      {user_role !== "commentator" && (
        <div
          className="d-flex justify-content-center my-4"
          style={{ fontSize: "15px" }}
        >
          <button
            onClick={() => {
              if (JSON.parse(localStorage.getItem("user-active")) == false) {
                errorSwal();
                return;
              }
              setModalShow(true);
            }}
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
      )}
      <FAQEditor />
      <BecomeAEditorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        profileData={profileData}
      />
    </>
  );
};

export default BecomeEditor;
