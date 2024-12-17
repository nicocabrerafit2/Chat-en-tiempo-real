import User from '../models/User.js';
import { config } from '../config/config.js';

class UserService {
  constructor() {
    this.users = new Map();
  }

  addUser(username) {
    if (!username || typeof username !== 'string') {
      throw new Error('Nombre de usuario inválido');
    }

    if (username.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (this.users.size >= config.maxUsers) {
      throw new Error("Cantidad de usuarios alcanzada");
    }

    if (this.users.has(username)) {
      throw new Error("Nombre de usuario ya está en uso");
    }

    const newUser = new User(username);
    this.users.set(username, newUser);
    return newUser;
  }

  removeUser(username) {
    return this.users.delete(username);
  }

  isUsernameTaken(username) {
    return this.users.has(username);
  }

  getUsers() {
    return Array.from(this.users.values());
  }
}

export default new UserService(); 