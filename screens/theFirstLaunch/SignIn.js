import React,{useContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import MainBG from '../../assets/images/bg.svg';
import Back from '../../assets/images/Back.svg';
import OrangeBut from '../../assets/images/buttonFromMain.svg';
import Google_icon from '../../assets/images/google-icon.svg';
import Eye_close from '../../assets/images/eye-close.svg';
import Eye_open from '../../assets/images/eye-open.svg';
import { View, Text,StyleSheet,TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from '../../firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, useAuth } from '../../context/AuthContext';

//уже есть аккаунт
export default function SignIn() {
  const other = 'Или войти с помощью'
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const auth = FirebaseAuth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const { login } = useAuth();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email,password);
      const userToken = await getIdToken(response.user);
      login(userToken);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

    return (
      <View style={styles.container}>
        <MainBG style={styles.background}/>
        <View style={styles.head}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backBut}>
          <Back width={40} height={20}/>
        </TouchableOpacity>
        </View>
        
        <Text style={styles.text}>Войти</Text>
        <View style={[styles.inputContainer, {borderColor: isFocused === 'email' ? '#fff' : 'rgba(255, 255, 255, 0.5)'}]} >
        <TextInput 
        style={styles.input} 
        onFocus={() => handleFocus('email')} 
        onBlur={handleBlur} 
        placeholder='E-mail' 
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'} 
        selectionColor={'rgba(255, 255, 255, 0.5)'} 
        value={email} 
        onChangeText={(text) => setEmail(text.trim())}
         />

        </View>
        <View style={styles.passContainer}>
        <View style={[styles.inputContainer, { borderColor: isFocused === 'password' ? '#fff' : 'rgba(255, 255, 255, 0.5)' }]}>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            placeholder="Пароль"
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            selectionColor={'rgba(255, 255, 255, 0.5)'}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
      <TouchableOpacity>
        <Text style={styles.otherText}>Не помню пароль</Text>
      </TouchableOpacity>
        <View style={styles.signUpBut}>
          {loading?( <ActivityIndicator size={'large'} color={'#000'}/>):(
          <><TouchableOpacity onPress={handleLogin}>
          <OrangeBut width={320} height={87} />
        <Text style={styles.signUpText}>Войти</Text>
      </TouchableOpacity></>)}
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
      flexDirection: 'row',
      alignItems: 'center',
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