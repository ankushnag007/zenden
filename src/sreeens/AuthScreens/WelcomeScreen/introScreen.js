import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ImageBackground, StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import st from '../../../global/styles/styles';

const Intro = ({navigation,disabled}) => {
  const onDone = () => {
    navigation.navigate('LoginScreen');
  };
  const onSkip = () => {
    navigation.navigate('LoginScreen');
  };

  const RenderNextButton = () => {
    return (
      <View  style={[
        {
          borderRadius: 50,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 28,
          backgroundColor: disabled ? colors.grey : '#f9b100',
          padding: 10,
        },
      ]}>
        <Text style={[st.tx16,{color:'#fff'}]}>Next</Text>
          </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View
      //  style={styles.buttonCircle}
      style={[
          {
            borderRadius: 50,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 28,
            backgroundColor: disabled ? colors.grey : '#f9b100',
            padding: 10,
          },
        ]}>
        <Text style={[st.tx16,{color:'#fff'}]}>Finish</Text>
      </View>
    );
  };

  const RenderSkipButton = () => {
    return (
        <View style={[
          {
            borderRadius: 50,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 28,
            backgroundColor: disabled ? colors.grey : '#f9b100',
            padding: 10,
          },
        ]} >
          <Text style={[st.tx16,{color:'#fff'}]}>Skip</Text>
        </View>
      );
  }

  const RenderItem = ({item}) => {
    return (
<View style = {{flex: 1, justifyContent: 'center', alignItems: 'center' }}>

  
      <ImageBackground source={item.image} 
      style={{width: '100%', height: '100%', resizeMode: 'contain'}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            // marginBottom: 70,
            top:200
          }}>
          {/* <Text
          //  style={[st.tx18(darktheme), st.txAlignC]}
           >
            {item.title}
          </Text>
          <View style={st.align_C}>
            <Text 
            // style={[st.tx8(darktheme), st.txAlignC]}
            >{item.description}</Text>
          </View> */}
    


        </View>
      </ImageBackground>
      </View>
    );
  };

  return (
    <>
     <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        renderDoneButton={RenderDoneButton}
        renderNextButton={RenderNextButton}
        renderSkipButton={RenderSkipButton}
      />
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    // padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    // padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 220,
    height: 100,
    // alignItems: 'center',
    // resizeMode:'center'
  },
  introTextStyle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    // paddingVertical: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  introTitleStyle: {
    textShadowColor: 'rgba(2, 2, 7, 0.75)',
    fontSize: 50,
    textShadowRadius: 10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    // marginTop: '50%',
    fontFamily: 'Passion One',
    textShadowOffset: {width: -1, height: 1},
  },
  introdescTextStyle:{
    textShadowColor: 'rgba(2, 2, 7, 0.75)',
    fontSize: 20,
    textShadowRadius: 10,
    color: 'black',
    backgroundColor:'#EDEADE',
    borderRadius:10,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
    fontFamily: 'Passion One',
    textShadowOffset: {width: -1, height: 1},
  },
  buttonCircle:{
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
    backgroundColor:'#87CEEB',
    // marginTop:10,
    paddingVertical:5
  },
  underlineStyleBase: darktheme => ({
    width: 43,
    height: 50,
    borderWidth: 2,
    borderColor: darktheme === 'dark' ? '#000' : '#fff',
    borderRadius: 5,
  }),
});

const slides = [
  {
    id: 1,
    // title: `Safe & Inclusive ${'\n'}Forum`,
    // description: `Zeros invests in cummunities and ${'\n'}real connections.`,
    image: require('../../../AppAssests/products/shoe1.jpg'),
    logo: require('../../../AppAssests/Images/splashlogo.png'),
    color: 'black',
  },

  {
    id: 2,
    title: `Prepared by Expert`,
    description: 'Lorem ipsum dolor sit amet, consectur adipis cing elit. Nullam vel malesuada nisi..',
    image: require('../../../AppAssests/products/shoe2.jpg'),
    logo: require('../../../AppAssests/Images/splashlogo.png'),
    color: 'blue',
  },

  {
    id: 3,
    title: `Children Enjoying Their Meal`,
    description: `Lorem ipsum dolor sit amet, consectur adipis 
    cing elit. Nullam vel malesuada nisi.`,
    image: require('../../../AppAssests/products/shoe3.jpg'),
    logo: require('../../../AppAssests/Images/splashlogo.png'),
  },
 
];
