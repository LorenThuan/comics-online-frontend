import React, { useEffect, useState } from "react";
import CrudUser from "../../../hooks/CrudUser";
import UserService from "../../constants/UserService";
import LoginRequired from "../login/LoginRequired";
import { useNavigate } from "react-router-dom";
import UpdateUserPopup from "./UpdateUserPopup";
import { User } from "../../constants/types";
import ComicListManager from "../../../hooks/ComicListManager";
import { useStateContext } from "../../../context/StateContext";
import { toast } from "react-toastify";

const UserManagement = () => {
  const {
    handleOpenUpdate,
    isOpenUpdate,
    closeUpdatePopup,
    handleChangeUpdate,
    userData,
    handleFormUpdate,
  } = CrudUser();

  const {usersList} = ComicListManager();
  const adminOnly = UserService.adminOnly();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User>(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  })

  const handleDelete = async (userItem: any) => {
    try {
      if (profile?.userId === userItem?.userId) {
        const confirmDelete = window.confirm(
          "Are you sure want to delete yourself, note, you will log out of website?");
          if (confirmDelete) {
            const token = localStorage.getItem("token");
            await UserService.deleteUser(userItem?.userId, token);
            toast.success("Delete user successfully");
            UserService.logout();
            navigate("/", {replace: true})
          }
      }
      else { 
        const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
        );
        if (confirmDelete) {
          const token = localStorage.getItem("token");
          const userId = userItem?.userId;
          
          await UserService.deleteUser(userId, token);
          toast.success("Delete user successfully");
          window.location.reload();
        }
      }
    } catch (error) {
      // console.log("Error deleted user", error);
      throw error;
    }
  };

  return (
    <>
      {adminOnly ? (
        <table className="table-fixed sm:table-auto border-collapse border border-slate-400 mt-20 mr-4">
          <thead className="">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersList?.map((userItem: User, index: number) => (
              <tr key={index} className="text-center">
                <td>{userItem.userId}</td>
                <td>{userItem.name}</td>
                <td>{userItem.email}</td>
                <td>{userItem.role}</td>
                <td className="p-1">
                  <button
                    onClick={() => handleOpenUpdate(userItem)}
                    className="p-1 mx-1 rounded-lg bg-blue-400 text-white hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(userItem)}
                    className="p-1 rounded-lg bg-red-400 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <LoginRequired />
      )}
      <UpdateUserPopup
        isOpenUpdate={isOpenUpdate}
        closeUpdatePopup={closeUpdatePopup}
        userData={userData}
        handleChangeUpdate={handleChangeUpdate}
        handleFormUpdate={handleFormUpdate}
      />
    </>
  );
};

export default UserManagement;
