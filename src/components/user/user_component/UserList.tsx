import React from 'react'
import Neko from "../../../assets/MangaDex.png"
import { User } from '../../constants/types'

interface UserListProps {
  usersListSearch?: User[];
  searchUser?: string;
  userListMembers?: User[];
}

const UserList = (props:UserListProps) => {
  console.log(props.usersListSearch);
  console.log(props.userListMembers);
  

  const renderUserList = (userList: User[]) => {
    return (
    <>
    <div className='mt-10 grid grid-cols-1 sm:grid-cols-4 gap-2 mr-4'>
    {userList.map((userListItem: User, index: any) => (
      <div key={index} className='bg-slate-200 px-2 w-full py-2 flex items-center justify-between cursor-pointer rounded-md hover:bg-slate-300'>
        <div className='flex space-x-2'>
          <img src={Neko} alt="" className='w-6 h-6 object-cover rounded-full'/>
          <h2 className='font-semibold'>{userListItem.name}</h2>
        </div>
        <div className='bg-gray-100 px-2 py-0.5 text-center rounded'>
          <p className='text-sm'>{userListItem.role}</p>
        </div>
      </div>
    ))}
    </div>
    </>
  )};
  
  
  return (
    <>
    {props.searchUser === "" 
        ? Array.isArray(props.userListMembers) && renderUserList(props.userListMembers)
        : Array.isArray(props.usersListSearch) && renderUserList(props.usersListSearch)
      }
    </>
  )
}

export default UserList