import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import MainBG from '../assets/images/bg.svg';
import Back from '../assets/images/Back.svg';
import OrangeBut from '../assets/images/buttonFromMain.svg';
import Google_icon from '../assets/images/google-icon.svg';
import Eye_close from '../assets/images/eye-close.svg';
import Eye_open from '../assets/images/eye-open.svg';
import { View, Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native';

//уже есть аккаунт
export default function SignIn() {
  const other = 'Или зарегистрироваться\nс помощью'
  //навигация
  const navigation = useNavigation();
  const toBack = ()=>{
    navigation.goBack();
  };

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  
  const [isEyeClose, setIsEyeClose] = useState(true);

  const toggleEye = () => {
    setIsEyeClose((prevIsEyeClose) => !prevIsEyeClose);
  };


  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const handleInputChange = (inputName, text) => {
    // Обработчик изменения текста в TextInput
    switch (inputName) {
      case 'input1':
        setInput1(text);
        break;
      case 'input2':
        setInput2(text);
        break;
      default:
        break;
    }};
    return (
      <View style={styles.container}>
        <MainBG style={styles.background}/>
        <View style={styles.head}>
        <TouchableOpacity onPress={toBack} style={styles.backBut}>
          <Back width={40} height={20}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.text}>Регистрация</Text>
        <TextInput style={[styles.input, {borderColor: isFocused === 'input1' ? '#fff' : 'rgba(255, 255, 255, 0.5)'}]} 
                            onFocus={() => handleFocus('input1')} onBlur={handleBlur} placeholder='E-mail' placeholderTextColor={'rgba(255, 255, 255, 0.5)' } 
                            selectionColor={'rgba(255, 255, 255, 0.5)'} value={input1} onChangeText={(text) => handleInputChange('input1', text)}/>
        <View style={styles.passContainer}>
        <TextInput style={[styles.input, {borderColor: isFocused === 'input2' ? '#fff' : 'rgba(255, 255, 255, 0.5)'}]} 
                            onFocus={() => handleFocus('input2')} onBlur={handleBlur} placeholder='Пароль' placeholderTextColor={'rgba(255, 255, 255, 0.5)' } 
                            selectionColor={'rgba(255, 255, 255, 0.5)'} value={input2} onChangeText={(text) => handleInputChange('input2', text)}/>
                            <TouchableOpacity onPress={toggleEye} style={styles.eye}>
                              {isEyeClose ?  <Eye_close />:<Eye_open />}
                            </TouchableOpacity>
        </View>
        <View style={styles.signUpBut}>
          <TouchableOpacity>
              <OrangeBut width={320} height={87} />
            <Text style={styles.signUpText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.otherText}>{other}</Text>
        <TouchableOpacity style={styles.googleBut}>
          <Google_icon width={30} height={32}/>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container:{
      justifyContent:'flex-start',
      flex: 1,
    },
    head:{
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingHorizontal:24,
      paddingVertical:52,
    },
    backBut:{
      marginBottom: 0,
    },
    background: {
      ...StyleSheet.absoluteFillObject,
    },
    text:{
      color:'#fff',
      fontFamily:'Nunito-ExtraBold',
      fontSize: 32,
      alignSelf:'center', 
      marginBottom: 52,    
    },
    input:{
      width:320,
      height:70,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth:2,
      paddingLeft:35,
      alignSelf:'center',
      borderRadius: 20,
      fontFamily:'Nunito-Medium',
      fontSize:22,
      color:'#fff',
      marginBottom:28
    },
    signUpBut:{
      alignItems:'center',
      marginTop: 12,
      marginBottom:80,
    },
    signUpText:{
      marginTop: -65,
      color: '#fff',
      fontSize: 22,
      alignSelf: 'center',
      fontFamily: 'Nunito-ExtraBold'
    },
    skipText:{
      fontFamily: 'Nunito-Medium',
      fontSize: 20,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    otherText:{
      fontFamily:'Nunito-Medium',
      fontSize:20,
      color:'#fff',
      textAlign:'center',
      marginBottom:32
    },
    googleBut:{
      width:320,
      height:78,
      borderRadius:100,
      backgroundColor:'#fff',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    googleText:{
      fontFamily:'Nunito-ExtraBold',
      fontSize:22,
      color:'#24044F',
      marginLeft:14
    },
    
    eye:{
      width:50,
      position:'absolute',
      top:20,
      right:40,
      alignItems:'center',
      alignSelf:'flex-end',
    }
  })