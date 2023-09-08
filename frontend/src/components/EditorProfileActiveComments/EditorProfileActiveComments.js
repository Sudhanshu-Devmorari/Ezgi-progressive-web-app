import React, { useState, useEffect } from "react";
import ActiveComments from "../ActiveComments/ActiveComments";
import SelectComments from "../SelectComments/SelectComments";
import ContentSection from "../ContentSection/ContentSection";
import CommentsContentSection from "../CommentsContentSection/CommentsContentSection";
import EditorProfileStatisticsSection from "../EditorProfileStatisticsSection/EditorProfileStatisticsSection";
import axios from "axios";
import config from "../../config";
import Spinner from "react-bootstrap/esm/Spinner";
import { userId } from "../GetUser";

const EditorProfileActiveComments = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // console.log(">>>>>>>>>>>>.", props.activeCommentsshow);
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    async function getProfileData() {
      const res = await axios.get(
        // `${config.apiUrl}/profile/${props?.activeCommentsshow}`
        `${config.apiUrl}/profile/${props?.activeCommentsshow}?id=${userId}`
      );
      console.log(res.data,"========fffffffffff>>>");
      setProfileData(res.data);
      setIsFavorite(res?.data?.is_fav_editor)
      setIsLoading(false);
    }
    getProfileData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "75vh" }}
          >
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </div>
        </>
      ) : (
        <>
          <ActiveComments
            from={"editor"}
            setSelectContent={props.setSelectContent}
            setDashboardSUser={props.setDashboardSUser}
            activeCommentsshow={props?.activeCommentsshow}
            profileData={profileData}
            verifyid={props.verifyid}
            cmtReact={props.cmtReact}
            homeApiData={props.homeApiData}
            followingid={props.followingid}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
          <SelectComments
            setSelectComment={setSelectComment}
            SelectComment={SelectComment}
          />
          {SelectComment !== "statistics" && (
            <CommentsContentSection
              SelectComment={SelectComment}
              verifyid={props.verifyid}
              cmtReact={props.cmtReact}
              homeApiData={props.homeApiData}
            />
          )}
          {SelectComment === "statistics" && (
            <EditorProfileStatisticsSection
              from={"editor"}
              activeCommentsshow={props.activeCommentsshow}
            />
          )}
        </>
      )}
    </>
  );
};

export default EditorProfileActiveComments;
