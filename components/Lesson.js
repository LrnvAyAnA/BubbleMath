import React from "react";
import { View,StyleSheet,TouchableHighlight,Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Lesson=({number})=>{
  return(
    <TouchableHighlight >
      <View style={styles.circle}>
      <LinearGradient colors={['#866AF6', '#6F57FF']}
      style={styles.littleCircle}>
        <Text style={styles.text}>{number}</Text>
      </LinearGradient>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  text:{
    color:'#fff',
    fontSize:54,
    fontFamily:'Nunito-ExtraBold',
    textAlign:'center',
  },
  circle:{
    width:134,
    height:134,
    backgroundColor:'#6A54E9',
    borderRadius:70,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  littleCircle:{
    width:112,
    height:112,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:70,
  },
})


export default Lesson;