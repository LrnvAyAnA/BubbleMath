import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const widthScreen = Dimensions.get('screen').width*0.88;
const ProgressBar = ({curProgress,num}) => {
  const width = useSharedValue(0);
  useEffect(()=>{
    if(curProgress!=1){
    width.value = withTiming(width.value + widthScreen/num);
  }
  },[curProgress])
  return (
    <View style={styles.container}>
        <Animated.View style={{ ...styles.progress, width }}/>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    container:{
        height:16,
        width:widthScreen,
        borderRadius:20,
        backgroundColor:'#E7E2FB',
        alignItems:'flex-start',
    },
    progress:{
        height:16,
        width:50,
        borderRadius:20,
        backgroundColor:'#866AF6',
    },
})
