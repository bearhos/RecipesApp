import RootComponent from './index';
import {useAppDispatch} from '@api/hook';
import DefaultTheme from '@assets/theme';
import LoadingOverlay from '@components/LoadingOverlay';
import Toast from '@components/Toast';
import i18n from '@i18n';
import {launchAppAction} from '@redux/Application/reducer';
import {allUsers} from '@redux/components/selectors';
import {persistor, store} from '@redux/store';
import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';

const App: FC = () => {
  useEffect(() => {
    i18n.changeLanguage('vi');
    // dispatch(launchAppAction());
  }, []);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SheetProvider>
            <SafeAreaProvider>
              <MenuProvider>
                <RootComponent />
              </MenuProvider>
            </SafeAreaProvider>
          </SheetProvider>
          <LoadingOverlay />
          <Toast />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
