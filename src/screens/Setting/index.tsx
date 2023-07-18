import {useAppDispatch, useAppSelector} from '@api/hook';
import ButtonPrimary from '@components/Button';
import FastImage from '@components/FastImage/index';
import {navigateTo} from '@navigations/index';
import {getCategoryFood, selectFoodCategory} from '@redux/Home/reducer';
import {logoutSessionAction, selectSession} from '@redux/Session/reducer';
import {FIREBASE_STORAGE} from '@redux/firebaseConfig';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const SettingScreen = () => {
  const dispatch = useAppDispatch();
  const includeExtra = true;
  const userData = useAppSelector(selectSession).AuthState;
  const [choseImage, setchoseImage] = useState<any>(null);
  const [image, setImage] = useState(null);
  const usernameProfile = userData.email;
  const onPressUserImage = () => {
    ImagePicker.launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      setchoseImage,
    );
  };
  const UploadImage = async () => {
    const source = {uri: choseImage.assets[0].uri};
    const {uri} = source;
    const response = await fetch(uri);
    const blob = response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }

    Alert.alert('Photo uploaded!');
  };
  console.log(choseImage);
  return (
    <Container>
      <ScreenTitle>Setting</ScreenTitle>
      <UserImage
        onPress={() => onPressUserImage()}
        emptyText={
          usernameProfile
            ? usernameProfile.substring(0, 1)?.toUpperCase() +
              usernameProfile.substring(1, 2)?.toLowerCase()
            : ''
        }
        source={{uri: choseImage?.assets[0]?.uri ?? userData?.photoURL}}
      />
      <LogoutButton onPress={() => dispatch(logoutSessionAction())} />
      <SaveChangeButton onPress={() => UploadImage()} />
    </Container>
  );
};
const Container = styled.SafeAreaView`
  background-color: #fbfbfb;
  padding-top: 20px;
  flex: 1;
`;
const UserImage = styled(FastImage).attrs(() => ({}))`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-top: 16px;
  align-self: center;
`;
const ScreenTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;

  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const LogoutButton = styled(ButtonPrimary).attrs(props => ({
  contentStyle: {
    marginHorizontal: 20,
    marginTop: 40,
  },

  text: 'LOG OUT',
}))``;
const SaveChangeButton = styled(ButtonPrimary).attrs(props => ({
  contentStyle: {
    marginHorizontal: 20,
    marginTop: 40,
  },

  text: 'Update Profile',
}))``;
export default SettingScreen;
