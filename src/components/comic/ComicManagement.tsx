import React from 'react'
import Common from '../common/Common'
import ComicComponent from './ComicComponent'

const ComicManagement = () => {
  return (
    <Common className="grid grid-cols-1 w-full ml-[290px] mt-10" components={<ComicComponent/>}/>
  )
}

export default ComicManagement