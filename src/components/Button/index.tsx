import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeProps} from 'styled-components/dist/types';
import styled from 'styled-components/native';

const SplashImageI = require('./splash.png');
interface ButtonPrimaryType {
  text: string;
  iconName: string;
  contentStyle?: Object;
  onPress: () => void;
}
const ButtonPrimary = (props: ButtonPrimaryType) => {
  return (
    <ButtonContainer onPress={props.onPress} style={props.contentStyle}>
      <ButtonContentContainer>
        <ButtonText>{props.text}</ButtonText>
        {props.iconName ? (
          <>
            <EmptyView />
            <ButtonIcon iconName={props.iconName} />
          </>
        ) : null}
      </ButtonContentContainer>
    </ButtonContainer>
  );
};
const ButtonContainer = styled.TouchableOpacity`
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 54px;
  background-color: ${props => props.theme.colors.backgroundButtonPrimary};
`;
const EmptyView = styled.View`
  width: 20px;
`;
const ButtonContentContainer = styled.View`
  justify-content: space-around;
  align-items: center;

  flex-direction: row;
`;
const ButtonIcon = styled(Icon).attrs(props => ({
  name: props.iconName,
  size: 22,
  color: props.theme.colors.backgroundPrimary,
  style: {},
}))<{iconName: string}>``;
const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 300;
  line-height: 26px;

  font-family: 'Poppins-Black';
  text-align: center;

  color: ${props => props.theme.colors.backgroundPrimary};
`;
export default ButtonPrimary;
