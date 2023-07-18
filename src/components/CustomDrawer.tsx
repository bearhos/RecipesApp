import {MaxSize} from '@api/utils/common';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

const CustomDrawer = props => {
  console.log(props);
  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <UserContainer>
          <UserImage source={{uri: 'https://i.pravatar.cc/300'}}></UserImage>
          <UserName>Adom Shafi@gmail.com</UserName>
        </UserContainer>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;

  padding-top: 30px;
`;
const UserContainer = styled.View`
  height: ${MaxSize.HEIGHT / 6};
  padding-horizontal: 30px;
`;
const UserImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;
const UserName = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 44px;

  color: #6a6a6a;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default CustomDrawer;
