import {useAppDispatch, useAppSelector} from '@api/hook';
import {goBack, navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {getRecipeAction, selectRecipeData} from '@redux/Recipes/reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  SceneMap,
  TabBar,
  TabBarItem,
  TabBarItemProps,
  TabView,
} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const TabBarRender = ({props, route}) => {
  const theme = useTheme();
  const indexActive = [
    {key: 'first', index: 0},
    {key: 'second', index: 2},
  ];
  return (
    <TabBar
      {...props}
      renderIndicator={() => null}
      style={{
        backgroundColor: 'transparent',
        height: 60,
        borderBottomWidth: 0,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        marginBottom: 12,
      }}
      activeColor="red"
      renderTabBarItem={(props: TabBarItemProps<ITabProps>) => {
        const isActive = props.key === indexActive[route].key;
        return (
          <TabBarItem
            {...props}
            style={{
              backgroundColor: isActive
                ? theme.colors.backgroundButtonPrimary
                : 'transparent',
              borderRadius: 20,
              paddingBottom: 10,
              height: 50,
            }}
            renderLabel={({route, color, focused}) => (
              <TitleText active={focused}>{route.title}</TitleText>
            )}
          />
        );
      }}
    />
  );
};
const Pressable = styled.TouchableOpacity`
  height: 100%;
  width: 100%;

  background-color: red;
`;
const TitleText = styled.Text<{active: boolean}>`
  font-size: 18px;
  font-weight: 600;
  color: ${props =>
    props.active
      ? props.theme.colors.backgroundPrimary
      : props.theme.colors.backgroundButtonPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
export default TabBarRender;
