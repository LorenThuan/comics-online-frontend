import React from 'react'
import LastestUpdateList from './LastestUpdateList'
import useComicList from '../hooks/CrudComicList'

const LastestUpdateContent = () => {
  const {comicList} = useComicList();

  return (
      <div className='flex flex-row gap-6'>
      <LastestUpdateList data={comicList.slice(0, 6)}/>
      <LastestUpdateList data={comicList.slice(7, 12)}/>
      </div>
  )
}

export default LastestUpdateContent