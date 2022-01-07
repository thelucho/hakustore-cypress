export default function authHeader() {
  let accessToken = JSON.parse(localStorage.getItem('jwt'));

  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
