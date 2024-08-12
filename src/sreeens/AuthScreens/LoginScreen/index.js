import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
    const[userInfo,setuserInfo] = useState(null)
    console.log(userInfo, "check user details");
    
useEffect(()=>{
    GoogleSignin.configure({webClientId:'21025509838-l4r03nk6jdoqjvrf1mkhur378avg0tbv.apps.googleusercontent.com'});
},[])


const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      setuserInfo(usrInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened:', error);
      }
    }
  };

    const onPressLogin = () => {
        // Do something about login operation
    };
    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };
    const onPressSignUp = () => {
        // Do something about signup operation
    navigation.navigate('RegisterScreen')
    };
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    console.log(state, "check details");
    return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.linearGradient}>

        <View style={styles.container}>
            <Text style={styles.title}> Discounts are awaiting </Text>
             
         
            <TouchableOpacity
                onPress={signIn}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN WITH GOOGLE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressSignUp}>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4FD3DA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fb5b5a",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#3AB4BA",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    linearGradient: {
        flex: 1,
      },
});
export default LoginScreen;