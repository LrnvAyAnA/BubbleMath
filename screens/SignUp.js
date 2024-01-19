import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity,StyleSheet,ImageBackground } from 'react-native';
//продолжить
import OrangeBut from '../assets/images/buttonFromMain.svg';
import MainBG from '../assets/images/bg.svg';
import Back from '../assets/images/Back.svg';

export default function SignUp() {

  const navigation = useNavigation();
  const toBack = ()=>{
    navigation.goBack();
  };
//список классов
  const [selectedButton, setSelectedButton] = useState(null);
  const handlePress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };
  const renderButton = (buttonIndex, buttonText) => (
    <TouchableOpacity key={buttonIndex} onPress={() => handlePress(buttonIndex)} style={[styles.button, selectedButton === buttonIndex && styles.selectedButton]}>
      <Text style={[styles.buttonText,selectedButton===buttonIndex&& styles.selectedButtonText]}>{buttonText}</Text>
    </TouchableOpacity>
  );
  
    return (
      
      <View style={styles.container}>
        <MainBG style={styles.background}/>
        <TouchableOpacity onPress={toBack} style={styles.backBut}>
          <Back width={40} height={20}/>
        </TouchableOpacity>
        <Text style={styles.text}>В каком ты классе?</Text>        
        <View style={styles.classes}>
          {renderButton(1, '1 класс')}
          {renderButton(2, '2 класс')}
          {renderButton(3, '3 класс')}
          {renderButton(4, '4 класс')}
        </View>
        <View style={styles.chooseBut}>
          <TouchableOpacity >
              <OrangeBut width={320} height={87} />
            <Text style={styles.chooseText}>Выбрать</Text>
          </TouchableOpacity>
        </View>
      </View>
      

    );
  }
  const styles = StyleSheet.create({
    container:{
      justifyContent:'flex-start',
      flex: 1,
    },
    background: {
      ...StyleSheet.absoluteFillObject,
    },
    backBut:{
      marginTop: 52,
      marginLeft: 24,
      marginBottom: 61,
    },
    text:{
      color:'#fff',
      fontFamily:'Nunito-ExtraBold',
      fontSize: 32,
      alignSelf:'center', 
      marginBottom: 52,    
    },
    button:{
      width: 320,
      height: 70,
      borderRadius: 100,
      backgroundColor:'transparent',
      borderColor:'rgba(255, 255, 255, 0.5)',
      borderWidth: 2,
      alignSelf:'center',
      marginBottom:28,
      justifyContent:'center',
    },
    buttonText:{     
      fontFamily:'Nunito-Medium',
      color:'#fff',
      fontSize: 20,
      paddingLeft: 40,
    },
    classes:{
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    selectedButton: {
      backgroundColor: '#fff',
      borderColor:'#fff'
    },
    selectedButtonText:{
      color:'#24044F',
    },
    chooseText:{
      marginTop:-65,
      color: '#fff',
      fontSize: 22,
      alignSelf:'center',
      fontFamily:'Nunito-ExtraBold'
    },
    chooseBut:{
      alignSelf:'center',
      marginTop: 25,
    }
  })