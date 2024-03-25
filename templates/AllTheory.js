import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg';
import { statusBarH } from '../constants';
import CloseIcon from '../assets/images/closeIcon'
import { useNavigation } from '@react-navigation/native';
const AllTheory = ({route}) => {
    const navigation = useNavigation();
    const Close = () =>{
        navigation.goBack();
    };
    const {theoryData} = route.params;
    const Log = ()=>{
        console.log(theoryData);
    };
    const render = ({item}) => {
        return (              
                <View style={styles.container}>
                    <Text style={styles.text}>{item.text}</Text>
                    <View style={styles.image}>
                        <SvgUri uri={item.image}/>
                    </View>
                </View>           
        );
    };
  return (
    <View style={{flex:1, paddingTop:statusBarH}}>
        <TouchableOpacity style={{marginLeft:24,marginTop:10,}} onPress={Close}>
            <CloseIcon/>
        </TouchableOpacity>
        <View style={{flex:1, paddingHorizontal:24, alignItems:'center'}}>
            <FlatList renderItem={render} contentContainerStyle={styles.flatList} keyExtractor={(item)=>item.id} data={theoryData}/>
        </View>
    </View>
  )
}

export default AllTheory

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    flatList:{
        paddingTop:70,
    },
    image:{
        marginBottom:40,
    },
    text:{
        fontFamily:'Nunito-Medium',
        color:'black',
        fontSize:22,
        marginBottom:20,
    }
})