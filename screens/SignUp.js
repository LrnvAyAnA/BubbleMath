import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
//продолжить
import OrangeBut from '../assets/images/buttonFromMain.svg';

export default function SignUp() {
    return (
      <View style={styles.container}>
        <View style={styles.ButGoogle}>
        <TouchableOpacity>
          <OrangeBut width={200} height={40}/>
          <Text>С помощью Google</Text>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.ButEmail}>
          <Text>С помощью Email</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    ButGoogle:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  })