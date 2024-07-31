import React from 'react'
import Common from '../../common/Common'
import ReadingHistoryComponent from './ReadingHistoryComponent'

const ReadingHistoryManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<ReadingHistoryComponent/>}/>
  )
}

export default ReadingHistoryManager