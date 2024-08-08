import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { ComicFull, User } from '../components/constants/types';
import UserService from '../components/constants/UserService';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface DecodedToken {
  exp: number;
  // other fields you might have in your token payload
}

interface StateContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  comicList: ComicFull[] | undefined;
  setComicList: React.Dispatch<React.SetStateAction<ComicFull[] | undefined>>;
  comicListFull: ComicFull[];
  setComicListFull: React.Dispatch<React.SetStateAction<ComicFull[]>>;
  loadingAllComics: boolean;
  fetchComicListAll: () => Promise<void>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isOpenSidebar: boolean;
  setOpenIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [comicList, setComicList] = useState<ComicFull[] | undefined>([]);
  const [comicListFull, setComicListFull] = useState<ComicFull[]>([]);
  const [loadingAllComics, setLoadingAllComics] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("home");
  const [isOpenSidebar, setOpenIsSidebar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const useTokenRefresh = async (token: string): Promise<string | null> => {
    try {
      const result = await UserService.refreshToken({ token });
      if (result && result.statusCode === 200 && result.token) {
        localStorage.setItem("token", result.token);
        return result.token;
      } else {
        throw new Error("Unable to refresh token");
      }
    } catch (error) {
      // console.error("Error refreshing token:", error);
      return null;
    }
  };

  useEffect(() => {
    handleGetUserLogin();
  }, [token]);

  useEffect(() => {
    fetchComicListAll();

    const socket = new SockJS('http://localhost:8083/ws');
      const stompClient = new Client({
        webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/comicUpdates', (message) => {
          // console.log("Received message:", message.body);
          fetchComicListAll();
        });
      }
    });

    stompClient.activate();
  
      return () => {
        stompClient.deactivate();
      };
  }, []);

  const handleGetUserLogin = async () => {
    let token: string | null = localStorage.getItem("token");
    
    if (!token) {
      // console.error("No token found in localStorage");
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const isExpired = decodedToken?.exp * 1000 < Date.now();

      if (isExpired) {
        token = await useTokenRefresh(token);
        if (!token) {
          return;
        }
      }

      const result = await UserService.getYourProfile(token);
      // console.log("Full response:", result);

      if (result && result.statusCode === 200 && result.user) {
        // console.log("User:", result.user);
        
        if (result.user.comicList) {
          // console.log("Comic List:", result.user.comicList);
          setComicList(result.user.comicList);
        }

        setUser(result.user);
      } else {
        // console.error("User data is undefined or null:", result.user);
      }
    } catch (error) {
      // console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const fetchComicListAll = async () => {
    setLoadingAllComics(true);
    try {
      const response = await axios.get("http://localhost:8083/comics");
      setComicListFull(response.data);
    } catch (error) {
      // console.error("Error fetching comic list:", error);
      throw error;
    } finally {
      setLoadingAllComics(false);
    }
  };

  return (
    <StateContext.Provider value={{ 
      token, setToken, user, setUser, comicList, setComicList, 
      comicListFull, setComicListFull,loadingAllComics, fetchComicListAll, 
      selected, setSelected, isOpenSidebar, setOpenIsSidebar, searchQuery, setSearchQuery,
    }}>
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
