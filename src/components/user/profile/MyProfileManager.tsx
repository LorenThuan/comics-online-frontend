import React from 'react'
import Common from '../../common/Common'
import MyProfile from './MyProfile'

const MyProfileManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<MyProfile/>}/>
  )
}

export default MyProfileManager