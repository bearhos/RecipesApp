import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const BottomTabBar = ({state, descriptors, navigation}) => {
  const theme = useTheme();
  const shadowColor = {
    //shadow color
    //ios
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
  return (
    <BottomContainer style={[shadowColor]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        let iconName;
        switch (index) {
          case 0:
            iconName = 'home';
            break;
          case 1:
            iconName = 'bookmark';
            break;
          case 2:
            iconName = 'bell';
            break;
          case 3:
            iconName = 'cog';
            break;
          default:
            break;
        }
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarTouchable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <IconLabel
              name={iconName ?? ''}
              color={isFocused ? '#4CA6A8' : '#A8A8AA'}
            />
          </TabBarTouchable>
        );
      })}
    </BottomContainer>
  );
};
const BottomContainer = styled.View`
  position: absolute;
  height: 90px;
  flex: 1;
  padding-bottom: 20px;
  padding-horizontal: 15px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
`;
const TabBarTouchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const LabelFocus = styled(Icon).attrs(props => ({
  name: 'circle',
  size: 14,
  color: props.theme.colors.backgroundButtonPrimary,
}))`
  position: absolute;
  top: 5px;
  right: -6px;
`;
const TextLabel = styled.Text`
  font-size: 12px;
  font-weight: 400;

  align-self: center;
  font-family: 'Poppins-Black';

  color: #a8a8aa;
`;
const IconLabel = styled(Icon).attrs(props => ({
  name: props.name,
  size: 26,
  color: props.color,
}))``;
const PaddingView = styled.View`
  height: 14px;
`;
export default BottomTabBar;
