import React from 'react'
import Common from '../common/Common'
import ComicComponent from './ComicComponent'

const ComicManagement = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<ComicComponent/>}/>
  )
}

export default ComicManagement