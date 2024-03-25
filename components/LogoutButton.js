import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import Button from '../assets/images/buttonFromMain'

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={logout}>
      <View style={styles.container}>
        <Text style={styles.text}>Выход</Text>
        <Button width={320}/>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontFamily:'Nunito-ExtraBold',
    position:'absolute',
    top:23,
    zIndex:1,
    fontSize:22,
    color:'#fff',
  }
})
