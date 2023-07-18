import CategoryList from './CategoryList';
import PopularList from './PopularList';
import RecentJobList from './RecentJobList';
import {useAppDispatch, useAppSelector} from '@api/hook';
import {navigateTo, toggleDrawer} from '@navigations/index';
import {getDrawerStatusFromState} from '@react-navigation/drawer';
import {ToastType, showToast} from '@redux/Application/reducer';
import {getDataSearchCurrentAction} from '@redux/JobSearch/reducer';
import {useGetJobPopularQuery} from '@redux/JobSearch/services';
import {selectSession} from '@redux/Session/reducer';
import React, {memo, useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);
  const [searchValue, setsearchValue] = useState('');
  const onPressJob = useCallback(id => {
    navigateTo('JobDetails', {id});
  }, []);

  return (
    <Container>
      <>
        <HeaderHomeContainer>
          <TitleContainer>
            <HomeTitle>Hello {session?.username}</HomeTitle>
            <Homesubtitle>What are you cooking today?</Homesubtitle>
          </TitleContainer>

          <UserImageHeader
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            }}
          />
        </HeaderHomeContainer>
        <SearchContainer>
          <ContainerInputSearch>
            <TextInputSearch
              onSubmitEditing={() =>
                navigateTo('SearchScreen', {value: searchValue})
              }
              onChangeText={e => setsearchValue(e)}
              placeholder={'Search recipe'}
            />
          </ContainerInputSearch>
          <FilterButton
            onPress={() => navigateTo('SearchScreen', {value: searchValue})}>
            <Icon name={'search'} size={20} color={'white'} />
          </FilterButton>
        </SearchContainer>
      </>
      <CategoryList></CategoryList>
      <RecentJobList></RecentJobList>
    </Container>
  );
};
const Container = styled.ScrollView`
  background-color: #fbfbfb;
  padding-top: 20px;
`;
const TitleContainer = styled.View``;
const HeaderHomeContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  margin-horizontal: 20px;
`;
const MenuButton = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.backgroundButtonPrimary};
`;
const HomeTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;

  margin-top: 20px;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const Homesubtitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
  color: ${props => props.theme.colors.lineProfile};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;

const UserImageHeader = styled.Image`
  height: 44px;
  width: 44px;
  border-radius: 22px;
`;
const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const FilterButton = styled.TouchableOpacity`
  height: 54px;
  width: 54px;
  border-radius: 15px;
  align-items: center;
  margin-horizontal: 10px;
  margin-top: 10px;
  justify-content: center;
  background-color: ${props => props.theme.colors.backgroundButtonPrimary};
`;
const TextInputSearch = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.textSecondary,
  autoCapitalize: false,
}))`
  font-size: 16px;
  padding-left: 19px;

  padding-right: 19px;
  background-color: transparent;

  height: 100%;
  font-weight: 400;
  padding-top: 3px;
  font-family: ${props => props.theme.fonts.poppins.black};
  color: ${props => props.color ?? props.theme.colors.textPrimary};
  line-height: 18px;
`;
const ContainerInputSearch = styled.View`
  flex-direction: row;

  margin-top: 20px;
  height: 55px;
  width: 80%;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  align-self: center;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #d6d3d3b9;
`;

export default memo(HomeScreen);
