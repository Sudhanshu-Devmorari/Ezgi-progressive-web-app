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
      count: `${props?.data?.apprentice_count}`,
    },
    {
      name: "Journeyman",
      img: journeymanCrown,
      count: `${props?.data?.journeyman_count}`,
    },
    {
      name: "Expert",
      img: expertCrown,
      count: `${props?.data?.master_count}`,
    },
    {
      name: "Grandmaster",
      img: grandMasterCrown,
      count: `${props?.data?.grandmaster_count}`,
    },
  ];

  return (
    <>
      <div
        className={`${"dark-mode d-flex justify-content-center me-2 gap-ceown new-user-height"} `}
        style={{ height: "25vh" }}
      >
        {props?.isLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-100 align-items-center justify-content-center">
            Loading...
          </div>
        ) : (
          <>
            {levelArray.map((res, index) => (
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                key={index}
              >
                <img
                  className="crown-level-img"
                  src={res.img}
                  alt=""
                  height={40}
                  width={40}
                />
                <span className="heading">{res.name}</span>
                <span className="number">{res.count}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LevelCount;
