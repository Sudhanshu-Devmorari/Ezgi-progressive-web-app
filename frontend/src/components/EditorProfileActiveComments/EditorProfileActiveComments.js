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
import moment from "moment";

const EditorProfileActiveComments = (props) => {
  // console.log("props::::::::::::::", props);
  const [SelectComment, setSelectComment] = useState("activeComments");
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    async function getProfileData() {
      const res = await axios.get(
        // `${config.apiUrl}/profile/${props?.activeCommentsshow}`
        `${config.apiUrl}/profile/${props?.activeCommentsshow}?id=${userId}`
      );
      // console.log(
      //   "res::::::::::::",
      //   res.data.id,
      //   ":::::::::::condition::::::::::",
      //   res.data.id == userId
      // );
      // console.log("userId::::::::::::::::", userId);
      setProfileData(res.data);
      setIsFavorite(res?.data?.is_fav_editor);
      setIsLoading(false);
    }
    getProfileData();
  }, []);

  const [active, setActive] = useState([]);
  const [resolve, setResolve] = useState([]);

  const activeResolved = async (user_id) => {
    // console.log("userID::::::::::::", user_id);
    try {
      const res = await axios
        .get(`${config?.apiUrl}/active-resolved-comment/${user_id}`)
        .then((res) => {
          // console.log("activeResolved::::::::::: ", res.data);
          setActive(res.data?.active_comments.sort((a, b) => moment(b.created).unix() - moment(a.created).unix()));
          setResolve(res.data?.resolved_comments.sort((a, b) => moment(b.created).unix() - moment(a.created).unix()));
        })
        .catch((error) => {
          console.error("Error fetching data.", error);
        });
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

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
            activeResolved={activeResolved}
            selectContent={props.selectContent}
            profileLoading={isLoading}
          />
          <SelectComments
            setSelectComment={setSelectComment}
            SelectComment={SelectComment}
          />
          {SelectComment !== "statistics" && (
            <CommentsContentSection
              userProfileId={profileData?.id}
              SelectComment={SelectComment}
              verifyid={props.verifyid}
              cmtReact={props.cmtReact}
              homeApiData={props.homeApiData}
              followingList={props.followingList}
              followingid={props.followingid}
              setActiveCommentsshow={props.setActiveCommentsshow}
              setData={props.setData}
              selectContent={props.selectContent}
              setSelectContent={props.setSelectContent}
              setArrayMerge={props.setArrayMerge}
              publicComments={props.publicComments}
              setPublicComments={props.setPublicComments}
              mergeArrays={props.mergeArrays}
              setCmtReact={props.setCmtReact}
              activeResolved={activeResolved}
              setActive={setActive}
              active={active}
              setResolve={setResolve}
              resolve={resolve}
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
