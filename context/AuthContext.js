import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

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

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);