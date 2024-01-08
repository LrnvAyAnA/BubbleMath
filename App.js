import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View ,TouchableHighlight} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableHighlight
      // onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: "#000" }]}
      underlayColor="#3D9140">
      <Text style={styles.buttonText}>{"title"}</Text>
    </TouchableHighlight>
      <Text>Hi</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{

  },
});
