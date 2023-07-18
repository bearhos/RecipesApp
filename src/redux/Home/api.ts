import ApiClient, {apiClient} from '@api/index';
import {makeParam} from '@api/utils/common';
import {call} from 'redux-saga/effects';

export type FoodQueryParams = {
  type?: string;
  query?: string;
  number?: number;

};


export async function getHomeFoodCategory(params: FoodQueryParams) {
  try {
    const newQuery = {
    
      number: 20,
      ...params
    };
    const response = await ApiClient.get(`/recipes/complexSearch`, {
      params: newQuery,

    });

    return response;
  } catch (error) {
 
    throw error;
  }
}
