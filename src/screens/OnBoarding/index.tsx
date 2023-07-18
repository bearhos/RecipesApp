import {useAppDispatch} from '@api/hook';
import ButtonPrimary from '@components/Button';
import {navigateTo, replace} from '@navigations/index';
import {launchAppAction} from '@redux/Application/reducer';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import styled from 'styled-components/native';

const OnboardImage = require('./OnBoarding.png');
const LogoApp = require('./Logoapp.png');
const OnBoarding = () => {
  const dispatch = useAppDispatch();
  const onPressButtonSplash = () => {
    navigateTo('LoginScreen');
  };
  return (
    <Container source={OnboardImage}>
      <ImageContainer>
        <ImageSplash source={LogoApp}></ImageSplash>
      </ImageContainer>
      <ContentContainer>
        <SplashTitle>Get Cooking</SplashTitle>
        <SplashSubText>Simple way to find Tasty Recipe</SplashSubText>
        <SplashButton onPress={onPressButtonSplash} />
      </ContentContainer>
    </Container>
  );
};
const Container = styled.ImageBackground`
  flex: 1;
  background-color: white;
`;
const ImageContainer = styled.View`
  flex: 1;
  margin-top: 30px;
`;
const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;
const ImageSplash = styled.Image`
  height: 100%;
  width: 100%;
`;
const SplashTitle = styled.Text`
  font-size: 50px;
  font-weight: 700;
  line-height: 64px;
  text-align: center;
  padding: 0 64px;
  color: ${props => props.theme.colors.backgroundPrimary};
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
    height: 54,
    marginTop: 80,
  },
  iconName: 'arrow-right',
  text: 'Let’s Get Started',
}))``;
export default OnBoarding;
