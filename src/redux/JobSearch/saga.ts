import { replace } from '@navigations/index';
import {JobRequestParams, getJobCurrent, getSearchAPI} from './api';
import {UpdateSearchCurrentData, getDataSearchCurrentAction} from './reducer';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest, all, ForkEffect, delay} from 'redux-saga/effects';
import { setloading } from '@redux/Application/reducer';

function* getSearchItems({payload}: PayloadAction<JobRequestParams>): any {
  try {
    yield put(setloading(true));

    const response = yield call(getSearchAPI);

    if (response) {
      console.log(response);
      yield put(
        UpdateSearchCurrentData({
          data: response.results,
        }),
      );
    
      // yield put();
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}

export default function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(getDataSearchCurrentAction.type, getSearchItems);
}
