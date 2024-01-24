import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import MainBG from '../assets/images/bg.svg';
import Back from '../assets/images/Back.svg';
import OrangeBut from '../assets/images/buttonFromMain.svg';
import Google_icon from '../assets/images/google-icon.svg';
import Eye_close from '../assets/images/eye-close.svg';
import Eye_open from '../assets/images/eye-open.svg';
import { View, Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native';

//регистрация
export default function Registation() {
  const other = 'Или зарегистрироваться\nс помощью'
  //навигация
  const navig = useNavigation();
  const toBack = ()=>{
    navig.goBack();
  };
  const toChooseClass=()=>{
    navig.navigate('SignUp');
  }

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <TouchableOpacity onPress={toChooseClass}>
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.text}>Регистрация</Text>
        <View style={[styles.inputContainer, {borderColor: isFocused === 'input1' ? '#fff' : 'rgba(255, 255, 255, 0.5)'}]} >
        <TextInput style={styles.input} 
                            onFocus={() => handleFocus('input1')} onBlur={handleBlur} placeholder='E-mail' placeholderTextColor={'rgba(255, 255, 255, 0.5)' } 
                            selectionColor={'rgba(255, 255, 255, 0.5)'} value={input1} onChangeText={(text) => handleInputChange('input1', text)}/>
        </View>
        <View style={styles.passContainer}>
        <View style={[styles.inputContainer, { borderColor: isFocused === 'input2' ? '#fff' : 'rgba(255, 255, 255, 0.5)' }]}>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus('input2')}
            onBlur={handleBlur}
            placeholder="Пароль"
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            selectionColor={'rgba(255, 255, 255, 0.5)'}
            value={input2}
            onChangeText={(text) => handleInputChange('input2', text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eye} onPress={togglePasswordVisibility}>
            {showPassword ? (
              <Eye_open width={32} height={32} />
            ) : (
              <Eye_close width={32} height={32} />
            )}
          </TouchableOpacity>
        </View>
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
    passContainer: {
      position: 'relative',
      
    },
    inputContainer: {
      flexDirection: 'row', // Добавьте направление row
      alignItems: 'center', // Чтобы иконка глаза была выровнена вертикально
      borderWidth: 2,
      borderRadius: 20,
      marginBottom: 28,
      width:320,
      height:70,
      alignSelf:'center'
    },
    input: {
      flex: 1,
      paddingLeft: 35,
      fontFamily: 'Nunito-Medium',
      fontSize: 22,
      color: '#fff',
      paddingVertical: 10,
      
    },
    eye:{
      padding:20,  
    }
  })
