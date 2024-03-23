import React, { useState } from "react";
import { View,StyleSheet,TouchableOpacity,Text, TextInput } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SearchIcon from "../assets/images/search.svg"

const SearchComponent=({onSubmit, setFoundIndex})=>{
  const [searchQuery, setSearchQuery] = useState('');
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(()=>{
    return {
      width:animation.value==1?withTiming(250,{duration:500}):withTiming(0,{duration:500})
    }
  });
  const handleChangeText = (text) => {
    setSearchQuery(text);
  };

  const handleSubmit = () => {
    onSubmit(searchQuery);
    setFoundIndex(0);
  };

  return(
    <View style={styles.container}>
      <Animated.View style={[styles.animView,animatedStyle]}>
       <View style={{padding:15}}>
       <TextInput cursorColor={'#6A54E9'}
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        value={searchQuery}
      />
       </View>
       
      <TouchableOpacity style={styles.searchBut} onPress={()=>{if(animation.value==1) {animation.value=0} else {animation.value=1}}}>
        <SearchIcon/>
      </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  animView:{
    height:50,
    width:250,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:'#d8dfe5',
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    width:150,
    height:40,
  },
  searchBut:{
    // backgroundColor:'#000',
    position:'absolute',
    //right:0,
    alignItems:'center',
    justifyContent:'center',
    width:34,
    height:32,
  },
})