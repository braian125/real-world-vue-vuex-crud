import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://crud.local/api/v1/',
  /*headers: {
    Authorization: '',
  },*/
});