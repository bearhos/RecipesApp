import applicationSaga from '@redux/Application/saga';
import searchCurrentSaga from '@redux/JobSearch/saga';
import sessionSaga from '@redux/Session/saga';
import categoryFoodSaga from '@redux/Home/saga';
import recipeSaga from '@redux/Recipes/saga';
import userSagas from '@redux/components/sagas';
import {all, AllEffect, call, ForkEffect, spawn} from 'redux-saga/effects';

export default function* rootSaga(): Generator {
  // yield all([applicationSaga(), sessionSaga()]);
  return yield all([searchCurrentSaga(), sessionSaga(), applicationSaga(),categoryFoodSaga(),recipeSaga()]);
}
