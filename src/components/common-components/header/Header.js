import {StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../../global/theme/Theme';

const Header = ({
  title,
  onPress,
  darktheme,
  menu,
  navigation,
  edit,
  onEditHandle,
}) => {
  return (
    <View>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />

      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#ccc',
          borderBottomWidth: 0.5,
        }}>
        <View style={[st.row, st.justify_S, st.align_C, st.pd20, st.mt_t10, {marginTop: 25, marginRight:25}]}>
          <TouchableOpacity onPress={onPress} style={{width:80}} >
            <Icon name="arrowLeft" size={45} color={'black'} />
          </TouchableOpacity>
          <View>
            <Text style={st.tx18(darktheme)}>Register</Text>
          </View>
          
        </View>
      </View>
    </View>
  );
};

export default Header;
