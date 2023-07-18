import {useAppDispatch} from '@api/hook';
import ButtonPrimary from '@components/Button';
import {navigateTo, replace} from '@navigations/index';
import {launchAppAction} from '@redux/Application/reducer';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-svg';
import styled from 'styled-components/native';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const LogoAPP = require('./logoApp.png');
  const BackGroundImage = require('./SplashScreen.png');
  useEffect(() => {
    dispatch(launchAppAction());
  }, []);

  return <Container source={BackGroundImage}></Container>;
};
const Container = styled.ImageBackground`
  flex: 1;

  align-items: center;
  justify-content: center;
`;
const ImageContainer = styled.View`
  flex: 1;
  margin-top: 30px;
`;
const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ImageSplash = styled.Image`
  height: 100;
  width: 200px;
`;
const SplashTitle = styled.Text`
  font-size: 34px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  padding: 0 64px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const SplashSubText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  font-family: 'Poppins-Black';
  text-align: center;
  padding: 0 36px;
  margin-top: 5px;
  color: ${props => props.theme.colors.textSecondary};
`;
const SplashButton = styled(ButtonPrimary).attrs(props => ({
  contentStyle: {
    width: 261,
    marginTop: 40,
  },
  iconName: 'arrow-right',
  text: 'Let’s Get Started',
}))``;
export default SplashScreen;
