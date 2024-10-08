import React from 'react'
import Common from '../../common/Common'
import LibraryComponent from './LibraryComponent'
import { useLocation } from 'react-router-dom';

const LibraryManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<LibraryComponent/>}/>
  )
}

export default LibraryManager