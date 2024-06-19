import React, { useEffect } from 'react'
import CrudUser from '../../hooks/CrudUser'
import UserService from '../../constants/UserService';
import LoginRequired from '../login/LoginRequired';
import { useNavigate } from 'react-router-dom';
import UpdateUserPopup from './UpdateUserPopup';
import { User } from '../../constants/types';


const UserManagement = () => {
  const {usersList, handleOpenUpdate, 
    isOpenUpdate, closeUpdatePopup,
    selectedValue, handleChangeUpdate, userData, handleFormUpdate} = CrudUser();
  const adminOnly = UserService.adminOnly();
  const navigate = useNavigate();
  
  const handleDelete = async (userItem:any) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?')
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        const userId = userItem?.userId;
        await UserService.deleteUser(userId, token);
        alert("Delete user successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleted user", error)
      throw error;
    }
  }
  
  return (
    <>
    {adminOnly ? <table className="table-fixed sm:table-auto border-collapse border border-slate-400 mt-20 mr-4">
  <thead className=''>
    <tr>
      <th>User Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  
    <tbody>
    {usersList?.map((userItem:any, index: number) => (
    <tr key={index}  className='text-center'>
      <td>{userItem.userId}</td>
      <td>{userItem.name}</td>
      <td>{userItem.email}</td>
      <td>{userItem.role}</td>
      <td className='flex justify-evenly p-1'>
        <button onClick={() => handleOpenUpdate(userItem)} className="p-1 rounded-lg bg-blue-400 text-white hover:bg-blue-600">Update</button>
        <button onClick={() => handleDelete(userItem)} className="p-1 rounded-lg bg-red-400 text-white hover:bg-red-600">Delete</button>
      </td>
    </tr>
      ))}
  </tbody>

  
</table> : <LoginRequired/>}
<UpdateUserPopup isOpenUpdate={isOpenUpdate} closeUpdatePopup={closeUpdatePopup}
userData={userData}
handleChangeUpdate={handleChangeUpdate}
handleFormUpdate={handleFormUpdate}
selectedValue={selectedValue}
/>
    </>
    
  )
}

export default UserManagement