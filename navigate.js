import React, { useEffect, useState } from "react";
import Svg, { Path } from 'react-native-svg';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Registation from './screens/Registation';
import SignIn from './screens/SignIn';
import ChangeClass from './screens/windows/ChangeClass';
import Learn from "./screens/Learn";
import HomeIcon from "./assets/images/HomeIcon.svg"
import TheoryIcon from "./assets/images/TheoryIcon.svg"
import ProfileIcon from "./assets/images/ProfileIcon.svg"


import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./firebase";
import Theory from "./screens/Theory";
import Profile from "./screens/Profile";
import { View, StyleSheet, } from "react-native";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
export const useHide = (initialHide) => {
  const [hide, setHide] = useState(initialHide);

  const toggleDropdown = () => {
    setHide(!hide);
  };

  return { hide, toggleDropdown };
};

function InsideLayout() {
  return (
       <BottomTabs.Navigator 
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: '#1C043D', height:70, borderRadius:0, borderColor:'#1C043D',display:'flex'},
    }}>
      <BottomTabs.Screen name="Learn" component={Learn}
      
        options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
        <View>
          <HomeIcon height={28} width={28} fill={focused? "white":"rgba(255, 255, 255, 0.5)"}/>
        </View>
    ), }}/>

      <BottomTabs.Screen name="Theory" component={Theory} options={{ 
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <TheoryIcon height={34} width={34} fill={focused? "white":"rgba(255, 255, 255, 0.5)"}/>
          </View>
      ), }}/>
      <BottomTabs.Screen name="Profile" component={Profile} options={{ headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View>
          <ProfileIcon height={34} width={34} fill={focused? "white":"rgba(255, 255, 255, 0.5)"}/>
        </View>
    ), }}/>
    </BottomTabs.Navigator>   
  );
}

export default function Navigate() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      setUser(user);
      console.log('user', user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <InsideLayout/>
      ) : (
        <Stack.Navigator
          screenOptions={{
            cardStyle: { flex: 1, backgroundColor: '#3A0480' },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Registation" component={Registation} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="ChangeClass" component={ChangeClass} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
