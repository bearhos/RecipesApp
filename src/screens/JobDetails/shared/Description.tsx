import {MaxSize} from '@api/utils/common';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const Description = ({item}) => {
  const source = {
    html: `
            ${item?.jobDescription}
        `,
  };
  return (
    <Container>
      <RenderHTML source={source} />
      <ButtonContainer>
        <TitleApply>Apply Now</TitleApply>
      </ButtonContainer>
    </Container>
  );
};
const Container = styled.ScrollView`
  padding-horizontal: 10px;
`;
const ButtonContainer = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: 40px;
  border-radius: 10px;
  margin-bottom: 40px;
  background-color: ${props => props.theme.colors.backgroundButtonPrimary};
`;

const TitleApply = styled.Text`
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: ${props => props.theme.colors.backgroundPrimary};
  padding-top: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default Description;
