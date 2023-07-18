import Ingrident from './Shared/Ingrident';
import Procedure from './Shared/Procedure';
import TabBarRender from './Shared/TabBar';
import {useAppDispatch, useAppSelector} from '@api/hook';
import {goBack, navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {
  AddFavoriteList,
  RemoveFavoriteList,
  getRecipeAction,
  selectRecipeData,
  selectSavedRecipeData,
} from '@redux/Recipes/reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Share} from 'react-native';
import {FlatList, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {SceneMap, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const RecipeScreen = ({route}) => {
  const dispatch = useAppDispatch();
  const recipeData = useAppSelector(selectRecipeData);

  const savedRecipeData = useAppSelector(selectSavedRecipeData);

  const [isFavorite, setisFavorite] = useState(false);
  type OpenURLButtonProps = {
    url: string;
    children: string;
  };
  const onPressUrl = useCallback(async () => {
    const supported = await Linking.canOpenURL(
      recipeData?.spoonacularSourceUrl,
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(recipeData?.spoonacularSourceUrl);
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${recipeData?.spoonacularSourceUrl}`,
      );
    }
  }, []);
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Recipes App',
        message: 'Good recipe for you ' + recipeData.title,
        url: recipeData?.spoonacularSourceUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const [index, setIndex] = useState(0);
  const [openMenu, setopenMenu] = useState(false);
  const [routes] = useState([
    {key: 'first', title: 'Ingrident'},
    {key: 'second', title: 'Procedure'},
  ]);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(RemoveFavoriteList({id: recipeData?.id}));
      setisFavorite(false);
    } else {
      dispatch(AddFavoriteList({data: [recipeData]}));
      setisFavorite(true);
    }
  }, [isFavorite]);

  const menuData = [
    {title: 'Share', icon: 'share', action: onShare},
    {
      title: 'Open Source',
      icon: 'chrome',
      action: onPressUrl,
    },
    {
      title: isFavorite ? 'Unsave' : 'Save',
      icon: 'bookmark',
      action: toggleFavorite,
    },
  ];
  useEffect(() => {
    setisFavorite(savedRecipeData.data.some(e => e.id === recipeData?.id));
    console.log(isFavorite);
  }, [recipeData]);
  useEffect(() => {
    dispatch(getRecipeAction(route?.params?.id));
  }, []);

  const renderScene = SceneMap({
    first: () => <Ingrident item={recipeData} />,
    second: () => <Procedure item={recipeData} />,
  });
  return (
    <Container>
      <HeaderScreen>
        <Touchable onPress={() => goBack()}>
          <Icon name={'angle-left'} size={36} color={'black'} />
        </Touchable>
        <Touchable onPress={() => setopenMenu(!openMenu)}>
          <Menu>
            <MenuTrigger>
              <Icon name={'ellipsis-h'} size={24} color={'black'} />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{borderRadius: 10, marginTop: 20}}>
              <FlatList
                data={menuData}
                keyExtractor={id => {
                  id.toString();
                }}
                renderItem={({item}) => {
                  return (
                    <MenuOption
                      onSelect={item?.action}
                      customStyles={{
                        optionWrapper: {
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 15,
                          paddingHorizontal: 20,
                        },
                      }}>
                      <Icon
                        style={{width: 30, textAlign: 'left'}}
                        name={item.icon}
                        color={'black'}
                        size={20}
                      />
                      <MenuText>{item.title}</MenuText>
                    </MenuOption>
                  );
                }}
              />
            </MenuOptions>
          </Menu>
        </Touchable>
      </HeaderScreen>

      <Touchable>
        <FoodContainer
          imageStyle={{borderRadius: 15}}
          source={{
            uri: recipeData?.image,
          }}>
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
          <ContentContainer />
          <RightContentContainer>
            <TimmingContainer>
              <Icon name={'clock-o'} size={23} color={'white'} />
              <TimeText>{recipeData?.readyInMinutes} min</TimeText>
            </TimmingContainer>
            <ButtonContainer onPress={toggleFavorite}>
              <Icon
                name={'bookmark-o'}
                size={20}
                color={isFavorite ? '#4CA6A8' : 'black'}
              />
            </ButtonContainer>
          </RightContentContainer>
        </FoodContainer>
      </Touchable>
      <TitleContainer>
        <FoodTitle>{recipeData?.title}</FoodTitle>
        <ScoreText>Health Score : {recipeData?.healthScore}</ScoreText>
      </TitleContainer>
      <TabView
        // animationEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={props => <TabBarRender props={props} route={index} />}
        onIndexChange={setIndex}
        initialLayout={{width: '100%'}}
      />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  background-color: #fbfbfb;
  padding-horizontal: 20px;
`;
const HeaderScreen = styled.View`
  flex-direction: row;
  align-items: space-between;

  justify-content: space-between;
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
  font-size: 18px;
  flex: 1.7;
  font-weight: 500;
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const TimeText = styled.Text`
  font-size: 16px;
  font-weight: 600;

  padding-horizontal: 15px;
  color: ${props => props.theme.colors.backgroundPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 30px;
`;
const ScoreText = styled.Text`
  font-size: 16px;
  font-weight: 700;

  flex: 1;
  color: ${props => props.theme.colors.warning};
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
const MenuItemStyle = styled(MenuOption).attrs(props => ({}))``;
const MenuText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const Touchable = styled.TouchableOpacity``;
export default RecipeScreen;
