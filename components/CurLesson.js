import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";

const CurLesson=({ lessonNumber, title })=>{//  status
  return(
    <TouchableOpacity style={styles.circle}>
    <View style={styles.littleCircle}>
      <Text style={styles.numles}>{lessonNumber} урок</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>Начать</Text>
    </View>
  </TouchableOpacity>
      
  );
};
const styles = StyleSheet.create({
  littleCircle:{
    alignSelf:'center',
    backgroundColor:'white',
    width:270,
    height:270,
    borderRadius:200,
    paddingLeft: 29,
    paddingRight:29,
    alignItems:'center',
    justifyContent:'center',
  },
  circle:{
    width:310,
    height:310,
    backgroundColor:'#EDEBFC',
    borderRadius:200,
    justifyContent:'center',   
    alignSelf:'center',
    marginBottom:24,
  },
  numles:{
    color:'#6A54E9',
    fontFamily:'Nunito-Medium',
    fontSize:22,
  },
  title:{
    textAlign:'center',
    color:'#6A54E9',
    fontFamily:'Nunito-ExtraBold',
    fontSize:30,
  },
  status:{   
    marginTop:20,
    color:'#3D2A73',
    fontFamily:'Nunito-ExtraBold',
    fontSize:34,
  }
})
export default CurLesson; 
