import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SectionComponent = ({ numberSection, name }) => {
    return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTextOne}>Раздел {numberSection}</Text>
          <Text style={styles.sectionTextTwo}>{name}</Text>
        </View>
      );
}

export default SectionComponent

const styles = StyleSheet.create({
    sectionContainer:{
        marginBottom:16,
        width:'100%',
        backgroundColor:'#fff',
        height:130,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:24,
        borderRadius:20,
    },
    sectionTextOne:{
        fontFamily:'Nunito-Bold',
        fontSize:20,
        color:'#6A54E9',
    },
    sectionTextTwo:{
        fontFamily:'Nunito-Bold',
        fontSize:22,
        color:'#6A54E9',
        textAlign:'center',
    },
})