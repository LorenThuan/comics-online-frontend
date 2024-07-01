import React, { useEffect } from 'react'
import { User } from '../components/constants/types';
import UserService from '../components/constants/UserService';

const ComicListManager = () => {
  const [usersList, setUsersList] = React.useState<User[]>([]);

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await UserService.getAllUsers(token);
        console.log(result);
        setUsersList(result.userList);
      }
    };
    if (usersList === null) {
      handle();
    }
  }, [usersList]);
  
  return {usersList}
}

export default ComicListManager;