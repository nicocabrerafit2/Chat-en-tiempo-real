class User {
  constructor(username) {
    this.user = username;
    this.connected = true;
    this.joinedAt = new Date();
  }
}

export default User; 