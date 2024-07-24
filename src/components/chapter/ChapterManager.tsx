import React from 'react'
import Common from '../common/Common'
import ChapterComponent from './ChapterComponent'

const ChapterManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<ChapterComponent/>}/>
  )
}

export default ChapterManager