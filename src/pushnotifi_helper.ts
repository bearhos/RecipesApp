import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  const remoteRegister = await messaging().registerDeviceForRemoteMessages();
  

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  console.log('Authorization status:', authStatus);
  if (enabled) {
    registerAppWithFCM();
    console.log('Authorization status:', authStatus);

    GetFCMtoken();
    getToken();
  }
};
async function getToken() {
  let fcmToken = await AsyncStorage.getItem('device_token');
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('device_token', fcmToken);
    }
  } else {
    // do some work
    console.log('Device_token');
    console.log(fcmToken);
  }
}
async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}
const GetFCMtoken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log(fcmtoken, 'new token');
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (err) {
      console.log(err, 'error in fcm');
    }
  }
};
export const NotificationListenner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground', remoteMessage);
  });
};
