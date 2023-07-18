import HomeStack from './HomeStack';
import CustomDrawer from '@components/CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '@screens/Login/LoginScreen';
import * as React from 'react';
import {Text} from 'react-native';
import {Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

function Feed() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        headerTitle: false,
        header: () => null,
      }}
      navigationOptions={{
        headerMode: 'none',
        headerVisible: false,
        header: () => null,
      }}>
      <Drawer.Screen
        name="HomePage"
        component={HomeStack}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          drawerIcon: ({color}) => (
            <DrawerIconContainer color={'#FF5441'}>
              <DrawerIcon name={'user'} color={'white'} />
            </DrawerIconContainer>
          ),
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            lineHeight: 30,
            color: 'black',
          },
          drawerItemStyle: {
            paddingVertical: 5,
          },
        }}
      />
      <Drawer.Screen
        name="Article"
        component={Article}
        options={{
          drawerIcon: ({color}) => (
            <DrawerIconContainer color={'#FF9087'}>
              <DrawerIcon name={'clock-o'} color={'white'} />
            </DrawerIconContainer>
          ),
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            lineHeight: 30,
            color: 'black',
          },
          drawerItemStyle: {
            paddingVertical: 5,
          },
        }}
      />
      <Drawer.Screen
        name="Notifications Setting"
        component={Article}
        options={{
          drawerIcon: ({color}) => (
            <DrawerIconContainer color={'#2CB9B5'}>
              <DrawerIcon name={'cog'} color={'white'} />
            </DrawerIconContainer>
          ),
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            lineHeight: 30,
            color: 'black',
          },
          drawerItemStyle: {
            paddingVertical: 5,
          },
        }}
      />
    </Drawer.Navigator>
  );
}
const DrawerIconContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${props => props.color};

  display: flex;
  align-items: center;
  justify-content: center;
`;
const DrawerIcon = styled(Icon).attrs(props => ({
  name: props.name,
  size: 26,
  color: props.color,
}))``;
export default MyDrawer;
