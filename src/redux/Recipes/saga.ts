import { replace } from '@navigations/index';
import {FoodQueryParams, JobRequestParams, getHomeFoodCategory, getJobCurrent, getRecipeApi, getSearchAPI, getSearchRecipeApi} from './api';
import {UpdateFoodCategory, UpdateRecipeAction, UpdateSearchCurrentData, UpdateSearchRecipe, getCategoryFood, getDataSearchCurrentAction, getRecipeAction, getSearchRecipeAction} from './reducer';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest, all, ForkEffect, delay} from 'redux-saga/effects';
import { setloading } from '@redux/Application/reducer';

function* getRecipe(action): any {
  try {
    yield put(setloading(true));

    const response = yield call(getRecipeApi,action.payload);
  
    
    if (response) {

      yield put(UpdateRecipeAction(response))
      
    
      // yield put();
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}


function* getSearchRecipe(action): any {
  try {
    yield put(setloading(true));

    const response = yield call(getSearchRecipeApi,action.payload);
  
   console.log(response.results)
    if (response.results) {

      yield put(UpdateSearchRecipe({
        data:response.results,
        number: action.payload.number,
        query:action.payload.query}))
      
    
      // yield put();
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(setloading(false));
  }
}
export default function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(getRecipeAction.type, getRecipe);
  yield takeLatest(getSearchRecipeAction.type, getSearchRecipe);
}
