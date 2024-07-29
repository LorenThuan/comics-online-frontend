import React from 'react'
import Common from '../../common/Common'
import ProfileUserView from './ProfileUserView'

const ProfileUserViewManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<ProfileUserView/>}/>
  )
}

export default ProfileUserViewManager