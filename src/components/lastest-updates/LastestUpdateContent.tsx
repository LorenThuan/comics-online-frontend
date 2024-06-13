import React from 'react'
import LastestUpdateList from './LastestUpdateList'
import useComicList from '../hooks/CrudComicList'

const LastestUpdateContent = () => {
  const {comicList} = useComicList();

  return (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4'>
      <LastestUpdateList data={comicList.slice(0, 6)}/>
      <LastestUpdateList data={comicList.slice(7, 12)}/>
      </div>
  )
}

export default LastestUpdateContent