import React, { useContext, useEffect, useState } from "react";
import Svg, { Path } from 'react-native-svg';
import Welcome from './screens/theFirstLaunch/Welcome';
import WhichClass from './screens/theFirstLaunch/WhichClass';
import SignUp from './screens/theFirstLaunch/SignUp';
import SignIn from './screens/theFirstLaunch/SignIn';
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
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext"; 
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();


function InsideLayout() {
  return (
       <BottomTabs.Navigator 
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: '#fff', height:70,display:'flex'},
    }}>
      <BottomTabs.Screen name="Learn" component={Learn}
      
        options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
        <View>
          <HomeIcon height={28} width={28} fill={focused? "#6A54E9":"rgba(106, 84, 233, 0.2)"}/>
        </View>
    ), }}/>

      <BottomTabs.Screen name="Theory" component={Theory} options={{ 
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <TheoryIcon height={34} width={34} fill={focused? "#6A54E9":"white"}/>
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
  const { userToken } = useAuth();
  // const [userToken, setUserToken] = useState(null);
  // useEffect(() => {
  //   const checkUserLogin = async () => {
  //     const token = await ReactNativeAsyncStorage.getItem('userToken');  
  //     setUserToken(token);    
  //     console.log(userToken);
  //     // Подписка на изменения аутентификации
  //     const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
  //       if (user) {
  //         setUserToken(token);
  //       } else {
  //         setUserToken(null);
  //       }
  //     });

  //     return () => unsubscribe(); // Отмена подписки при размонтировании компонента
  //   };

  //   checkUserLogin();
  // }, []);
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
 