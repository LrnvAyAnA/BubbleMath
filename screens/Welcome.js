import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default function Welcome() {
    return (
      <View style={styles.container}>
        <Text>This is the Home screen</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });