import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default function SignIn() {
    return (
      <View style={styles.container}>
        <Text>This is the SignIn screen</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    }
  })