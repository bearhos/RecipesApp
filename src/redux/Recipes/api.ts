import ApiClient, {apiClient} from '@api/index';
import {makeParam} from '@api/utils/common';
import {call} from 'redux-saga/effects';

export type FoodQueryParams = {
  type?: string;
  query?: string;
  number?: number;

};


export async function getRecipeApi(id:number) {
  try {
   
    const response = await ApiClient.get(`/recipes/${id}/information`);
    return response;
  } catch (error) {
 
    throw error;
  }
}
export async function getSearchRecipeApi(params: FoodQueryParams) {
  try {
    const newQuery = {
    
     
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