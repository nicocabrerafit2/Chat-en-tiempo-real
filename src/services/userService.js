import User from '../models/User.js';
import { config } from '../config/config.js';
import { LIMITS } from '../config/constants.js';
class UserService {
  constructor() {
    this.users = new Map();
  }

  addUser(username) {
    if (!username || typeof username !== 'string') {
      throw new Error('Nombre de usuario inválido');
    }

    if (username.length < LIMITS.MIN_USERNAME_LENGTH) {
      throw new Error(`El nombre debe tener al menos ${LIMITS.MIN_USERNAME_LENGTH} caracteres`);
    }
     if (username.length >   LIMITS.MAX_USERNAME_LENGTH) {
      throw new Error(`El nombre no puede tener más de ${LIMITS.MAX_USERNAME_LENGTH} caracteres`);
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