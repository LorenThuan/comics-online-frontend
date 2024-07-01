// src/context/StateContext.tsx
import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { ComicTest, User } from '../components/constants/types';
import UserService from '../components/constants/UserService';

interface StateContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  comicList: ComicTest[] | undefined;
  setComicList: React.Dispatch<React.SetStateAction<ComicTest[] | undefined>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [comicList, setComicList] = useState<ComicTest[] | undefined>([]);

  useEffect(() => {
    const handleGetUserLogin = async () => {
        const token = localStorage.getItem("token");
        try {
            
                const result = await UserService.getYourProfile(token);
                console.log("Full response:", result);

                if (result && result.statusCode === 200 && result.message === "Get successfully" && result.user) {
                    console.log("User:", result.user);
                    
                    if (result.user.comicList) {
                        console.log("Comic List:", result.user.comicList);
                        setComicList(result.user.comicList);
                    } else {
                        console.log("Comic List is empty or undefined");
                    }

                    setUser(result.user);
                } else {
                    console.error("User data is undefined or null:", result.user);
                }
            
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    // Fetch user profile only when user is null
    if (user === undefined) {
        handleGetUserLogin();
    }
}, [user]);

  return (
    <StateContext.Provider value={{ token, setToken, user, setUser, comicList, setComicList}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a ContextProvider');
  }
  return context;
};
