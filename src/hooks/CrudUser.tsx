import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../components/constants/UserService";
import { User } from "../components/constants/types";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-toastify";

const CrudUser = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // const [user, setUser] = React.useState<User | null>(null);
  const {token, setToken} = useStateContext();

  const handle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await UserService.login(email, password);
      // console.log(userData);

      if (userData.token && userData.statusCode === 200) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
      //   localStorage.setItem("name", userData.name);
        localStorage.setItem("profile", JSON.stringify(userData));
        setToken(userData.token);
        navigate("/", { replace: true });
      } else {
        toast.error("Username or Password incorrect!")
      }
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

  const [formData, setFormData] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const [confirmPw, setConfirmPw] = useState<string>("");

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.password === confirmPw) {
        const response = await UserService.register(formData);
        
        if (response.statusCode === 500) {
          toast.error("Email already exists");
          return;
        }
          toast.success("User Registered successfully");
          navigate("/auth/login", {replace: true, state: {formData} });
      } else {
          toast.success("Password and confirm default password do not match!");
      }
    } catch (error: any) {
      // console.log(error);
      throw error;
    }
  };

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<User>();

  const handleOpenUpdate = (userItem: User) => {
    setIsOpenUpdate((prevState) => !prevState);
    // setSelectedUser(userItem);
    fetchUserDataById(userItem?.userId);
  };

  // useEffect(() => {
  //   console.log("isOpenUpdate:", isOpenUpdate);
  // }, [isOpenUpdate]);

  const closeUpdatePopup = () => {
    setIsOpenUpdate(false);
  };

  const [userData, setUserData] = React.useState<User>({
    userId: 0,
    name: "",
    email: "",
    password: "",
    role: ""
  });

  // useEffect(() => {
  //   fetchUserDataById();
  // }, [selectedUser?.userId]);

  const fetchUserDataById = async (userIdGet: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await UserService.getUserById(
          userIdGet,
          token
        );
        // console.log(response);
    
        const { userId, name, email, password, role } = response.user;
        
        setUserData({userId, name, email, password, role });
      } catch (error) {
        throw error;
      }
    }
  };

  // const [selectedValue, setSelectedValue] = React.useState("");

  const handleChangeUpdate = async (e: any) => {
    const { name, value } = e.target;
    // setSelectedValue(e.target.value);
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
        // console.log(selectedUser);
        // const userId = userData?.userId;
        // console.log(userData);

        await UserService.updateUser(userData?.userId, userData, token);
          toast.success("Update information successfully");
          window.location.reload();
        
      }

    } catch (error: any) {
      // console.log("Error updating user", error);
      throw error;
    }
  };

  const [searchUser, setSearchUser] = React.useState("");
  const [usersListSearch, setUsersListSearch] = React.useState<User[]>([]);
  const [isLoadingSearchUser, setIsLoadingSearchUser] = React.useState<boolean>(false);

  useEffect(() => {
      fetchSearchUser();
  }, [searchUser]);

  const fetchSearchUser = async () => {
    setIsLoadingSearchUser(true);
    try {
      if (searchUser === "") {
        return [];
      }

      const token = localStorage.getItem("token");
      if (token) {
        // console.log("Fetching data from server");
        const result = await UserService.findUserByName(searchUser, token);
        setUsersListSearch(result.userList);
      }
    } catch (error) {
      // console.error("Error fetching search by name:", error);
      return [];
    } finally {
      setIsLoadingSearchUser(false);
    }
  };

  const [userListMembers, setUserListMembers] = React.useState<User[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = React.useState<boolean>(false);
  const {fetchDataRealTime} = useStateContext();

  useEffect(() => {
    handleGetAllUserMember();
    fetchDataRealTime("/topic/userUpdates", handleGetAllUserMember);
  }, []);

  const handleGetAllUserMember = async () => {
    const token = localStorage.getItem("token");
    setIsLoadingMembers(true);
    try {
      if (token) {
        const result = await UserService.getAllUserMembers(token);
        // console.log(result);
        setUserListMembers(result.userList);
      }
    } catch(error){
      // console.error("Can't fetch list user members", error); 
      throw error;
    } finally {
      setIsLoadingMembers(false);
    }
    
  };

  return {
    setEmail,
    setPassword,
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
    handleChangeUpdate,
    userData,
    handleFormUpdate,
    searchUser,
    setSearchUser,
    usersListSearch,
    userListMembers,
    confirmPw,
    setConfirmPw, isLoadingMembers, isLoadingSearchUser
  };
};

export default CrudUser;
