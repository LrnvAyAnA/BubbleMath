import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
 const SectionComponent=({ numberSection, name })=>{
    return (
    <LinearGradient colors={['#DCDAFF', '#F5F3FD']} style={styles.gradient}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTextOne}>{numberSection} раздел</Text>
        <Text style={styles.sectionTextTwo}>{name}</Text>
      </View>
    </LinearGradient>
    );
};

  const styles = StyleSheet.create({
    gradient:{
        height:140,
        marginTop:48,
        justifyContent:'flex-start',
        alignItems:'center',
        borderRadius:60,
        
      },
      sectionContainer:{
        top:20,
        alignItems:'center',
        marginHorizontal:20,
      },
      sectionTextOne:{
        fontFamily:'Nunito-ExtraBold',
        fontSize: 20,
        color:'#24044F'
      },
      sectionTextTwo:{
        textAlign:'center',
        fontFamily:'Nunito-ExtraBold',
        fontSize: 22,
        color:'#24044F',
      },
  })
  export default SectionComponent;