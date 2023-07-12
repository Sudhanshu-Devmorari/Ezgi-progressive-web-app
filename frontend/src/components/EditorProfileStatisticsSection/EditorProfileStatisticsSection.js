import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "./EditorProfileStatisticsSection.css";
import londonFlag from "../../assets/London_flag.png"

const EditorProfileStatisticsSection = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [SelectSport, setSelectSport] = useState("football");
  return (
    <>
      <div
        className={` ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } p-2 pb-5`}
      >
        <div className="text-end">
          <span
            style={{ color: SelectSport === "football" && "#D2DB08" }}
            onClick={() => setSelectSport("football")}
          >
            Football
          </span>
          <span
            className="ps-2"
            style={{ color: SelectSport === "basketball" && "#D2DB08" }}
            onClick={() => setSelectSport("basketball")}
          >
            Basketball
          </span>
        </div>
        <div className="my-2">
          <div className="my-2">Comments Type</div>
          <div className="row g-0 my-2 gap-4">
            <div className="col">
              {/* <div style={{ width: 73, height: 73 }}> */}
                <CircularProgressbar strokeWidth={5} value={62} text="%62" styles={{ path:{stroke:"#37FF80" ,}}}/>
              {/* </div> */}
            </div>
            <div className="col">
              {/* <div style={{ width: 73, height: 73 }}> */}
                <CircularProgressbar strokeWidth={5} value={62} text="%62" styles={{path:{stroke:"#4DD5FF" ,}}}/>
              {/* </div> */}
            </div>
            <div className="col" label="Stroke width">
              {/* <div style={{ width: 73, height: 73 }}> */}
                <CircularProgressbar strokeWidth={5} value={62} text="%62" styles={{path:{stroke:"#951AFF" ,}}}/>
              {/* </div> */}
            </div>
            <div className="col">
              {/* <div style={{ width: 73, height: 73 }}> */}
                <CircularProgressbar strokeWidth={5} value={62} text="%62" styles={{ path:{stroke:"#FFCC00" ,}}} />
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="my-4">
            <span className="my-2">Comments Journey</span>
        </div>
        <div className="mb-2 mt-3">
            <div className="my-2 pb-1">Countries - Leagues</div>
            <div className="d-flex justify-content-between">
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-2 my-3">
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
                <div className="" style={{fontSize:"14px", backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", borderRadius:"13px"}}>
                    <img className="flag-responsive" src={londonFlag} alt="" height={25} width={25}/>
                    <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
                </div>
            </div>            

        </div>

      </div>
    </>
  );
};

export default EditorProfileStatisticsSection;