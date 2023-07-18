import {MaxSize} from '@api/utils/common';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const HeaderJob = ({item}) => {
  return (
    <Container>
      <ImageContainer>
        <ImageCompany
          source={{
            uri: 'https://img.freepik.com/free-photo/3d-rendering-business-meeting-working-room-office-building_105762-1972.jpg?w=2000',
          }}
        />
        <LogoContainer>
          <LogoCompany
            source={{
              uri: 'https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1686734726~exp=1686735326~hmac=19b1c08418567d9b80a3334c9facafdb1ce9896dba59e8e6a0c4f3c572806dec',
            }}
          />
        </LogoContainer>
      </ImageContainer>
      <ContentContainer>
        <JobTitle>{item?.jobTitle}</JobTitle>
        <Location>{item?.locationName}</Location>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  height: ${MaxSize.HEIGHT / 3}px;
  width: 100%;
`;
const ImageContainer = styled.View`
  height: 70%;
  width: 100%;
`;
const ImageCompany = styled.Image`
  height: 100%;
  width: 100%;
`;
const ContentContainer = styled.View`
  align-items: center;
  padding-top: 40px;
`;
const LogoContainer = styled.View`
  right: 0;
  bottom: -37px;
  left: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
const LogoCompany = styled.Image`
  height: 74px;
  width: 74px;
  border-radius: 40px;
  border-width: 2px;
`;
const JobTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  line-height: 44px;

  padding-top: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const Location = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  margin-right: 5px;
  color: #171716bf;
  font-family: ${props => props.theme.fonts.poppins.black};
`;
export default HeaderJob;
