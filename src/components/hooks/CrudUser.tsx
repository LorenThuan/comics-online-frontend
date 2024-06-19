import React, {InputHTMLAttributes, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../constants/UserService';
import { AuthLogin, User } from '../constants/types';

const CrudUser = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handle = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    try {
      
     const userData = await UserService.login(email, password);
     console.log(userData);
     
     if (userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('role', userData.role);
      navigate('/', {replace: true});
     } else {
      setError(userData.message);
     }

    } catch (error: any) {
      console.log(error);     
      setError(error);
      setTimeout(() => {
        setError("")
      }, 4000);
    }
  }

  const [formData, setFormData] = React.useState<User>({
    name: '',
    email: '',
    password: '',
    role: 'ROLE_USER',
  });

  const handleChange = async (e:any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const role = localStorage.getItem("role");
      await UserService.register(formData);
      
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'ROLE_USER',
      })
      alert("User Registered successfully");
      navigate("/auth/login", {replace: true});

    } catch (error: any) {
      console.log(error);
      throw error;     
    }
  }

  const [user, setUser] = React.useState<User | null>(null)

  useEffect(() => {
     
    const handle = async () => {
      const token = localStorage.getItem("token");
      if(token) {
        const result = await UserService.getYourProfile(token);
        console.log(result);
        
        console.log(result.user.name);
        setUser(result.user);
      }
    }
     handle();

  }, [])

  const [usersList, setUsersList]  = React.useState<User[]>([]);

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const result = await UserService.getAllUsers(token);
        console.log(result);
        setUsersList(result.userList);
      }
      }

      handle();
  }, [])
  
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleOpenUpdate = (userItem:any) => {
    setIsOpenUpdate(prevState => !prevState);
    setSelectedUser(userItem);
  }

  useEffect(() => {
    console.log('isOpenUpdate:', isOpenUpdate);
  }, [isOpenUpdate]);

  const closeUpdatePopup = () => {
    setIsOpenUpdate(false);
  }

  const [userData, setUserData] = React.useState<User>({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserDataById = async () => {
        const token = localStorage.getItem("token");
        const response = await UserService.getUserById(selectedUser?.userId, token);  
        console.log(response);
        
        const {name, email, password, role} = response.user;
        setUserData({name, email, password, role});
    }
    fetchUserDataById();
  }, [selectedUser?.userId]) //whenever change call update on td it change userId 

  
  

  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChangeUpdate = async (e:any) => {
    const {name, value} = e.target;
    setSelectedValue(e.target.value)
    setUserData((preUserData) => ({
      ...preUserData,
      [name]: value
    }));
  }

  const handleFormUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this user?')
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        console.log(selectedUser);
        const userId = selectedUser?.userId;
        console.log(userData);
        
        await UserService.updateUser(userId , userData, token);
        alert("Update information successfully");
        window.location.reload();
      }
      // setFormDataUpdate({
      //   usernameEntity: '',
      //   email: '',
      //   password: '',
      //   role: '',
      // })
 
      // setIsOpenUpdate(false);
    } catch (error: any) {
      console.log("Error updating user",error);
      throw error;     
    }
  }


  
  

  return {setEmail, setPassword, error, handle, handleChange, handleForm, 
    formData, user, email, password, usersList, 
    isOpenUpdate, handleOpenUpdate, setIsOpenUpdate, closeUpdatePopup,
    selectedUser, selectedValue, handleChangeUpdate, userData, handleFormUpdate
  }
}

export default CrudUser