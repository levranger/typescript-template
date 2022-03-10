import axios from 'axios';
import { message } from 'antd';

const API_URL = 'https://adminapi.happypurim.app/api/admin';

export const instance = axios.create({ baseURL: API_URL });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        message.error(error.response.data, 3);
      } else if (error.response.status === 401) {
        message.error(error.response.data, 3);
        // auth.logout().then(window.location.reload());
      }
    }
  }
);

export const callApi = ({ url, method, data }) =>
  instance({ url, method: method || 'GET', data }).then(
    (response) => response.data
  );
