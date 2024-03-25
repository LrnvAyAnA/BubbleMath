import React, { useContext } from 'react';
import { Text, View,StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoutButton from '../components/LogoutButton'
import Settings from '../assets/images/Settings'
import ProfImage from '../assets/images/ProfImage'
import {statusBarH, HEADER_HEIGHT} from '../constants'
import { AuthContext } from '../context/AuthContext';
// import { Circle, Svg } from 'react-native-svg';
import CircularProgress from 'react-native-circular-progress-indicator';


export default function Profile(){
  const {deleteU} = useContext(AuthContext);
const value = 33;
  return(
    <View style={styles.background}>
      <View style={styles.topPanel}>
        <View style={{height:statusBarH, width:'100%'}}/>
        <View style={styles.elements}>
          <Text style={styles.topPanelText}>Профиль</Text>
          <TouchableOpacity style={styles.settings}>
            <Settings/>
          </TouchableOpacity>
        </View>
      </View> 
      <View style={styles.containerContent}>
        <ProfImage/>
        <Text style={styles.textContent}>Ученик</Text>
      </View>
      <View style={styles.containerButtons}>
        <LogoutButton/>
        <TouchableOpacity onPress={deleteU}>
          <Text style={styles.butDeleteText}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  }
  const styles = StyleSheet.create({
  topPanel:{
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'#6A54E9',
    width:'100%',
    height:HEADER_HEIGHT,
  },
  elements:{
      flex:1,
      width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:24,
  },
  topPanelText:{
    color:'#fff',
    fontFamily:'Nunito-ExtraBold',
    fontSize:22,
  },
  containerContent:{
    alignItems:'center',
    top:48,
  },
  textContent:{
    fontSize:24,
    fontFamily:'Nunito-Medium',
    color:'#fff',
    top:20,
  },
  background:{
      backgroundColor:'#370C70',
      flex:1,
  },
  containerButtons:{
    position:'absolute',
    bottom:48,
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center', 
  },
  text:{
    fontSize:50,
    textAlign:'center',
    flex:1,
    textAlignVertical:'center',
    color:'white'
  },
  butDeleteText:{
    marginTop:20,
    color:'#fff',
    fontFamily:'Nunito-ExtraBold',
    fontSize:22,
  }
  })