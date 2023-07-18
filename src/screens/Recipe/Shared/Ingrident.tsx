import {useAppDispatch, useAppSelector} from '@api/hook';
import {goBack, navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {
  RecipesItem,
  getRecipeAction,
  selectRecipeData,
} from '@redux/Recipes/reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

interface TypeProps {
  item: RecipesItem;
}
const Ingrident = ({item}: TypeProps) => {
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  const ListHeader = useCallback(() => {
    return (
      <ListHeaderContainer>
        <ServeContainer>
          <Icon name={'cutlery'} size={20} color={'#a9a9a9'} />
          <ServeText> {item?.servings} Serve</ServeText>
        </ServeContainer>
        <ServeText>
          {item?.analyzedInstructions[0].steps.length} Steps
        </ServeText>
      </ListHeaderContainer>
    );
  }, []);

  const renderItem = useCallback(({item}: {item: RecipesItem}) => {
    return (
      <ItemContainer>
        <LeftContainer>
          <ImageContainer>
            <ItemImage
              resizeMode="contain"
              source={{
                uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
              }}
            />
          </ImageContainer>
          <ItemTitle>{capitalizeFirstLetter(item.name)}</ItemTitle>
        </LeftContainer>
        <RightContainer>
          <ItemMeasures>
            {item?.measures.metric.amount} {item?.measures.metric.unitLong}
          </ItemMeasures>
        </RightContainer>
      </ItemContainer>
    );
  }, []);

  return (
    <List
      showsVerticalScrollIndicator={false}
      data={item?.extendedIngredients}
      keyExtractor={(item, index) => `${item?.id}-${item?.title}-${index}`}
      ListFooterComponent={<SpaceView />}
      renderItem={renderItem}
    />
  );
};

const List = styled.FlatList`
  flex: 1;
`;
const SpaceView = styled.View`
  height: 20px;
`;
const LeftContainer = styled.View`
  flex-direction: row;
  max-width: 50%;
  align-items: center;
`;
const RightContainer = styled.View`
  max-width: 30%;
`;
const ItemContainer = styled.TouchableOpacity`
  padding-vertical: 10px;
  flex-direction: row;
  padding-horizontal: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  margin-vertical: 10px;
  width: 100%;
  background-color: #ececec;
`;
const ImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: white;
`;
const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
`;
const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;

  margin-left: 20px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const ItemMeasures = styled.Text`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: #a9a9a9;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const ListHeaderContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 10px;
`;
const ServeContainer = styled.View`
  flex-direction: row;
`;
const ServeText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #a9a9a9;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default Ingrident;
