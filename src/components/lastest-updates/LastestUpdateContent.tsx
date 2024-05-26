import React from 'react'
import LastestUpdateList from './LastestUpdateList'
import ListNewComics from "../constants/list_comic_demo"

const LastestUpdateContent = () => {
  return (
      <div className='flex flex-row gap-6'>
      <LastestUpdateList/>
      <LastestUpdateList/>
      </div>
  )
}

export default LastestUpdateContent