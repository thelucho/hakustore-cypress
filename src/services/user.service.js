import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/';

class UserService {
  getProducts() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }

  createProduct(product) {
    let accessToken = JSON.parse(localStorage.getItem('jwt'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return axios.post(API_URL + 'products', product);
  }

  deleteProduct(id) {
    return axios.delete(API_URL + `products/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
