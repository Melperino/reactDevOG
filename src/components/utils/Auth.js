class Auth {
  constructor() {
    this.authenticated = false;
    this.adminRole = 1;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
  isAdmin() {
    return this.adminRole;
  }
}

export default new Auth();
