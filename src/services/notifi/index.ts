import {
  convertBranchToNotifyItem,
  convertDataToNotification,
  splitParameters,
} from './converter';
import {
  BranchItemType,
  NotificationHandle,
  NotificationItemType,
  NotificationType,
  NOTIFICATION_MESSAGE_TYPE,
  NOTIFICATION_TYPE,
  UnSubscribeTupe,
} from './type';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import camelcaseKeys from 'camelcase-keys';
import branch from 'react-native-branch';

// export function getIsHuawei() {
//   return false;
// }

// export async function huaweiGuarantee(huaweiCallback, otherCallback) {
//   try {
//     return otherCallback && otherCallback();
//   } catch (e) {
//     throw e;
//   }
// }

// export async function getPlatformAPI() {
//   return huaweiGuarantee(
//     async () => 'huawei',
//     async () => Platform.OS,
//   );
// }

export default class NotificationService implements NotificationType {
  private static myInstance: NotificationService;
  private changeLogListener: any = null;
  private notificationHistory: number[] = [];
  private notificationLog = {
    StartDeviceToken: '',
    EndDeviceToken: '',
    getDeviceToken: '',
    messages: [] as any[],
  };

  private get fcmInstance() {
    return messaging();
  }

  initialNotificationData: {[key in string]: any} | null = null;

  handleDisplayNotification: NotificationHandle | null = null;
  handleActionNotification: NotificationHandle | null = null;
  handleTokenRefresh: ((token: string) => void) | null = null;
  handleError: ((reason: any) => void) | null = null;

  private unsubscribeBranchListener: ReturnType<
    typeof branch.subscribe
  > | null = null;
  private fcmOnOpenListener: UnSubscribeTupe | null = null;
  private fcmOnMessageListener: UnSubscribeTupe | null = null;

  deviceToken = '';

  static get shared() {
    if (!this.myInstance) {
      this.myInstance = new NotificationService();
    }
    return this.myInstance;
  }

  constructor() {
    this.fcmConfiguration.bind(this);
    this.branchConfiguration.bind(this);

    this.unRegistration.bind(this);

    this.getDeviceToken.bind(this);
    this.onRegisterNotificationListener.bind(this);
    this.onGMSRegisterNotificationListener.bind(this);
  }

  async branchConfiguration() {
    // branch IO
    /**
     * To be notified that Branch is about to open a link,
     * use an onOpenStart callback with branch.subscribe.
     * Also supply an onOpenComplete callback,
     * which is the same as the single callback usually used with branch.subscribe:
     */
    this.unsubscribeBranchListener = branch.subscribe({
      onOpenStart: ({uri, cachedInitialEvent}) => {
        // cachedInitialEvent is true if the event was received by the
        // native layer before JS loaded.
        // console.log(
        //   'Branch will open ' + uri,
        //   'cachedInitialEvent',
        //   cachedInitialEvent,
        // );
      },
      onOpenComplete: async ({error, params, uri}) => {
        if (error) {
          console.error('Error from Branch opening uri ' + uri);
          this.handleError && this.handleError(error);
          return;
        }
        console.log('Branch opened ' + uri, 'params', params);
        //
        // detect params it from branchIO
        // or it from deeplink
        if (!params?.['+clicked_branch_link']) {
          // need do something here
          const non_branch_link = params?.['+non_branch_link'] as unknown as
            | string
            | undefined;
          if (non_branch_link) {
            const newParams = splitParameters(non_branch_link ?? '');
            newParams.notificationType = newParams?.host;
            //
            const prettyNewParams = camelcaseKeys(
              Object.assign({}, newParams),
              {
                deep: true,
              },
            ) as unknown as BranchItemType;

            prettyNewParams.fromBranchIO = true;

            this.handleActionNotification &&
              this.handleActionNotification(
                {body: '', title: ''},
                await convertBranchToNotifyItem({
                  branchParams: prettyNewParams,
                }),
                NOTIFICATION_TYPE.opened,
              );
          }
          return;
        }

        if (params) {
          const newParam = camelcaseKeys(Object.assign({}, params), {
            deep: true,
          }) as unknown as BranchItemType;

          newParam.fromBranchIO = true;

          this.handleActionNotification &&
            this.handleActionNotification(
              {body: newParam?.$og_description, title: newParam?.$og_title},
              await convertBranchToNotifyItem({branchParams: newParam}),
              NOTIFICATION_TYPE.opened,
            );
        }
      },
    });

    return this.unsubscribeBranchListener;
  }

  async fcmConfiguration() {
    const authStatus = await this.fcmInstance.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // console.log('Notification Authorization status:', authStatus);

    const onRegister = async () => {
      // call after received device token
      if (!this.fcmInstance.isDeviceRegisteredForRemoteMessages) {
        // await this.fcmInstance.registerDeviceForRemoteMessages();
      }
      await this.onRegisterNotificationListener();
      this.fcmInstance.onTokenRefresh(token => {
        this.deviceToken = token;
        this.handleTokenRefresh && this.handleTokenRefresh(this.deviceToken);
      });
    };

    if (enabled) {
      if (!this.deviceToken) {
        try {
          await this.getDeviceToken(); //<---- Add this
        } catch (error) {
          if (this.handleError) {
            this.handleError(error);
          }
        }
      }

      // call after received device token
      await onRegister();
    } else {
      // ignored
      if (this.handleError) {
        this.handleError(`Your AuthorizationStatus not enable: ${authStatus}`);
      }
    }

    return this.deviceToken;
  }

  unRegistration() {
    this.unsubscribeBranchListener && this.unsubscribeBranchListener();
    this.fcmOnMessageListener && this.fcmOnMessageListener();
    this.fcmOnOpenListener && this.fcmOnOpenListener();
  }

  async setBadge(badge) {
    try {
      // firebase.notifications().setBadge(badge);
    } catch (error) {}
  }

  private async getDeviceToken() {
    try {
      this.notificationLog.StartDeviceToken = 'true';
      this.deviceToken = await this.fcmInstance.getToken();
      // console.log('deviceToken', this.deviceToken);
      this.notificationLog.EndDeviceToken = 'true';
      this.changeLogListener && this.changeLogListener(this.notificationLog);
      return this.deviceToken;
    } catch (error) {
      this.notificationLog.getDeviceToken = JSON.stringify(error);
      this.changeLogListener && this.changeLogListener(this.notificationLog);
    }
  }

  private async onGMSRegisterNotificationListener() {
    //  When the application is running, but in the background.
    this.fcmOnOpenListener = this.fcmInstance.onNotificationOpenedApp(
      remoteMessage => {
        this.printLog(remoteMessage, 'onGMRegister');
        // Notification caused app to open from background state
        if (remoteMessage) {
          const data: NotificationItemType = convertDataToNotification(
            remoteMessage?.data,
          );
          const notification: FirebaseMessagingTypes.Notification =
            remoteMessage.notification ? remoteMessage.notification : {};
          if (this.handleActionNotification) {
            if (this.notificationHistory.includes(data.id)) {
              return;
            }
            this.handleActionNotification(
              notification,
              data,
              NOTIFICATION_TYPE.opened,
            );
            this.notificationHistory.unshift(data.id);
          }
        }
      },
    );
    //  When the application is opened from a quit state.
    this.fcmInstance.getInitialNotification().then(remoteMessage => {
      this.printLog(remoteMessage, 'init');
      // Notification caused app to open from terminate state
      if (remoteMessage) {
        const data: NotificationItemType = convertDataToNotification(
          remoteMessage?.data,
        );
        const notification: FirebaseMessagingTypes.Notification =
          remoteMessage.notification ? remoteMessage.notification : {};
        this.initialNotificationData = data;
        if (this.handleActionNotification) {
          if (this.notificationHistory.includes(data.id)) {
            return;
          }
          this.handleActionNotification(
            notification,
            data,
            NOTIFICATION_TYPE.initial,
          );
          this.notificationHistory.unshift(data.id);
        }
      }
    });

    /**
     * If the application is in the foreground, an event will be delivered containing the notification data and no visible notification will be displayed.
     * See the Usage documentation to learn more about handling events.
     * https://rnfirebase.io/messaging/notifications
     */
    // Listen for a Notification when in app
    this.fcmOnMessageListener = this.fcmInstance.onMessage(remoteMessage => {
      this.printLog(remoteMessage, 'onMessage');
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      // const channel = new messaging.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max).setDescription('My apps test channel'); //add this line
      // messaging.notifications().android.createChannel(channel); //add this line
      if (remoteMessage) {
        const data: NotificationItemType = convertDataToNotification(
          remoteMessage?.data,
        );
        const notification: FirebaseMessagingTypes.Notification =
          remoteMessage.notification ? remoteMessage.notification : {};
        if (this.handleDisplayNotification) {
          this.handleDisplayNotification(
            notification,
            data,
            NOTIFICATION_TYPE.receive,
          );
        }
      }
    });
    // https://rnfirebase.io/messaging/usage#background-application-state
  }

  private async onRegisterNotificationListener() {
    try {
      this.onGMSRegisterNotificationListener();
    } catch (error) {}
  }

  private async printLog(remoteMessage, flag) {
    this.notificationLog.messages.unshift(remoteMessage);
    this.changeLogListener && this.changeLogListener(this.notificationLog);
    console.log('receive new message', flag, remoteMessage?.data);
  }
}
