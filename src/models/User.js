class User {
  constructor(username) {
    this.user = username;
    this.connected = true;
    this.joinedAt = new Date();
    this.lastActivity = Date.now();
  }
}

export default User; 