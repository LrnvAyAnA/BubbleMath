import React from "react";
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Registation from './screens/Registation';
import SignIn from './screens/SignIn'

import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return (
      <NavigationContainer>
        <Stack.Navigator
      screenOptions={{
        cardStyle: { flex: 1, backgroundColor: '#3A0480' },
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        gestureEnabled: true,
        // gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
         <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
         <Stack.Screen name="Registation" component={Registation} options={{ headerShown: false }}/>
         <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }