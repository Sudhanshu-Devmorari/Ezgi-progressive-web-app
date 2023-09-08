import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import NewUsers from "../NewUsers/NewUsers";
import CommentsManagement from "../CommentsManagement/CommentsManagement";
import MostLiked from "../MostLiked/MostLiked";
import commentsIcon from "../../assets/Group 59.svg";
import winner from "../../assets/Group 73.svg";
import lose from "../../assets/Group 74.svg";
import axios from "axios";
import config from "../../config";

const CommentsManagementPage = () => {
  const [data, setData] = useState({});
  const [mostLike, setMostLike] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const commentManagementApiData = async () => {
    // console.log(data)
    await axios
      .get(`${config?.apiUrl}/comments-management/`)
      .then((res) => {
        console.log("=-=-=-=-=-=-=> ", res.data);
        setData(res.data);
        setMostLike(res?.data?.most_like);
        setCommentData(res.data.all_comment);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    commentManagementApiData();
  }, []);

  const newCommentsArray = [
    {
      label: "New Comments",
      icon: commentsIcon,
      count: `${data.comments_count}`,
      per: isLoading ? 0 : Math.round(data?.comments_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
      from: "comments",
    },
  ];
  const winnertArray = [
    {
      label: "Winner",
      icon: winner,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const losetArray = [
    {
      label: "Lose",
      icon: lose,
      count: "127",
      per: "%22",
      color: "#FF5757",
      rate_icon: "arrowDown",
    },
  ];
  const totalArray = [
    {
      label: "Total",
      count: "12.700",
      rateWin: "9.845",
      rateLose: "9.845",
      perWin: "%22",
      perLose: "%22",
      color: "#FF5757",
      rate_icon: "arrowDown",
    },
  ];
  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-4">
                    <NewUsers
                      array={newCommentsArray}
                      commentsPage={"commentsPage"}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className="col-4">
                    <NewUsers array={winnertArray} isLoading={isLoading} />
                  </div>
                  <div className="col-4">
                    <NewUsers array={losetArray} isLoading={isLoading} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <NewUsers totalArray={totalArray} isLoading={isLoading} />
              </div>
            </div>
            <div className="row g-0">
              <div className="col-8">
                <CommentsManagement
                  commentData={commentData}
                  isLoading={isLoading}
                />
              </div>
              <div className="col-4">
                <MostLiked mostLike={mostLike} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsManagementPage;
