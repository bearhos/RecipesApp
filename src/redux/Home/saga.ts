import { replace } from '@navigations/index';
import {FoodQueryParams, JobRequestParams, getHomeFoodCategory, getJobCurrent, getSearchAPI} from './api';
import {UpdateFoodCategory, UpdateSearchCurrentData, getCategoryFood, getDataSearchCurrentAction} from './reducer';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest, all, ForkEffect, delay} from 'redux-saga/effects';
import { setloading } from '@redux/Application/reducer';

function* getFoodCategory({payload}: PayloadAction<FoodQueryParams>): any {
  try {
    yield put(setloading(true));

    const response = yield call(getHomeFoodCategory,payload);

    if (response) {
      console.log(response);
      yield put(UpdateFoodCategory({
        data: response?.results,
        type: payload?.type ??"",
      }))
      
    
      // yield put();
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}

export default function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(getCategoryFood.type, getFoodCategory);
}
