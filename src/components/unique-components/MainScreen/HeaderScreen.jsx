import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderScreen = ({isCart}) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.AppIconConatiner}>
                <TouchableOpacity onPress={()=> navigation.navigate('HomeStack')}>

                {
                    isCart ?
                    <Ionicons name="chevron-back" size={30} color={'#E96E6E'}/>
                    :<Image style={styles.appIcon} source={require('../../../AppAssests/Images/menu.png')} />
                }
                </TouchableOpacity>
            </View>
            <Text style={styles.myCart}> {isCart &&'My cart' }</Text>
            <View>
                <Image style={styles.userIcon} source={require('../../../AppAssests/Images/splashlogo.png')} />
            </View>
        </View>
    )
}

export default HeaderScreen

const styles = StyleSheet.create({
    AppIconConatiner: {
        backgroundColor: '#FFFFFF',
        height: 44,
        width: 44,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appIcon: {
        height: 25,
        width: 28
    },
    userIcon: {
        height: 20,
        width: 20,
        borderRadius: 25,
        padding: 20
    },
    myCart:{
        fontSize:28,
        color:'black',

    }
})