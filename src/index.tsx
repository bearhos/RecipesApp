import {navigationRef} from './navigations';
import {useAppDispatch} from '@api/hook';
import MyDrawer from '@navigations/DrawerStack';
import DrawerStack from '@navigations/DrawerStack';
import MainStack from '@navigations/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {launchAppAction} from '@redux/Application/reducer';
import React, {useEffect, useMemo, useRef} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

const RootComponent = () => {
  const dispatch = useAppDispatch();
  const RenderStatusBar = useMemo(
    () => <StatusBar barStyle={'dark-content'} backgroundColor="#61dafb" />,
    [],
  );

  const routeNameRef = useRef<string>();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        const routeParams = navigationRef?.current?.getCurrentRoute()?.params;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the tracker
          console.log('currentRouteName: ', currentRouteName);
          if (routeParams) {
            console.log('currentRouteParams: ', routeParams ?? {});
          }
          //
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      {RenderStatusBar}
      <MainStack />
    </NavigationContainer>
  );
};

export default RootComponent;
