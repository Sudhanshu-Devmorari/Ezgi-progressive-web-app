import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import Banner from "../Banner/Banner";
import CurrentTheme from "../../context/CurrentTheme";
import ContentSection from "../ContentSection/ContentSection";
import SharedProfile from "../SharedProfile/SharedProfile";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import { Footer } from "../Footer/Footer";
import { EditorBanner } from "../EditorBanner/EditorBanner";
import { SelectContent } from "../SelectContent/SelectContent";
import HighlightMainPage from "../HighlightMainPage/HighlightMainPage";
import EditorsPage from "../EditorsPage/EditorsPage";
import CommentsPage from "../CommentsPage/CommentsPage";

const MainPage = () => {
  // CHANGE THEME
  const [subscribeModalShow, setSubscribeModalShow] = useState(false);
  const [AddCommentModalShow, setAddCommentModalShow] = useState(false);

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  // Select Content
  const [selectContent, setSelectContent] = useState("home");
  const [selectPublicorForYou, setSelectPublicorForYou] = useState("for you");

  console.log("SelectContent: ", selectContent);
  console.log("selectPublicorForYou: ", selectPublicorForYou);

  return (
    <>
      <div className={`container-fluid mt-3`} style={{ fontFamily: "none" }}>
        <NavBar />
        <Banner />
        <EditorBanner />

        {selectContent === "home" && (
          <>
            <SelectContent selectContent={selectPublicorForYou} setSelectContent={setSelectPublicorForYou}/>
            <ContentSection selectContent={selectPublicorForYou}/>
            <HighlightMainPage />
            <SharedProfile />
            <AdvertisementBanner />
          </>
        )}

        {selectContent === "editor" && <EditorsPage />}
        {selectContent === "comments" && <CommentsPage />}

        <Footer setSelectContent={setSelectContent} selectContent={selectContent}/>

        {/* <button onClick={() => setSubscribeModalShow(true)}>Subscribe</button>
          <button onClick={() => setAddCommentModalShow(true)}>Add Comment</button> */}
        {/* <SubscribeModal show={subscribeModalShow} onHide={() => setSubscribeModalShow(false)}/>
          <AddCommentModal show={AddCommentModalShow} onHide={() => setAddCommentModalShow(false)}/> */}
      </div>
    </>
  );
};

export default MainPage;
