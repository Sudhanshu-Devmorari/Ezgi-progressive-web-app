import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";
import SubscribeModal from "../SubscribeModal/SubscribeModal";

const MainPage = () => {
  // CHANGE THEME
  const [DarkMode, setDarkMode] = useState(false);
  const [subscribeModalShow, setSubscribeModalShow] = useState(false);

  return (
    <>
      <div className={`container-fluid mt-2`} style={{ fontFamily: "none" }}>
        <div>
          <NavBar setDarkMode={setDarkMode} DarkMode={DarkMode} />
          <button onClick={() => setSubscribeModalShow(true)}>Subscribe</button>
          <SubscribeModal show={subscribeModalShow} onHide={() => setSubscribeModalShow(false)}/>
        </div>
      </div>
    </>
  );
};

export default MainPage;
