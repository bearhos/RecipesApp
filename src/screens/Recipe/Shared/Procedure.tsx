import {useAppDispatch, useAppSelector} from '@api/hook';
import {goBack, navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {getRecipeAction, selectRecipeData} from '@redux/Recipes/reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const Procedure = ({item}) => {
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  const renderItem = useCallback(({item}) => {
    return (
      <ItemContainer>
        <ItemTitle>Step {item?.number}</ItemTitle>
        <ItemMeasures>{item?.step}</ItemMeasures>
      </ItemContainer>
    );
  }, []);

  return (
    <List
      showsVerticalScrollIndicator={false}
      data={
        item?.analyzedInstructions.length > 0
          ? item?.analyzedInstructions[0]?.steps
          : []
      }
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
  align-items: center;
`;
const RightContainer = styled.View``;
const ItemContainer = styled.TouchableOpacity`
  padding-vertical: 20px;

  padding-horizontal: 20px;

  border-radius: 20px;
  margin-vertical: 10px;
  width: 100%;
  background-color: #ececec;
`;
const ImageContainer = styled.View`
  height: 70px;
  width: 70px;
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
  margin-bottom: 10px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const ItemMeasures = styled.Text`
  font-size: 18px;
  font-weight: 500;

  color: #a9a9a9;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default Procedure;
