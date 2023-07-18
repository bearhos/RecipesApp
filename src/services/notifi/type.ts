import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export enum NOTIFICATION_TYPE {
  initial = 0,
  opened,
  receive,
}

export enum NOTIFICATION_MESSAGE_TYPE {
  default = 'Default',
  likes = 'Likes',
  posts = 'Posts',
  comments = 'Comments',
  follows = 'Follows',
  tags = 'Tags',
  chats = 'Chats',
  classes = 'Classes',
  enrollments = 'Enrollments',
  reviews = 'Reviews',
  reports = 'Reports',
  refunds = 'Refunds',
  platform_updates = 'Platform_updates',
  platform_messages = 'Platform_messages',
  profiles = 'Profiles',
  courses = 'Courses',
}

export type ExtraDataType = {
  // extra data for checking UI
  fromBranchIO: boolean;
};

export type BranchItemType = {
  notificationType: NOTIFICATION_MESSAGE_TYPE;
  objectId: string;
  objectType: string; // this relative model in DB
  sender?: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string;
  };
  // extra info
  commentId?: string;
  parentCommentId?: string;
  reviewId?: number;
  classTitle?: string;
  classType?: string;
  // from branch
  $og_description?: string;
  $og_title?: string;
} & ExtraDataType;

/**
 * payloads = {
        notification: {
          title: "Hammer",
          body: body
        },
        data: {
          id: noti_info.id,
          createdDate: noti_info.created_at,
          isRead: false,
          notificationType: notification_type,

          object: {
            id: object.id,
            type: object.model_name.name,
            # Ex: commentId, parentCommentId,..
            info: {
              # ...
            }
          },

          sender: sender.class.name == "Administrator" ? nil : {
            id: sender.id,
            type: sender.model_name.name,
            info: {
              avatarUrl: sender.avatar_url,
              name: sender.name,
              username: sender.username,
              isPrivate: sender.is_private?
            }
          },

          # other info from options will append to addtional_info
          additional_info: {
            # ...
          }
        }
      }
 */
export type NotificationItemType = {
  id: number;
  notificationType: NOTIFICATION_MESSAGE_TYPE;
  object?: {
    id?: string;
    type?: string;
    info?: {
      //commnent + reply comment + like comment
      commentId?: string;
      parentCommentId?: string;
      commentText?: string;

      //class room + report + refund
      classTitle?: string;
      classType?: string; // similar classroom type  -> CLASSROOM_TYPE
    };
  };

  sender?: {
    id?: string;
    type?: string;
    info?: {
      avatarUrl?: string;
      name?: string;
      username?: string;
      isPrivate?: boolean;
    };
  };
  additionalInfo?: {
    // extra info
    reviewId?: number;
  };
  //
  createdDate: string;
  isRead: boolean;
} & ExtraDataType;

export type NotificationHandle = (
  notification: FirebaseMessagingTypes.Notification,
  dataReceived: NotificationItemType,
  connectFcmType: NOTIFICATION_TYPE,
) => void;

export type UnSubscribeTupe = () => void;

export interface NotificationType {
  branchConfiguration: () => void;
  fcmConfiguration: () => Promise<string>;
  unRegistration: () => void;
  setBadge: (badge: number) => Promise<void>;
}
