import axios from 'axios';

const getHeaders = () => ({
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
});

const instanciaAxios = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  headers: getHeaders(),
});

export default instanciaAxios;
