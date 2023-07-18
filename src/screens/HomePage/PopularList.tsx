import {useAppSelector} from '@api/hook';
import {SearchItem, selectSearchCurrenData} from '@redux/JobSearch/reducer';
import {useGetJobPopularQuery} from '@redux/JobSearch/services';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const PopularList = ({onPressJob}) => {
  const theme = useTheme();
  // const popularData = useAppSelector(selectSearchCurrenData);
  const {data, isLoading, isFetching, refetch, error} = useGetJobPopularQuery();
  const shadowColor = {
    shadowColor: theme?.colors.onSurface,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7.62,
    //android
    elevation: 1,
  };
  const renderItem = useCallback(
    ({item}: SearchItem) => (
      <PopularContainer
        style={[shadowColor]}
        onPress={() => onPressJob(item?.jobId)}>
        <HeaderContainer>
          <LogoCompany source={{uri: item.employerLogo}} />
          <Touchable>
            <FavoriteIcon />
          </Touchable>
        </HeaderContainer>
        <JobTitle numberOfLines={1}>{item.jobTitle}</JobTitle>
        <BottomContainer>
          <SalaryText>2000/m</SalaryText>
          <LocationText>{item.jobCountry}</LocationText>
        </BottomContainer>
      </PopularContainer>
    ),

    [],
  );

  return (
    <>
      <SectionTitle>Popular Jobs</SectionTitle>
      <PopularFlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data?.results}
        renderItem={renderItem}
      />
    </>
  );
};
const PopularFlatList = styled.FlatList`
  padding-bottom: 30px;
`;
const Touchable = styled.TouchableOpacity``;
const PopularContainer = styled.TouchableOpacity`
  height: 160px;
  width: 260px;
  margin-horizontal: 20px;
  background-color: white;
  padding-horizontal: 20px;
  border-radius: 10px;
`;
const HeaderContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  margin-top: 10px;
`;
const SectionTitle = styled.Text`
  font-size: 26px;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const BottomContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const LogoCompany = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
const FavoriteIcon = styled(Icon).attrs(props => ({
  name: 'heart',
  size: 20,
  color: 'red',
}))``;
const JobTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  line-height: 44px;

  padding-top: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const SalaryText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  line-height: 44px;
  margin-right: 5px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const LocationText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 44px;

  color: #6a6a6a;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default PopularList;
