
import { Button, StyleSheet, Text, View,StatusBar} from 'react-native';
import React from 'react';
import Navigate from './navigate';
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  //StatusBar.setTranslucent(true);
  const [fontsLoaded] = useFonts({
    'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf')
  })
  if(!fontsLoaded){
    return undefined;
  }
  return (
    <AuthContextProvider>
      <Navigate/>
    </AuthContextProvider>
  );
}

