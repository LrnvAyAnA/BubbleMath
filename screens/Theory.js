import React from 'react';
import { Text, View,StyleSheet, ImageBackground } from 'react-native';

export default function Theory(){
return(
  <View style={styles.background}>
            <Text style={styles.text}>Theory</Text>
</View>
)
}
const styles = StyleSheet.create({
background:{
    backgroundColor:'#24044F',
    flex:1,
},
text:{
  fontSize:50,
  textAlign:'center',
  flex:1,
  textAlignVertical:'center',
  color:'white'
}
})