import {useAppDispatch, useAppSelector} from '@api/hook';
import {navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {
  RemoveFavoriteList,
  selectSavedRecipeData,
} from '@redux/Recipes/reducer';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const FavoritesScreen = () => {
  const dispatch = useAppDispatch();
  const foodData = useAppSelector(selectSavedRecipeData);
  const toggleFavorite = id => {
    dispatch(RemoveFavoriteList({id}));
  };
  LayoutAnimation.easeInEaseOut();
  const renderFoodItems = useCallback(
    ({item, index}) => (
      <Touchable onPress={() => navigateTo('RecipeDetails', {id: item.id})}>
        <FoodContainer
          imageStyle={{borderRadius: 15}}
          source={{uri: item.image}}>
          <LinearGradient
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 15,
            }}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#000000', 'transparent']}
          />
          <ContentContainer>
            <FoodTitle>{item?.title}</FoodTitle>
          </ContentContainer>
          <RightContentContainer>
            <TimmingContainer>
              <Icon name={'clock-o'} size={23} color={'white'} />
              <TimeText>20 min</TimeText>
            </TimmingContainer>
            <ButtonContainer onPress={() => toggleFavorite(item.id)}>
              <Icon name={'bookmark-o'} size={20} color={'#4CA6A8'} />
            </ButtonContainer>
          </RightContentContainer>
        </FoodContainer>
      </Touchable>
    ),
    [],
  );
  return (
    <Container>
      <ScreenTitle>Saved recipes</ScreenTitle>
      <ItemList
        ListFooterComponent={<SpaceView />}
        data={foodData.data}
        keyExtractor={(item, index) => `${item?.id}-${item?.title}-${index}`}
        renderItem={renderFoodItems}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fbfbfb;
`;
const ScreenTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const ItemList = styled.FlatList`
  padding-horizontal: 30px;
  padding-top: 20px;
`;
const FoodContainer = styled.ImageBackground`
  height: 200px;
  width: 100%;
  flex-direction: row;
  margin-vertical: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  align-content: baseline;
`;
const ContentContainer = styled.View`
  padding-left: 10px;
  flex: 1;
  padding-bottom: 10px;
`;
const FoodTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;

  color: ${props => props.theme.colors.backgroundPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const SpaceView = styled.View`
  height: 85px;
`;
const TimeText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  padding-horizontal: 15px;
  color: ${props => props.theme.colors.backgroundPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const RightContentContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.TouchableOpacity`
  height: 35px;
  justify-content: center;
  align-items: center;
  width: 35px;
  border-radius: 25px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;
const TimmingContainer = styled.View`
  flex-direction: row;
`;
const Touchable = styled.TouchableOpacity``;
export default memo(FavoritesScreen);
