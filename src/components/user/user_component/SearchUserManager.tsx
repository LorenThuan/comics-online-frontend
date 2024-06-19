import React from 'react'
import Common from '../../common/Common'
import SearchUserComponent from './SearchUserComponent'

const SearchUserManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full ml-[290px] mt-10" components={<SearchUserComponent/>}/>
  )
}

export default SearchUserManager