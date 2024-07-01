import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../components/constants/UserService";
import { AuthLogin, User } from "../components/constants/types";
import { useStateContext } from "../context/StateContext";

const CrudUser = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  // const [user, setUser] = React.useState<User | null>(null);
  const {token, setToken, user, setUser} = useStateContext();



  const handle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await UserService.login(email, password);
      console.log(userData);

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        setToken(userData.token);
        console.log(token);
        navigate("/", { replace: true });  
      } else {
        setError(userData.message);
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const [formData, setFormData] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const role = localStorage.getItem("role");
      await UserService.register(formData);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER",
      });
      alert("User Registered successfully");
      navigate("/auth/login", { replace: true });
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };



  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleOpenUpdate = (userItem: any) => {
    setIsOpenUpdate((prevState) => !prevState);
    setSelectedUser(userItem);
  };

  useEffect(() => {
    console.log("isOpenUpdate:", isOpenUpdate);
  }, [isOpenUpdate]);

  const closeUpdatePopup = () => {
    setIsOpenUpdate(false);
  };

  const [userData, setUserData] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserDataById = async () => {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserById(
        selectedUser?.userId,
        token
      );
      console.log(response);

      const { name, email, password, role } = response.user;
      setUserData({ name, email, password, role });
    };
    fetchUserDataById();
  }, [selectedUser?.userId]); //whenever change call update on td it change userId

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChangeUpdate = async (e: any) => {
    const { name, value } = e.target;
    setSelectedValue(e.target.value);
    setUserData((preUserData) => ({
      ...preUserData,
      [name]: value,
    }));
  };

  const handleFormUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        console.log(selectedUser);
        const userId = selectedUser?.userId;
        console.log(userData);

        await UserService.updateUser(userId, userData, token);
        alert("Update information successfully");
        window.location.reload();
      }

    } catch (error: any) {
      console.log("Error updating user", error);
      throw error;
    }
  };

  const [searchUser, setSearchUser] = React.useState("");
  const [usersListSearch, setUsersListSearch] = React.useState<User[]>([]);

  useEffect(() => {
    const fetchSearchUser = async () => {
      try {
        if (searchUser === "") {
          console.error("Search query is empty");
          return [];
        }

        const token = localStorage.getItem("token");
        if (token) {
          console.log("Fetching data from server");
          const result = await UserService.findUserByName(searchUser, token);
          console.log(result);
          setUsersListSearch(result.userList);
        }
      } catch (error) {
        console.error("Error fetching search by name:", error);
        return [];
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSearchUser();
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchUser]);

  const [userListMembers, setUserListMembers] = React.useState<User[]>([]);

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await UserService.getAllUserMembers(token);
        console.log(result);
        setUserListMembers(result.userList);
      }
    };

    const debounceTimeout = setTimeout(() => {
      handle();
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, []);

  return {
    setEmail,
    setPassword,
    error,
    handle,
    handleChange,
    handleForm,
    formData,
    email,
    password,
    isOpenUpdate,
    handleOpenUpdate,
    setIsOpenUpdate,
    closeUpdatePopup,
    selectedUser,
    selectedValue,
    handleChangeUpdate,
    userData,
    handleFormUpdate,
    searchUser,
    setSearchUser,
    usersListSearch,
    userListMembers
  };
};

export default CrudUser;
