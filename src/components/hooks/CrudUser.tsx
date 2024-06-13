import React, {InputHTMLAttributes, useEffect} from 'react'
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
    username: '',
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
      const token = localStorage.getItem("token");
      await UserService.register(formData, token);

      setFormData({
        username: '',
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

  const [user, setUser] = React.useState({
    username: '',
  })

  useEffect(() => {
     
    const handle = async () => {
      const token = localStorage.getItem("token");
      if(token) {
        const result = await UserService.getYourProfile(token);
        console.log(result.user.usernameEntity);
        setUser( {username: result.user.usernameEntity});
      }
    }
     handle();

  }, [])
  

  return {setEmail, setPassword, error, handle, handleChange, handleForm, formData, user, email, password}
}

export default CrudUser