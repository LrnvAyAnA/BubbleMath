import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { FirestoreDB } from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await ReactNativeAsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
          console.log(token);
        }
      } catch (error) {
        console.error('Ошибка при чтении токена из хранилища:', error);
      }
    };
    checkUserToken();
  }, []);

  const login = async (token) => {
    try {
      await ReactNativeAsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error('Ошибка при сохранении токена в хранилище:', error);
    }
  };

  const logout = async () => {
    try {
      await ReactNativeAsyncStorage.removeItem('userToken');
      setUserToken(null);
      console.log('Log out is successful');
    } catch (error) {
      console.error('Ошибка при удалении токена из хранилища:', error);
    }
  };
  const deleteU = async () => {
    if (user) {
      try {
        await deleteUser(user);
        const userDocRef = doc(FirestoreDB, "User", user.uid);
        await deleteDoc(userDocRef);
        await ReactNativeAsyncStorage.removeItem('userToken');
        setUserToken(null);
  
        console.log("Пользователь успешно удален из базы данных Firestore");
      } catch (error) {
        console.error("Ошибка удаления пользователя:", error);
      }
    } else {
      console.log("Пользователь не аутентифицирован");
    }
  };
  return (
    <AuthContext.Provider value={{ userToken, login, logout, deleteU }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);