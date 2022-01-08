import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/';

class UserService {
  getProducts() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }

  createProduct(product) {
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2NDE1NzkyODAsImV4cCI6MTY0MTY2NTY4MH0.SJW4XiyUBmNHSrZ9UhMwGywbczqAedQx-xLRK9gM6T0`;
    return axios.post(API_URL + 'products', product);
  }

  deleteProduct(id) {
    return axios.delete(API_URL + `products/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
