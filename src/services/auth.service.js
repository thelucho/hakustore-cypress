import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.username,
        password: user.password
      })
      .then(response => {
        console.log('RESPONSE LOGIN: ', response);
        if (response.data.access_token) {
          localStorage.setItem('jwt', JSON.stringify(response.data.access_token));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
