import React, { useContext, useEffect, useState } from "react";
import Svg, { Path } from 'react-native-svg';
import Welcome from './screens/theFirstLaunch/Welcome';
import WhichClass from './screens/theFirstLaunch/WhichClass';
import SignUp from './screens/theFirstLaunch/SignUp';
import SignIn from './screens/theFirstLaunch/SignIn';
import ChangeClass from './screens/windows/ChangeClass';
import Learn from "./screens/Learn";
import TheoryTemp from "./templates/Theory";
import HomeIcon from "./assets/images/HomeIcon.svg"
import HomeIconOff from './assets/images/HomeIconOff'
import TheoryIcon from './assets/images/TheoryIcon'
import TheoryIconOff from "./assets/images/TheoryIconOff.svg"
import ProfileIcon from './assets/images/ProfileIcon'
import ProfileIconOff from "./assets/images/ProfileIconOff.svg"
import { LessonScreen } from "./screens/LessonScreen";


import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./firebase";
import Theory from "./screens/Theory";
import Profile from "./screens/Profile";
import { View, StyleSheet, } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext"; 

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const LessonRoute = createStackNavigator();
export const TABBAR_HEIGHT = 70;

function InsideLayout() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Lesson' component={LessonMain} options={{ headerShown: false }}/>
        <Stack.Screen name='TheoryTemp' component={TheoryTemp} options={{ headerShown: false,  }}/>
      </Stack.Navigator>
  );
}

function LessonMain() {
  return (
       <BottomTabs.Navigator 
    screenOptions={{ tabBarHideOnKeyboard:true,
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: '#fff', height:TABBAR_HEIGHT,display:'flex'},
    }}>
      <BottomTabs.Screen name="Learn" component={Learn}
      
        options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
        <View>{focused? <HomeIcon height={28} width={28} fill={"#6A54E9"}/>:<HomeIconOff/>}
        </View>
    ), }}/>

      <BottomTabs.Screen name="Theory" component={Theory} options={{ 
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            {focused? <TheoryIcon/>:<TheoryIconOff height={34} width={34} fill={"#6A54E9"}/>}
          </View>
      ), }}/>
      <BottomTabs.Screen name="Profile" component={Profile} options={{ headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View>
          {focused? <ProfileIcon/>:<ProfileIconOff height={34} width={34} fill={"white"}/>}
        </View>
    ), }}/>
    </BottomTabs.Navigator>   
  );
}
export default function Navigate() {
  const { userToken } = useAuth();
  return (
    <NavigationContainer>
      {userToken  ? ( <InsideLayout/> ) : ( <Stack.Navigator
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
          <Stack.Screen name="WhichClass" component={WhichClass} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="ChangeClass" component={ChangeClass} options={{ headerShown: false }} />
        </Stack.Navigator> )}
    </NavigationContainer>
  );
}
 