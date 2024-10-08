import React from 'react'
import Common from '../common/Common'
import ChapterComponent from './ChapterComponent'

const ChapterManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full my-24" components={<ChapterComponent/>}/>
  )
}

export default ChapterManager