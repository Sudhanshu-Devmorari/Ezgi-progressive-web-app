import React, { useState } from 'react'
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

const CommentatorsCommentsPage = (props) => {
    const [SelectComment, setSelectComment] = useState("activeComments");
    const [content, setContent] = useState("home");
    const [subscribersOrSubscriptions, setSubscribersOrSubscriptions] = useState("My subscribers");
    const [walletSelection, setWalletSelection] = useState("My transactions");

  return (
    <>
        <ActiveComments user={props.user}/>
        <CommentatorIcons setContent={setContent} content={content}/>

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
            <SubscribersSelection setSubscribersOrSubscriptions={setSubscribersOrSubscriptions} subscribersOrSubscriptions={subscribersOrSubscriptions}/>
            <MySubscribers subscribersOrSubscriptions={subscribersOrSubscriptions}/>
          </>
        )}
        {content === "wallet" && (
          <>
            <WalletSelection setWalletSelection={setWalletSelection} walletSelection={walletSelection}/>
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
    </>
  )
}

export default CommentatorsCommentsPage