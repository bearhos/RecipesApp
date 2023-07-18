import {launchAppAction, setloading} from './reducer';
import {navigateReset, navigateTo} from '@navigations/index';
import {selectAccessToken} from '@redux/Session/reducer';
import {ForkEffect, call, delay, put, select, takeEvery} from 'redux-saga/effects';

function* launchApp() {
  const accessToken: any = yield select(selectAccessToken);
  console.log('rehydate accesstoken', accessToken);
  yield put(setloading(false));
  try {
    yield delay(1000);
  } catch (error) {
    console.log(error);
  } finally {
    if (accessToken && accessToken.length > 0) {
      navigateReset('HomeStack');
    } else{
      navigateReset('OnBoarding');
    }
  }
}
export default function* (): Generator<ForkEffect<never>, void> {
  yield takeEvery(launchAppAction.type, launchApp);
}
