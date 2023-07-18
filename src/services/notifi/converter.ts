
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {MessagesItemType} from '@redux/notification/reducer';
import camelcaseKeys from 'camelcase-keys';
import {URL as PolyfillUrl} from 'react-native-url-polyfill';

import {
  BranchItemType,
  NotificationItemType,
  NOTIFICATION_MESSAGE_TYPE,
} from './type';

export const convertDataToNotification = (
  data: FirebaseMessagingTypes.RemoteMessage['data'],
): NotificationItemType => {
  const formattedData = camelcaseKeys(data ?? {}, {
    deep: true,
  }) as unknown as any;
  let notificationItem = Object.assign({}, formattedData);
  try {
    const object = JSON.parse(data?.object ?? '');
    notificationItem.object = object;
  } catch (error) {
    // ignore
  }
  try {
    const sender = JSON.parse(data?.sender ?? '');
    notificationItem.sender = sender;
  } catch (error) {
    // ignore
  }
  try {
    const additionalInfo = JSON.parse(data?.additionalInfo ?? '');
    notificationItem.additionalInfo = additionalInfo;
  } catch (error) {
    // ignore
  }

  notificationItem = camelcaseKeys(notificationItem, {
    deep: true,
  }) as unknown as NotificationItemType;

  return notificationItem;
};

export const convertNotificationToMsg = async ({
  notification,
  dataReceived,
}: {
  notification: FirebaseMessagingTypes.Notification;
  dataReceived: NotificationItemType;
}): Promise<MessagesItemType> =>
  Promise.resolve({
    id: dataReceived.id,
    notificationMessage: {
      id: `${dataReceived.id}`,
      title: notification.title ?? '',
      body: notification.body ?? '',
      notificationType: dataReceived.notificationType,
      startAt: '',
      endAt: '',
      createdAt: dataReceived.createdDate,
      updatedAt: '',
      additionalInfo: {
        commentId: dataReceived.object?.info?.commentId ?? 0,
        parentCommentId: dataReceived.object?.info?.parentCommentId ?? 0,
        reviewId: dataReceived.additionalInfo?.reviewId ?? 0,
      },
    },
    isRead: dataReceived.isRead,
    messageIds: '',
    createdAt: dataReceived.createdDate,
    updatedAt: '',
    sender: {
      type: dataReceived.sender?.type ?? '',
      info: {
        id: dataReceived?.sender?.id ?? '',
        avatarUrl: dataReceived?.sender?.info?.avatarUrl ?? '',
        username: dataReceived?.sender?.info?.username ?? '',
        isPrivate: dataReceived?.sender?.info?.isPrivate ?? false,
      },
    },
    object: {
      type: dataReceived.object?.type ?? '',
      info: {
        id: dataReceived?.object?.id ?? 0,
        title: dataReceived?.object?.info?.classTitle ?? '',
        classType: dataReceived?.object?.info?.classType ?? '',
      },
    },
    fromBranchIO: dataReceived.fromBranchIO,
  });

export const convertBranchToNotifyItem = async ({
  branchParams,
}: {
  branchParams: BranchItemType;
}): Promise<NotificationItemType> =>
  Promise.resolve({
    id: 0,
    notificationType: branchParams.notificationType,
    object: {
      id: branchParams.objectId,
      type: branchParams.objectType, // this relative model in DB
      info: {
        classTitle: branchParams?.classTitle,
        classType: branchParams?.classType,
        //
        commentId: branchParams?.commentId,
        parentCommentId: branchParams?.parentCommentId,
      },
    },
    sender: {
      id: branchParams?.sender?.id,
      info: {
        ...branchParams?.sender,
      },
    },
    additionalInfo: {
      reviewId: branchParams?.reviewId,
    },
    // extra info
    commentId: undefined,
    parentCommentId: undefined,
    reviewId: undefined,
    //
    createdDate: '',
    startAt: '',
    endAt: '',
    isRead: true, // assuming it read for bypass onMarkAsRead
    fromBranchIO: branchParams.fromBranchIO,
  });

export const splitParameters = (uri: string) => {
  try {
    const urlComponents = new PolyfillUrl(uri);
    const path = urlComponents.pathname;
    const searchParams = urlComponents.searchParams;
    // making object
    searchParams.append('path', path);
    searchParams.append('protocol', urlComponents.protocol);
    searchParams.append('host', urlComponents.hostname);
    searchParams.append('query', urlComponents.search);
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch (error) {
    return {} as any;
  }
};
