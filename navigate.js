import React from "react";
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
         <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }