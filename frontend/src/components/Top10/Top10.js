import React from "react";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user1.png";
import user3 from "../../assets/user2.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import './Top10.css'

const Top10 = (props) => {
  const users = [
    { profile: user4 },
    { profile: user5 },
    { profile: user6 },
    { profile: user4 },
    { profile: user5 },
    { profile: user6 },
    { profile: user1 },
  ];
  return (
    <>
      <div className="dark-mode p-2" style={{height:"25vh"}}>
        <div className="heading-top-10" style={{ fontSize: "1.1rem" }}>
          Top 10
        </div>
        <div className="d-flex justify-content-center ">
          <div className="text-center d-flex gap-4 align-items-end">
            <div className="d-flex flex-column">
              <img  onClick={()=>props.setupdateProfile(2)} className="top-2-img" src={user2} alt="" height={53} width={53} />
              <span className="text-top10" style={{ fontSize: "0.7rem" }}>2.455</span>
            </div>
            <div className="d-flex flex-column">
              <img onClick={()=>props.setupdateProfile(2)}  className="top-1-img" src={user1} alt="" height={73} width={73} />
              <span className="text-top10" style={{ fontSize: "0.8rem" }}>2.455</span>
            </div>
            <div className="d-flex flex-column">
              <img onClick={()=>props.setupdateProfile(2)}  className="top-2-img" src={user3} alt="" height={53} width={53} />
              <span className="text-top10" style={{ fontSize: "0.7rem" }}>2.455</span>
            </div>
          </div>
        </div>
        <div className="my-2 d-flex justify-content-center gap-2 all-users-gap">
          {users.map((res, index) => (
            <div className="d-flex flex-column text-center padding-all-users">
              <img onClick={()=>props.setupdateProfile(2)}  className="all-user-img" src={user1} alt="" height={42} width={42} />
              <span className="all-user-text" style={{ fontSize: "0.7rem" }}>2.455</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Top10;
