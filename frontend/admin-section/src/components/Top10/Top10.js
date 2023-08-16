import React, { useEffect, useState } from "react";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user1.png";
import user3 from "../../assets/user2.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import "./Top10.css";

const Top10 = (props) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.userData == undefined ? [] : props.userData);
  }, [props]);

  return (
    <>
      <div className="dark-mode pb-1 ps-2 pt-2" style={{ height: "25vh" }}>
        <div className="heading-top-10" >
          Top 10
        </div>
        <div className="d-flex justify-content-center ">
          <div className="text-center d-flex gap-2 align-items-end">
            <div className="d-flex flex-column">
              <img
                onClick={() => props.setupdateProfile(2)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="top-2-img cursor"
                src={user2}
                alt=""
              />
              <span className="text-top10" style={{ fontSize: "0.7rem" }}>
                {data.length > 0 ? data[1].Subscriber_Count : null}
              </span>
            </div>
            <div className="d-flex flex-column">
              <img
                onClick={() => props.setupdateProfile(2)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="top-1-img cursor"
                src={user1}
                alt=""
              />
              <span className="text-top10" style={{ fontSize: "0.8rem" }}>
                {data.length > 0 ? data[0].Subscriber_Count : null}
              </span>
            </div>
            <div className="d-flex flex-column">
              <img
                onClick={() => props.setupdateProfile(2)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="top-2-img cursor"
                src={user3}
                alt=""
              />
              <span className="text-top10" style={{ fontSize: "0.7rem" }}>
                {data.length > 0 ? data[2].Subscriber_Count : null}
              </span>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-center gap-2 all-users-gap">
          {data?.slice(3).map((res, index) => (
            <div className="d-flex flex-column text-center padding-all-users">
              <img
                onClick={() => props.setupdateProfile(2)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="all-user-img cursor"
                src={user1}
                alt=""
              />
              <span className="all-user-text" style={{ fontSize: "0.7rem" }}>
                {res.Subscriber_Count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Top10;
