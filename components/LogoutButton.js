import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(FirebaseAuth);
      await AsyncStorage.setItem('isLoggedIn','');
      console.log('Выход из аккаунта успешно выполнен');
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.text}>Выйти</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
const styles = StyleSheet.create({
  text:{
    fontSize:30,
  }
})
