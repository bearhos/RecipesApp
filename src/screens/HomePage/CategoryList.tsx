import {useAppDispatch, useAppSelector} from '@api/hook';
import {navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {
  AddFavoriteList,
  RemoveFavoriteList,
  selectSavedRecipeData,
} from '@redux/Recipes/reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const CategoryList = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [categoryIndex, setcategoryIndex] = useState(0);
  const savedRecipeData = useAppSelector(selectSavedRecipeData);
  const [isFavorite, setisFavorite] = useState(false);
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
  const categoryArray = [
    {
      index: 0,
      name: 'All',
    },
    {
      index: 1,
      name: 'Main Course',
    },
    {
      index: 2,
      name: 'Bread',
    },
    {
      index: 3,
      name: 'Side dish',
    },
    {
      index: 4,
      name: 'Dessert',
    },
    {
      index: 5,
      name: 'Appetizer',
    },
    {
      index: 6,
      name: 'Fingerfood',
    },
    {
      index: 7,
      name: 'Marinade',
    },
  ];
  const foodData = useAppSelector(
    selectFoodCategory(categoryArray[categoryIndex]?.name),
  );

  useEffect(() => {
    dispatch(
      getCategoryFood({
        type: categoryArray[categoryIndex]?.name,
      }),
    );
  }, [categoryIndex]);

  //render item
  const renderItems = useCallback(
    ({item, index}) => {
      return (
        <ItemContainer
          onPress={() => setcategoryIndex(item.index)}
          active={categoryIndex === index}>
          <CategoryTitle active={categoryIndex === index}>
            {item?.name}
          </CategoryTitle>
        </ItemContainer>
      );
    },
    [categoryIndex],
  );
  const toggleFavorite = useCallback(
    (item, isFavorite) => {
      if (isFavorite) {
        dispatch(RemoveFavoriteList({id: item?.id}));
        setisFavorite(false);
      } else {
        dispatch(AddFavoriteList({data: [item]}));
        setisFavorite(true);
      }
    },
    [isFavorite],
  );
  const renderFoodItems = useCallback(
    ({item, index}) => {
      const isFavorite = savedRecipeData.data.some(e => e.id === item.id);
      return (
        <FoodContainer
          onPress={() => navigateTo('RecipeDetails', {id: item.id})}>
          <ImageContainer>
            <FoodImage resizeMode={'cover'} source={{uri: item?.image}} />
          </ImageContainer>
          <FoodName numberOfLines={3}>{item?.title}</FoodName>
          <ButtonContainer onPress={() => toggleFavorite(item, isFavorite)}>
            <Icon
              name={'bookmark-o'}
              size={26}
              color={isFavorite ? '#4CA6A8' : 'black'}
            />
          </ButtonContainer>
        </FoodContainer>
      );
    },
    [categoryIndex, foodData?.data, savedRecipeData.data],
  );
  return (
    <>
      <RecentList
        data={categoryArray}
        renderItem={renderItems}
        horizontal
        ListFooterComponent={<SpaceView />}
        showsHorizontalScrollIndicator={false}
      />
      <ItemList
        data={foodData?.data}
        ListFooterComponent={<SpaceView />}
        renderItem={renderFoodItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};
const RecentList = styled.FlatList`
  padding-horizontal: 20px;
  margin: 10px 0;
`;
const ItemList = styled.FlatList`
  padding-horizontal: 20px;
  padding-top: 80px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.TouchableOpacity<{active: boolean}>`
  height: 44px;
  background-color: ${props =>
    props.active ? props.theme.colors.backgroundButtonPrimary : 'transparent'};

  justify-content: center;
  align-items: flex-end;
  border-radius: 20px;
  margin-horizontal: 5px;
  padding: 0px 20px;
`;
const SpaceView = styled.View`
  width: 25px;
`;
const ViewFood = styled.View`
  height: 600px;
`;
const ImageContainer = styled.View`
  position: absolute;
  z-index: 100;
  top: -65px;
  left: 35px;
  height: 200px;
`;
const CategoryTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${props =>
    props.active
      ? props.theme.colors.textHighContrast
      : props.theme.colors.backgroundButtonPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const FoodContainer = styled.TouchableOpacity`
  height: 236px;
  width: 200px;
  justify-content: center;
  border-radius: 20px;
  background-color: #d9d9d9;
  margin-horizontal: 10px;
`;
const FoodName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  padding-horizontal: 20px;
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const FoodImage = styled.Image`
  height: 130px;
  width: 130px;
  border-radius: 100px;
`;
const ButtonContainer = styled.TouchableOpacity`
  height: 50px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;
export default CategoryList;
