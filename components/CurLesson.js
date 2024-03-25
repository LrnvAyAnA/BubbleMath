import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Animated,{ interpolate, useAnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
const CurLesson=({ lessonNumber, title, onpress, contentOffset, index, percentOfCompleted })=>{//  status
  // useEffect(()=>{
  //   const handleScroll = () =>{
  //     console.log(index);
  //   };
  //   handleScroll();
  // },[contentOffset, index]);
  // const rStyle = useAnimatedStyle(()=>{
  //   const inputRange = [
  //     (index - 1) * 251,
  //     index * 251,
  //     (index + 1) * 251,
  //   ];

  //   const translateYOutputRange = [
  //     0.9, // масштаб 90% от исходного
  //     1,   // исходный масштаб
  //     0.9, // масштаб 90% от исходного
  //   ];

  //   const translateX = interpolate(
  //     contentOffset.value,
  //     inputRange,
  //     translateYOutputRange,
  //   );

  // return { 
  //   transform: [{ scale:translateX }],
  // };
  // })
  const [value, setValue] = useState(0);

  return(
       <TouchableOpacity style={styles.circle} onPress={onpress}>
        <View style={{position:'absolute',zIndex:1,alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
        <CircularProgress
        showProgressValue={false}
        value={value}
        radius={150}
        progressValueColor={'#EDEBFC'}
        activeStrokeColor={'#6A54E9'}
        inActiveStrokeColor={'transparent'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={40}
        activeStrokeWidth={15}
        duration={700}       
        />
        </View>
          <View style={styles.littleCircle}>
          <Text style={styles.numles}>{lessonNumber} урок</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.status}>Начать</Text>
        </View>
        
       </TouchableOpacity> 
      
    
       
  );
};
const styles = StyleSheet.create({
  container:
  {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  medCircle:{
    width:285,
    height:285,
    borderRadius:200,
    alignSelf:'center',
    backgroundColor:'transparent',
    borderColor:'#6A54E9',
    borderWidth:4,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    zIndex:1,
  },
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


// return(
//   <TouchableOpacity style={styles.circle} onPress={onpress}>
//     <View style={styles.medCircle}>
//     <View style={styles.littleCircle}>
//       <Text style={styles.numles}>{lessonNumber} урок</Text>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.status}>Начать</Text>
//     </View>
//     </View>
//   </TouchableOpacity>
// );
// };
// const styles = StyleSheet.create({
// container:
// {
// alignItems:'center',
// // backgroundColor:'red',
// justifyContent:'center',
// },
// medCircle:{
// width:285,
// height:285,
// borderRadius:200,
// alignSelf:'center',
// backgroundColor:'transparent',
// borderColor:'#6A54E9',
// borderWidth:4,
// alignItems:'center',
// justifyContent:'center',
// position:'absolute',
// zIndex:1,
// },
// littleCircle:{
// alignSelf:'center',
// backgroundColor:'white',
// width:270,
// height:270,
// borderRadius:200,
// paddingLeft: 29,
// paddingRight:29,
// alignItems:'center',
// justifyContent:'center',
// },
// circle:{
// width:310,
// height:310,
// backgroundColor:'#EDEBFC',
// borderRadius:200,
// justifyContent:'center',   
// alignSelf:'center',
// marginBottom:24,
// },
// numles:{
// color:'#6A54E9',
// fontFamily:'Nunito-Medium',
// fontSize:22,
// },
// title:{
// textAlign:'center',
// color:'#6A54E9',
// fontFamily:'Nunito-ExtraBold',
// fontSize:30,
// },
// status:{   
// marginTop:20,
// color:'#3D2A73',
// fontFamily:'Nunito-ExtraBold',
// fontSize:34,
// }
// })
// export default CurLesson; 
