import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../sreeens/MainScreens/Home'; // Fixed typo in the path
import ProductsDetails from '../sreeens/MainScreens/ProductsDetails'; // Fixed typo in the path
import CartScreen from '../sreeens/MainScreens/CartScreen';
import { CartProvider } from '../context';
import { useContext } from 'react';
import { CartContext } from '../context';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductsDetails"
        component={ProductsDetails}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

function Order() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No Orders yet!</Text>
    </View>
  );
}

function Cart() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart!</Text>
    </View>
  );
}

function Account() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'skyblue',
          }}
          initialRouteName='AuthStack'
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Entypo name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="order"
            component={Order}
            options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="reorder" size={size} color={color} />
              ),
            }}
          />
         <Tab.Screen
  name="Cart"
  component={CartScreen}
  options={{
    tabBarIcon: ({ size, color }) => {
      const { carts } = useContext(CartContext);
      console.log(carts, "check cart items");

      return (
        <View style={{position:'relative'}}>
          <MaterialIcons 
            name="shopping-cart" 
            size={size} 
            color={color} 
          />
       {
        carts.length > 0 ?
        (
          <View style={{
            height:12,
            width:12,
            borderRadius:7,
            backgroundColor:'red',
            justifyContent:'center',
            alignContent:'center',
            position:'absolute',
            top:0,
            right:-5,

            
          }}>
          <Text style={{ color:'white', fontSize:10,justifyContent:'center',alignSelf:'center' }}>{carts?.length}</Text>
          </View>
        ): null
       }
        </View>
      );
    },
  }}
/>

          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon name="user-circle" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
