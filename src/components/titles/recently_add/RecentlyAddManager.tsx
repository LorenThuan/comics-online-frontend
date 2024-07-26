import React from 'react'
import Common from '../../common/Common'
import RecentlyAddComponent from './RecentlyAddComponent'

const RecentlyAddManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<RecentlyAddComponent/>}/>
  )
}

export default RecentlyAddManager