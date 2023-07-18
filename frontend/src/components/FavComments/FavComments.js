import React, { useState } from 'react'
import ContentSection from '../ContentSection/ContentSection'

const FavComments = () => {
  const [userComments, setUserComments] = useState(true);
  return (
    <>
    <ContentSection userComments={userComments}/>
    </>
  )
}

export default FavComments