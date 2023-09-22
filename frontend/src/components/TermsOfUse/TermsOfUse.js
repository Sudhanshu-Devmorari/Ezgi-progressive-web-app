import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";

const TermsOfUse = (props) => {
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);
  return (
    <>
      <div
        className="m-4"
        style={{
          color: "#0D2A53",
          fontSize: "12px",
        }}
      >
        <div
          className="d-flex justify-content-between m-2"
          style={{ fontWeight: "500", color: "#0D2A53" }}
        >
          <span>
            <i
              onClick={() => {
                setShowModal(2);
              }}
              className="fa-solid fa-arrow-left-long"
              style={{
                fontSize: "21px",
                position: "absolute",
                left: "17px",
                top: "10px",
                color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
              }}
            ></i>
          </span>
          {/* <span className="">
            <RxCross2
              onClick={() => {
                props.hide();
              }}
              fontSize={"1.8rem"}
              className={`${
                currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
              }`}
            />
          </span> */}
        </div>
        <h4
          style={{
            color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
          }}
        >
          Terms of Use
        </h4>
        <div
          style={{
            color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
            est facilisis, malesuada tellus sed, tempor justo. Donec nec enim
            mauris. Duis auctor arcu et neque malesuada tristique. Sed ac sem
            nec metus ultrices tincidunt. Aenean id nisl eget odio sollicitudin
            viverra. Cras quis tellus vel ligula euismod dapibus. Integer eu
            rutrum eros. Sed efficitur nulla id justo aliquet tempus. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla et est
            facilisis, malesuada tellus sed, tempor justo. Donec nec enim
            mauris. Duis auctor arcu et neque malesuada tristique. Sed ac sem
            nec metus ultrices tincidunt. Aenean id nisl eget odio sollicitudin
            viverra. Cras quis tellus vel ligula euismod dapibus. Integer eu
            rutrum eros. Sed efficitur nulla id justo aliquet tempus. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla et Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla et est
            facilisis, malesuada tellus sed, tempor justo. Donec nec enim
            mauris. Duis auctor arcu et neque malesuada tristique. Sed ac sem
            nec metus ultrices tincidunt. Aenean id nisl eget odio sollicitudin
            viverra. Cras quis tellus vel ligula euismod dapibus. Integer eu
            rutrum eros est facilisis, malesuada tellus sed, tempor justo. Donec
            nec enim mauris. Duis auctor arcu et neque malesuada tristique. Sed
            ac sem nec metus ultrices tincidunt. Aenean id nisl eget odio
            sollicitudin viverra. Cras quis tellus vel ligula euismod dapibus.
            Integer eu rutrum eros. Sed efficitur nulla id justo aliquet tempus.
          </p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`${
              currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
            } px-3 py-1`}
            onClick={() => {
              if (props?.setSelectCheckBox) {
                props?.setSelectCheckBox(true);
              }
              setShowModal(2);
            }}
          >
            Approve
          </button>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
