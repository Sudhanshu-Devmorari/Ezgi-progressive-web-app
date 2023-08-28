import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./EditorBanner.css"
import football from '../../assets/Profile Card Football.svg'
import basketball from '../../assets/Profile Card Basketball.svg'
import { useNavigate } from "react-router-dom";

export const EditorBanner = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const navigate = useNavigate();
  return (
    <>
      <div className={`row g-0 bannerText font-responsive`}>
        <div
          className={`col-3`}
        >
          <div className={`${currentTheme === "dark" ? "dark-mode" : "light-mode"} gap-1 me-2 d-flex py-3 flex-column`}>
            <div className=" d-flex justify-content-center">Futbol</div>
            <div className="d-flex justify-content-center">
              <img src={football} alt="" height={50} width={50}/>
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#00C936" }}>2.655 </span>Yorum
              </span>
            </div>
          </div>
        </div>
        <div
          className={`col-3`}
        >
          <div className={`${currentTheme === "dark" ? "dark-mode" : "light-mode"} d-flex gap-1 me-2 py-3 flex-column`}>
            <div className="d-flex justify-content-center">Basketbol</div>
            <div className="d-flex justify-content-center">
            <img src={basketball} alt="" height={50} width={50}/>
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#FF9100" }}>2.655 </span>Yorum
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={()=>props.setSelectContent('become-editor')}
          className={`col-6 d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ color: "#D2DB08" }}
        >
          Become a Editor Banner
        </div>
      </div>
    </>
  );
};
