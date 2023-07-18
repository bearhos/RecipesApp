import ApiClient, {apiClient} from '@api/index';
import {makeParam} from '@api/utils/common';
import {call} from 'redux-saga/effects';

export type JobRequestParams = {
  query?: string;
  date_posted?: string;
};

export function* getJobCurrent() {
  const newQuery = {
    num_pages: 1, // default page count
    page: 1,
    query: 'all', // default first page
  };
  const queries = makeParam(newQuery);
  const apiRequest = () => new apiClient().get('/search');
  return yield call(apiRequest);
}
export async function getSearchAPI() {
  try {
    const newQuery = {
      num_pages: 1, // default page count
      page: 1,
      query: 'dev', // default first page
    };
    const response = await ApiClient.get(
      `/search?keywords=reactnative,react,developer&resultsToTake=10`,
    );

    return response;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}
export async function getSearchRecentAPI() {
  try {
    const newQuery = {
      num_pages: 1, // default page count
      page: 1,
      query: 'dev', // default first page
    };
    const response = await ApiClient.get(`/search`, {
      params: newQuery,
    });

    return response;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}
