import React, { useEffect, useState } from "react";
import { View,StyleSheet,TouchableHighlight,Text, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

const ITEMLESSON_SIZE = 134;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const Lesson=({number,contentOffset, index, title, onPress})=>{
  const [isCentered, setIsCentered] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // if (!isCentered && contentOffset.value >= (index - 1) * 251 && contentOffset.value <= (index + 1) * 251) {
      //   setIsCentered(true);
      //   console.log('from:',(index - 1) * 251,'to:', (index + 1) * 251)
      // } else if (isCentered && (contentOffset.value < (index - 1) * 251 || contentOffset.value > (index + 1) * 251)) {
      //   setIsCentered(false);
      // }
      console.log(index);
    };

    handleScroll();

    return () => {
      // Очищаем обработчик при размонтировании компонента
    };
  }, [contentOffset.value]);
  // const rStyle = useAnimatedStyle(()=>{
  //   const inputRange = [
  //     (index - 1) * 251,
  //     index * 251,
  //     (index + 1) * 251,
  //   ];

  //   const translateYOutputRange = [
  //    0.8, // масштаб 90% от исходного
  //     1,   // исходный масштаб
  //    0.8, // масштаб 90% от исходного
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
  return(
    <Animated.View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
      <View style={styles.circle}>
      <LinearGradient colors={['#866AF6', '#6F57FF']}
      style={styles.littleCircle}>
        <View>
          <Text style={styles.text}>{number}</Text>
        </View>
      </LinearGradient>
      </View>
    </TouchableHighlight>
    
    </Animated.View>
  );
};

const styles = StyleSheet.create({

  littleCircleCur:{
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
  circleCur:{
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
  },
  container:
  {
    alignItems:'center',
    // backgroundColor:'red',
    justifyContent:'center',
    marginBottom:24,
  },
  text:{
    color:'#fff',
    fontSize:54,
    fontFamily:'Nunito-ExtraBold',
    textAlign:'center',
  },
  circle:{
    width:ITEMLESSON_SIZE,
    height:ITEMLESSON_SIZE,
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