import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from './interceptor';
import axios from 'axios';

const AuthClientAPI = axios.create({
  baseURL: 'https://apingweb.com/api',
  
});
AuthClientAPI.interceptors.response.use(responseInterceptor, errorInterceptor);
AuthClientAPI.interceptors.request.use(requestInterceptor, errorInterceptor);
export default AuthClientAPI;
