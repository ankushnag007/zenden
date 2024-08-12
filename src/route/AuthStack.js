import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../sreeens/AuthScreens/splash';
import Login from '../sreeens/AuthScreens/LoginScreen';
import Register from '../sreeens/AuthScreens/RegisterScreen/index';
import Intro from '../sreeens/AuthScreens/WelcomeScreen/introScreen';
import ForgotPassword from '../sreeens/AuthScreens/ForgetPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false, statusBarColor:'orange' }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{ headerShown: true }}
      />


    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
