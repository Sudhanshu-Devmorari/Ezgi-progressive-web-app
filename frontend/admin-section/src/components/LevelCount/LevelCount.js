import React from "react";
import expertCrown from "../../assets/MDI - crown-circle-outline.png";
import grandMasterCrown from "../../assets/MDI - crown-circle-outline1.png";
import journeymanCrown from "../../assets/MDI - crown-circle-outline2.png";
import apprenticeCrown from "../../assets/MDI - crown-circle-outline (1).png";
import "./LevelCount.css";

const LevelCount = (props) => {
  const levelArray = [
    {
      name: "Apprentice",
      img: apprenticeCrown,
      count: "127",
    },
    {
      name: "Journeyman",
      img: journeymanCrown,
      count: "127",
    },
    {
      name: "Expert",
      img: expertCrown,
      count: "127",
    },
    {
      name: "Grandmaster",
      img: grandMasterCrown,
      count: "127",
    },
  ];

  return (
    <>
      <div
        className={`${"dark-mode h-100 d-flex justify-content-center me-3 gap-ceown"} `}
      >
        {levelArray.map((res, index) => (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              className="crown-level-img"
              src={res.img}
              alt=""
              height={60}
              width={60}
            />
            <span className="level-font" style={{ fontSize: "1.5rem" }}>
              {res.name}
            </span>
            <span className="level-count-font" style={{ fontSize: "2.7rem" }}>
              {res.count}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default LevelCount;
