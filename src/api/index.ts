import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from './interceptor';
import axios from 'axios';
import {decode as atob, encode as btoa} from 'base-64'
const ApiClient = axios.create({
  baseURL:
    'https://api.spoonacular.com',
  headers: {
    'Content-Type': 'application/json',
    
  },
});
ApiClient.defaults.params={apiKey:'aa68784742b8452d97832a6760e8d11b'}
ApiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
ApiClient.interceptors.request.use(requestInterceptor, errorInterceptor);


export default ApiClient;
