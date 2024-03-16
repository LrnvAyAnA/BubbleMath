import React from 'react';
import { Text, View,StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoutButton from '../components/LogoutButton'

export default function Profile(){
  return(
    <View style={styles.background}>
      <View style={styles.containerButtons}>
        <LogoutButton/>
      </View>
    </View>
  )
  }
  const styles = StyleSheet.create({
  background:{
      backgroundColor:'#fff',
      flex:1,
  },
  containerButtons:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontSize:50,
    textAlign:'center',
    flex:1,
    textAlignVertical:'center',
    color:'white'
  }
  })