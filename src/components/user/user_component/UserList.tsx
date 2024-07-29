import React from 'react'
import Neko from "../../../assets/MangaDex.png"
import { User } from '../../constants/types'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../context/StateContext';

interface UserListProps {
  usersListSearch?: User[];
  searchUser?: string;
  userListMembers?: User[];
  isLoadingMembers: boolean;
  isLoadingSearchUser: boolean;
}

const UserList = (props:UserListProps) => {
  const navigate = useNavigate();
  const {setSelected} = useStateContext();

  const renderUserList = (userList: User[]) => {
    if (props.isLoadingMembers || props.isLoadingSearchUser) {
      return (
        <div className="text-blue-500 mt-4 text-center text-xl">
          Loading...
        </div>
      );
    }

    return (
    <>
    <div className='mt-10 grid grid-cols-1 sm:grid-cols-4 gap-2 mr-4'>
    {userList?.map((user: User, index: any) => (
      <div key={index} 
      onClick={() => {
        navigate(`/user/${user.userId}`, {state: {user}});
        setSelected("");
      }}
      className='bg-slate-200 p-2 w-full flex items-center justify-between 
      cursor-pointer rounded-md hover:bg-slate-300'>
        <div className='flex space-x-2'>
          <img src={Neko} alt="" className='w-6 h-6 object-cover rounded-full'/>
          <h2 className='font-semibold'>{user?.name}</h2>
        </div>
        <div className='bg-gray-100 px-2 py-0.5 text-center rounded'>
          <p className='text-sm'>{user?.role}</p>
        </div>
      </div>
    ))}
    </div>
    </>
  )};
//   <div className='mt-10 mr-4 bg-gray-100 text-center py-4 rounded'>
//   No data found.
// </div>
  
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