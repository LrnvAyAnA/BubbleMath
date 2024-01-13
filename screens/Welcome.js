import React from 'react';
import { ImageBackground,View, Text,StyleSheet,TouchableOpacity, Button,Image, TouchableHighlight } from 'react-native';
import OrangeBut from '../assets/buttonFromMain.svg';

export default function Welcome() {
  const text = 'изучай\nматематику\nвесело\nи эффективно!';
    return (
      <ImageBackground source={require('../assets/bg.jpg')}style={styles.background}>
        <View style={styles.container}>
        <Text style={styles.text}>{text.toUpperCase()}</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <OrangeBut width={337} height={87} />
          <Text style={styles.buttonText}>Продолжить</Text>
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
      // flex: 1,
      // alignItems: 'flex-start',
    },
    text:{
      color: '#ffffff',
      fontSize:36,
      marginLeft:24,
      marginTop:400,
    },
    buttonContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',      
    },
    buttonText: {
      marginTop:-50,
      color: '#fff',
      fontSize: 22,
      alignSelf:'center'
    },
  });
