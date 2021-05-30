import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:8080/desafio-softplan',

});

export default api;
