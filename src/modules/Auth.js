
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

  static saveUser(user) {
    localStorage.setItem('username', user.name);
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
        body: JSON.stringify({ email, password }),
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // this.authenticateUser(result.token);
          console.log('Successfully logged in!');
          console.log(result);
          this.saveUser(result.user);
          callback();
        }
      })
  }

  static logOut(callback) {
    fetch(
      'http://localhost:3001/logout',
      {
        method: 'POST'
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.removeUser();
        }
        callback(result.success);
      })
  }
}

