import AuthClientAPI from '@api/authenApi';
import { StringIfPlural } from 'react-i18next';

export type LoginPayload = {
  email: string;
  password: string;
};
export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  phone: string;
  password_confirmation: string;
};
export async function loginAPI(params: LoginPayload) {
  try {
    const response = await AuthClientAPI.post(`/login`, params);

    return response;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}
export async function registerAPI(params: RegisterPayload) {
  try {
    const response = await AuthClientAPI.post(`/register`, params);
    return response;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}