import React from "react";
import profile from "../../assets/profile.png";
import gender_female from "../../assets/gender-female.svg";
import gender_male from "../../assets/gender-male.svg";
import userEdit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";

const Home = () => {
  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "25 - 34",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "18 - 24",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "35 - 44",
      country: "istanbul",
      date: "15-06-.2023 - 16:37",
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "25 - 34",
      country: "Bursa",
      date: "15-06-.2023 - 16:37",
    },
  ];
  return (
    <>
      <div className="dark-mode px-2 py-3 me-2 h-100">
        {users.map((res, index) => (
          <div
            className="d-flex justify-content-between px-2 py-1 mb-2"
            style={{ backgroundColor: "#0B2447", fontSize: "10px" }}
          >
            <div className="">
              <div className="">
                <span>{res.sr}</span>
                <img src={profile} alt="" height={34} width={34} />
                <span>{res.name}</span>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>{res.username}</div>
              <div className="">
                <img src={gender_female} alt="" height={23} width={23} />
                <span>{res.age}</span>
              </div>
              <div className="">{res.country}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>{res.date}</span>
              <img src={userEdit} alt="" height={22} width={22} />
              <img src={trash} alt="" height={22} width={22} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
