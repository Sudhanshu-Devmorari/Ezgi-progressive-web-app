import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";
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
import EditorProfileActiveComments from "../EditorProfileActiveComments/EditorProfileActiveComments";
import CommentatorsCommentsPage from "../CommentatorsCommentsPage/CommentatorsCommentsPage";
import DashboardSU from "../DashboardSU/DashboardSU";

const MainPage = () => {
  // CHANGE THEME
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  // Select Content
  const [selectContent, setSelectContent] = useState("home");
  const [selectPublicorForYou, setSelectPublicorForYou] = useState("for you");
  const [dashboardSUser, setDashboardSUser] = useState(false);

  const themeMode = localStorage.getItem("CurrentTheme");

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("body-dark-mode");
      setCurrentTheme("dark");
    } else {
      document.body.classList.add("body-light-mode");
      setCurrentTheme("light");
    }
  }, [themeMode]);

  // const user = "c-";
  const user = localStorage.getItem("userPhone")
  console.log("selectContent: ",selectContent)

  return (
    <>
      <div
        className={`container-fluid mt-3`}
        style={{ fontFamily: "none", marginBottom: "66px" }}
      >
        <NavBar
          setDashboardSUser={setDashboardSUser}
          setSelectContent={setSelectContent}
        />

        {dashboardSUser ? (
          user === "c" ? (
            <CommentatorsCommentsPage user={user} setSelectContent={setSelectContent} setDashboardSUser={setDashboardSUser} selectContent={selectContent}/>
          ) : (
            <DashboardSU
              setSelectContent={setSelectContent}
              setDashboardSUser={setDashboardSUser}
              selectContent={selectContent}
            />
          )
        ) : (
          <>
            {(selectContent === "home" ||
              selectContent === "editor" ||
              selectContent === "comments") && (
              <>
                <Banner />
                <EditorBanner />
              </>
            )}
            {selectContent === "home" && (
              <>
                <SelectContent
                  selectContent={selectPublicorForYou}
                  setSelectContent={setSelectPublicorForYou}
                />
                <ContentSection
                  selectContent={selectPublicorForYou}
                  setSelectContent={setSelectContent}
                />
                <HighlightMainPage />
                <SharedProfile />
                <AdvertisementBanner />
              </>
            )}
            {selectContent === "editor" && <EditorsPage />}
            {selectContent === "comments" && <CommentsPage />}
            {selectContent === "show-all-comments" && (
              <EditorProfileActiveComments
                setSelectContent={setSelectContent} setDashboardSUser={setDashboardSUser}
              />
            )}
          </>
        )}
      </div>
      <Footer
        setDashboardSUser={setDashboardSUser}
        setSelectContent={setSelectContent}
        selectContent={selectContent}
      />
    </>
  );
};

export default MainPage;
