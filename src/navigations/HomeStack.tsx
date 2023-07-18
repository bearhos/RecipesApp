import {navigationOptions} from '.';
import BottomTabBar from './BottomTabBar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from '@screens/Favorites';
import HomeScreen from '@screens/HomePage/HomeScreen';
import LoginScreen from '@screens/Login/LoginScreen';
import SettingScreen from '@screens/Setting';
import SplashScreen from '@screens/Splash';
import React from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={navigationOptions}
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
