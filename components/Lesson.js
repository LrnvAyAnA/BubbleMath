import React from "react";
import { View,StyleSheet,TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Lesson=()=>{
  return(
    <TouchableHighlight >
      <View style={styles.circle}>
      <LinearGradient colors={['#866AF6', '#6F57FF']}
      style={styles.littleCircle}>

      </LinearGradient>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
    borderRadius:70,
  },
})


export default Lesson;