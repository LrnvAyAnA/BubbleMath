import { createStackNavigator } from '@react-navigation/stack';
//import LessonContent from './LessonContent';

const Stack = createStackNavigator();

export function LessonScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LessonContent"
        //component={LessonContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
