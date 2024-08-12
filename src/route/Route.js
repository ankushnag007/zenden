import AuthStack from '../route/AuthStack';
import HomeStack from '../route/HomeStack';
import { StatusBar, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';


const Route = () => {
const token = "dfedg3r3453453454234"
  return (
  <>
      {!token ? (
        <AuthStack />
      ) : (
        <HomeStack/>        
      )}
      </>
  );
};

export default Route;
