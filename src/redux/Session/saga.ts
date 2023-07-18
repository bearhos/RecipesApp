
import {LoginPayload, RegisterPayload, loginAPI, registerAPI} from './api';
import {
  UpdateSessionData,
  loginSessionAction,
  logoutSessionAction,
  registerSessionAction,
} from './reducer';
import {push, replace} from '@navigations/index';
import {ToastType, setloading, showToast} from '@redux/Application/reducer';
import {FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB} from '@redux/firebaseConfig';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {ForkEffect, call, delay, put, takeLatest} from 'redux-saga/effects';

const auth = FIREBASE_AUTH;
function* loginSaga({payload}: PayloadAction<LoginPayload>): any {
  try {
    yield put(setloading(true));
    
    const response = yield call(
      signInWithEmailAndPassword,
      auth,
      payload.email,
      payload.password,
    );

    if (response) {
      yield put(
        showToast({
          toastMessage: response?.message || 'Login Success',
          // toastMessage: 'Verify individual success.',
          toastType: ToastType.SUCCESS,
        }),
      );
      console.log(response);
      yield put(UpdateSessionData(response.user));
      yield delay(500, replace('HomeStack'));
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}
///

function* registerSaga({payload}: PayloadAction<RegisterPayload>): any {
  try {
    yield put(setloading(true));

    const response = yield call(
      createUserWithEmailAndPassword,
      auth,
      payload.email,
      payload.password,
    );

    if (response) {
      yield put(
        showToast({
          toastMessage: response?.message || 'Register Success',
          // toastMessage: 'Verify individual success.',
          toastType: ToastType.SUCCESS,
        }),
      );
      console.log(response.user, 'register');
      yield put(
        UpdateSessionData({
          accessToken: response.user.accessToken,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
          username: response.user.displayName,
          photoURL: response.user.photoURL,
          uid: response.user.uid,
        }),
      );
      yield delay(500, replace('HomeStack'));
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}
function* logoutSaga({payload}: PayloadAction<RegisterPayload>): any {
  try {
    yield put(setloading(true));
  
    yield call(auth.signOut);
    yield put(
      showToast({
        toastMessage: 'Logout Success',
        // toastMessage: 'Verify individual success.',
        toastType: ToastType.SUCCESS,
      }),
    );
    yield put(
      UpdateSessionData({
        username: '',
        token: '',
        phoneNumber: '',
        email: '',
      }),
    );
    yield delay(500, replace('LoginScreen'));
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}
export default function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(loginSessionAction.type, loginSaga);
  yield takeLatest(registerSessionAction.type, registerSaga);
  yield takeLatest(logoutSessionAction.type, logoutSaga);
}
