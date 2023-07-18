import {useAppSelector} from '@api/hook';
import {navigateTo} from '@navigations/index';
import {selectFoodCategory} from '@redux/Home/reducer';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const RecentJobList = () => {
  const theme = useTheme();
  const numbers = [1, 2, 3, 4, 5];
  const shadowColor = {
    //shadow color
    //ios
    shadowColor: theme.colors.onSurface,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7.62,
    //android
    elevation: 1,
  };
  const foodData = useAppSelector(selectFoodCategory('All'));
  const dummyData = [
    {
      id: 1,
      jobTitle: 'React native Fuision',
      salary: 1000,
      logoImage:
        'https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1686734726~exp=1686735326~hmac=19b1c08418567d9b80a3334c9facafdb1ce9896dba59e8e6a0c4f3c572806dec',
      location: 'HCM',
      favorites: false,
    },
    {
      id: 2,
      jobTitle: '.Netcore',
      salary: 2000,
      logoImage:
        'https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1686734726~exp=1686735326~hmac=19b1c08418567d9b80a3334c9facafdb1ce9896dba59e8e6a0c4f3c572806dec',
      location: 'HN',
      favorites: false,
    },
    {
      id: 3,
      jobTitle: 'UI/UX Design',
      salary: 400,
      logoImage:
        'https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1686734726~exp=1686735326~hmac=19b1c08418567d9b80a3334c9facafdb1ce9896dba59e8e6a0c4f3c572806dec',
      location: 'DN',
      favorites: true,
    },
    {
      id: 4,
      jobTitle: 'react js',
      salary: 800,
      logoImage:
        'https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1686734726~exp=1686735326~hmac=19b1c08418567d9b80a3334c9facafdb1ce9896dba59e8e6a0c4f3c572806dec',
      location: 'KR',
      favorites: false,
    },
  ];
  //render item
  const renderItems = useCallback(
    ({item}) => (
      <ItemContainer
        onPress={() => navigateTo('RecipeDetails', {id: item.id})}
        style={[shadowColor]}>
        <ImageContainer>
          <FoodImage resizeMode={'cover'} source={{uri: item?.image}} />
        </ImageContainer>
        <JobTitle numberOfLines={1}>{item?.title}</JobTitle>
        <StarContainer>
          {numbers.map(item => (
            <Icon
              style={{paddingHorizontal: 2}}
              name={'star'}
              size={20}
              color={'#FFAD30'}
            />
          ))}
        </StarContainer>
      </ItemContainer>
    ),
    [numbers],
  );

  return (
    <>
      <SectionTitle>New Recipes</SectionTitle>
      <RecentList
        data={foodData?.data}
        ListFooterComponent={<SpaceView />}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};
const RecentList = styled.FlatList`
  padding-horizontal: 20px;
  padding-top: 50px;
  padding-bottom: 20px;
`;
const StarContainer = styled.View`
  flex-direction: row;
`;
const ItemContainer = styled.TouchableOpacity`
  height: 100px;
  width: 300px;
  padding-horizontal: 10px;
  border-radius: 20px;
  margin-horizontal: 10px;
  background-color: white;
  /* align-content: space-between;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin: 10px 0px;
  padding: 0px 10px;
  flex-direction: row; */
`;
const SpaceView = styled.View`
  height: 85px;
`;
const CompanyImage = styled.Image`
  height: 50px;
  width: 50px;
  justify-content: flex-end;
`;
const SectionTitle = styled.Text`
  font-size: 26px;
  font-weight: 600;
  margin-left: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const JobContentContainer = styled.View`
  margin-left: 20px;
  flex: 1;
`;
const JobTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  width: 60%;
  margin-top: 10px;
  margin-bottom: 15px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const JobTime = styled.Text`
  font-size: 12px;
  font-weight: 500;
  padding-top: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const JobSalary = styled.Text`
  font-size: 12px;
  font-weight: 500;
  padding-top: 10px;

  justify-content: flex-end;
  right: 0;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const ImageContainer = styled.View`
  position: absolute;
  z-index: 100;
  top: -35px;
  right: 15px;
  height: 200px;
`;
const FoodImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 100px;
`;
export default RecentJobList;
