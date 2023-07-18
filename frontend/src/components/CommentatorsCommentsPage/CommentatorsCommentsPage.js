import React, { useEffect, useState } from 'react'
import ActiveComments from '../ActiveComments/ActiveComments'
import CommentatorIcons from '../CommentatorIcons/CommentatorIcons'
import SelectComments from '../SelectComments/SelectComments'
import CommentsContentSection from '../CommentsContentSection/CommentsContentSection'
import EditorProfileStatisticsSection from '../EditorProfileStatisticsSection/EditorProfileStatisticsSection'
import { SubscribersSelection } from '../SubscribersSelection/SubscribersSelection'
import MySubscribers from "../MySubscribers/MySubscribers"
import WalletSelection from '../WalletSelection/WalletSelection'
import Transactions from '../Transactions/Transactions'
import PendingBalance from '../PendingBalance/PendingBalance'
import AccountStatus from '../AccountStatus/AccountStatus'
import FavoriteSelection from '../FavoriteSelection/FavoriteSelection'
import FavEditor from '../FavEditor/FavEditor'
import FavComments from '../FavComments/FavComments'
import NotificationsAndSupportSelection from '../NotificationsAndSupportSelection/NotificationsAndSupportSelection'
import Notifications from '../Notifications/Notifications'
import Support from '../Support/Support'

const CommentatorsCommentsPage = (props) => {
    const [SelectComment, setSelectComment] = useState("activeComments");
    const [content, setContent] = useState("home");
    const [subscribersOrSubscriptions, setSubscribersOrSubscriptions] = useState("My subscribers");
    const [walletSelection, setWalletSelection] = useState("My transactions");
    const [favSelection, setFavSelection] = useState("fav editor");

    useEffect(() => {
      console.log("props.selectContent=>>>",props.selectContent)
      if (props.selectContent === "notifications")  {
        setContent("notifications")
      } else if (props.selectContent === "fav") {
        setContent("fav")
      }
    }, [props.selectContent])

  return (
    <>
        <ActiveComments content={content} user={props.user} setDashboardSUser={props.setDashboardSUser} setSelectContent={props.setSelectContent}/>
        <CommentatorIcons setContent={setContent} content={content} user={'commentator'}/>

        {content === "home" && (
          <SelectComments setSelectComment={setSelectComment} SelectComment={SelectComment}/>
        )}

        {content === "home" && (
          <>
            {(SelectComment === "activeComments" || SelectComment === "resolvedComments") && (
                <CommentsContentSection SelectComment={SelectComment}/>
            )}
          </>
          )}

        {content === "home" && (
          <>
            {SelectComment === "statistics" && (
              <EditorProfileStatisticsSection/>
            )}
          </>
        )}

        {content === "subscribers" && (
          <>
            <SubscribersSelection setSubscribersOrSubscriptions={setSubscribersOrSubscriptions} subscribersOrSubscriptions={subscribersOrSubscriptions} user={'commentator'}/>
            <MySubscribers subscribersOrSubscriptions={subscribersOrSubscriptions} user={'commentator'}/>
          </>
        )}
        {content === "wallet" && (
          <>
            <WalletSelection setWalletSelection={setWalletSelection} walletSelection={walletSelection} user={'commentator'}/>
            {walletSelection === "My transactions" && (
              <Transactions/>
            )}
            {walletSelection === "pending balance" && (
              <PendingBalance/>
            )}
            {walletSelection === "account status" && (
              <AccountStatus/>
            )}
          </>
        )}
        {content === "fav" && (
          <>
            <FavoriteSelection setFavSelection={setFavSelection} favSelection={favSelection}/>
            {favSelection === "fav editor" && (
              <FavEditor/>
            )}
            {favSelection === "fav comments" && (
              <FavComments/>
            )}
          </>
        )}
        {(content === "notifications" || content === "support") && (
          <>
            <NotificationsAndSupportSelection content={content}/>

            { content === "notifications" && (
              <Notifications/>
            ) }
            { content === "support" && (
              <Support/>
            ) }
          </>
        )}
    </>
  )
}

export default CommentatorsCommentsPage