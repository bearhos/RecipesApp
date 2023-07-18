import {navigationOptions} from '.';
import DrawerStack from './DrawerStack';
import MyDrawer from './DrawerStack';
import HomeStack from './HomeStack';
import {createStackNavigator} from '@react-navigation/stack';
import JobDetail from '@screens/JobDetails/JobDetail';
import LoginScreen from '@screens/Login/LoginScreen';
import OnBoarding from '@screens/OnBoarding';
import RecipeScreen from '@screens/Recipe';
import RegisterScreen from '@screens/Register/RegisterScreen';
import SearchScreen from '@screens/Search';
import SplashScreen from '@screens/Splash';
import React from 'react';

const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={navigationOptions}
      initialRouteName="SplashScreen">
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
