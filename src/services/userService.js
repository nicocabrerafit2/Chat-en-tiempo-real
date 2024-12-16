import User from '../models/User.js';
import { config } from '../config/config.js';

class UserService {
  constructor() {
    this.users = [];
  }

  addUser(username) {
    // Validación de datos
    if (!username || typeof username !== 'string') {
      throw new Error('Nombre de usuario inválido');
    }

    if (username.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (this.users.length >= config.maxUsers) {
      throw new Error("Cantidad de usuarios alcanzada");
    }

    if (this.isUsernameTaken(username)) {
      throw new Error("Nombre de usuario ya está en uso");
    }

    const newUser = new User(username);
    this.users.push(newUser);
    return newUser;
  }

  removeUser(username) {
    const index = this.users.findIndex(u => u.user === username);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }

  isUsernameTaken(username) {
    return this.users.some(u => u.user === username);
  }

  getUsers() {
    return [...this.users]; // Retornar copia para evitar mutaciones
  }
}

export default new UserService(); 