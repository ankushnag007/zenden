import { StackActions } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Animated, Text } from 'react-native';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Intro'));
    }, 5000);
  }, [navigation]);

  const bike = require('../../../AppAssests/Images/intro1.png');

  // Animated value for the image size
  const imageSize = useRef(new Animated.Value(90)).current; // Initial size 90
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Animate the size from 90 to 200 over 2000 milliseconds (2 seconds)
    Animated.timing(imageSize, {
      toValue: 200, // Target size
      duration: 2000, // Duration in milliseconds
      useNativeDriver: false, // Use native driver for better performance
    }).start(() => setAnimationComplete(true)); // Set animationComplete to true when animation finishes
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Animated.Image
        source={bike}
        style={[styles.image, { width: imageSize, height: imageSize }]}
        resizeMode={'contain'}
      />
      {animationComplete && (
        <Text style={styles.logoText}>Shoppers</Text>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  image: {
    resizeMode: 'contain',
    // borderRadius: 200,
    shadowColor: 'gray',
    borderWidth: 2,
    top:100,
    height:40,
    width:40
  },
  logoText: {
    marginTop: 80, // Adjust as needed
    fontSize: 24, // Adjust as needed
    fontWeight: 'Bold',
    color: 'orange', // Adjust as needed
  },
});
