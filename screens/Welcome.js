import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground,View, Text,StyleSheet,TouchableOpacity, Button,Image, TouchableHighlight } from 'react-native';
import OrangeBut from '../assets/images/buttonFromMain.svg';

export default function Welcome({navigation}) {
  const text = 'изучай\nматематику\nвесело\nи эффективно!';
  const toSignUp=()=>{
    navigation.navigate('SignUp');
  }
  const toSignIn=()=>{
    navigation.navigate('SignIn');
  }
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')}style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>{text.toUpperCase()}</Text>
          <View style={styles.buttonCont}>
          <TouchableOpacity onPress={toSignUp}>
              <OrangeBut width={320} height={87} />
            <Text style={styles.buttonContText}>Продолжить</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.buttonNewAcc}>
            <TouchableOpacity onPress={toSignIn}>
              <Text style={styles.buttonNewAccText}>Уже есть аккаунт</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      // alignItems: 'flex-start',
    },
    text:{
      color: '#fff',
      fontSize:32,
      marginLeft:24,
      marginTop:385,
      marginBottom:52,
      fontFamily:'Nunito-Black'
    },
    buttonCont:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      marginBottom:24,    
    },
    buttonContText: {
      marginTop:-65,
      color: '#fff',
      fontSize: 22,
      alignSelf:'center',
      fontFamily:'Nunito-ExtraBold'
    },
    buttonNewAcc:{
      flex:1,
    },
    buttonNewAccText:{
      color: '#fff',
      fontSize:22,
      alignSelf:'center',
      fontFamily:'Nunito-ExtraBold'
    }
  });
