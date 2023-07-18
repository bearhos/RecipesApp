import {StackActions, NavigationProp, DrawerActions} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createRef} from 'react';


export type NavigationProps = NavigationProp<ReactNavigation.RootParamList>;
export type RouteProp<T> = {params: T};

export const navigationOptions: StackNavigationOptions = {
  // gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

export const navigationRef: any = createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function pop(count: number) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}
export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export const getNavigation = () => {
  return navigationRef.current;
};

export const navigateReset = (stackName: string, params?: any) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: stackName, params}],
  });
};

export const reset = () => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: 'Drawer'}],
  });
};

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigateTo<T>(name: string, params?: T) {
  navigationRef.current?.navigate(name, params);
}
