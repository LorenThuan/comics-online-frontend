import React from 'react'
import Common from '../../common/Common'
import LibraryComponent from './LibraryComponent'

const LibraryManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full ml-[290px] mt-10" components={<LibraryComponent/>}/>
  )
}

export default LibraryManager