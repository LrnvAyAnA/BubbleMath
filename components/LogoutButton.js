import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={logout}>
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
