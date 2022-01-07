import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/';

class UserService {
  getLocations() {
    return axios.get(API_URL + 'locations', { headers: authHeader() });
  }

  getProducts() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }

  getFamilies() {
    return axios.get(API_URL + 'families', { headers: authHeader() });
  }

  getTransactions() {
    return axios.get(API_URL + 'transactions', { headers: authHeader() });
  }
}

export default new UserService();
