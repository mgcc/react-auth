
import Cookies from 'universal-cookie';

export default class Auth {

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static saveUser(userData) {
    localStorage.setItem('username', userData.name);
  }

  static removeUser() {
    localStorage.removeItem('username');
  }

  static getUsername() {
    return localStorage.getItem('username');
  }

  static logIn(email, password, callback) {

    fetch(
      'http://localhost:3001/login',
      {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (result.success) {
          this.saveUser(result.userData);

          const cookies = new Cookies();

          cookies.set(
            'auth-token',
            result.token,
            {
              path: 'localhost:3001/',
              maxAge: 60*5 // 5 minutes
            });
        }
        callback(result.success);
      })
  }

  static logOut(callback) {
    const cookies = new Cookies();
    cookies.remove('auth-token');

    this.removeUser();
    callback(true);

  }

  static authFetch(url, method, callback) {

    fetch(url,
      {
        method: method,
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      .then(response => response.json())
      .then((result) => {
        callback(result);
      })
  }
}

