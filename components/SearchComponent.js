import React, { useState } from "react";
import { View,StyleSheet,TouchableOpacity,Text, TextInput } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SearchIconOpen from '../assets/images/SearchOpen';
import SearchIcon from "../assets/images/search.svg"

const SearchComponent=({widthBar, onSearch })=>{
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };
  const animation = useSharedValue(0);
  const [value,setValue] = useState(0);

  const animatedStyle = useAnimatedStyle(()=>{
    return {
      width:animation.value==1
      ? withTiming(widthBar,{duration:500})
      : withTiming(0,{duration:500})
    }
  });
  return(
    <View style={styles.container}>
      <Animated.View style={[styles.animView,animatedStyle]}>   
      <TouchableOpacity style={styles.searchBut} onPress={()=>{if (animation.value==1) 
                                                                  {animation.value=0;
                                                                    setValue(0);
                                                                  } 
                                                              else {animation.value=1
                                                                setValue(1)
                                                                }}}>
        {value==1 ? <SearchIconOpen width={52}/>:<SearchIcon/>}
      </TouchableOpacity>
      <TextInput cursorColor={'#6A54E9'}
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleSearchChange}
        value={searchQuery}
      />
      </Animated.View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  animView:{
    height:50,
    backgroundColor:'#fff',
    borderRadius:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  input:{
    marginLeft:10,
    width:'80%',
    height:40,
  },
  searchBut:{
    position:'absolute',
    right:0,
  },

})