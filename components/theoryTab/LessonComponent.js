import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LessonComponent = ({ numberLesson, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.sectionContainer} onPress={onPress}>
          <Text style={styles.sectionTextOne}>{numberLesson}</Text>
          <Text style={styles.sectionTextTwo}>{text}</Text>
        </TouchableOpacity>
      );
}

export default LessonComponent

const styles = StyleSheet.create({
    sectionContainer:{
        backgroundColor:'#fff',
        borderRadius:100,
        width:'100%',
        height:72,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:24,
        marginBottom:16,
    },
    sectionTextOne:{
        fontSize:32,
        color:'#6A54E9',
        fontFamily:'Nunito-Bold',
        marginRight:24,
    },
    sectionTextTwo:{
        fontFamily:'Nunito-Bold',
        fontSize:16,
        color:'black',
    }
})