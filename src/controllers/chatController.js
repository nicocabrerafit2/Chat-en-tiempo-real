import chatService from '../services/chatService.js';
import userService from '../services/userService.js';
import { LIMITS } from '../config/constants.js';

class ChatController {
  static async renderHome(req, res) {
    try {
      res.render("home", { 
        title: "Chat en Tiempo Real",
        description: "Aplicación de chat en tiempo real" 
      });
    } catch (error) {
      console.error('Error rendering home:', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  static handleCheckUsername(socket, username, callback) {
    try {
      if (!username || username.length < LIMITS.MIN_USERNAME_LENGTH) {
        callback({
          available: false,
          error: `El nombre de usuario debe tener al menos ${LIMITS.MIN_USERNAME_LENGTH} caracteres`
        });
        return;
      }

      const isAvailable = !userService.isUsernameTaken(username);
      callback({
        available: isAvailable,
        error: isAvailable ? null : "Este nombre de usuario ya está en uso"
      });
    } catch (error) {
      callback({
        available: false,
        error: error.message
      });
    }
  }

  static handleMessage(socket, io, data) {
    try {
      const message = chatService.addMessage(data.user, data.mensaje);
      io.emit('conversacion', chatService.getMessages());
    } catch (error) {
      socket.emit('errorMessage', {
        type: 'error',
        message: error.message
      });
    }
  }

  static handleNewUser(socket, io, data) {
    try {
      const user = userService.addUser(data.user);
      socket.emit('conversacion', chatService.getMessages());
      const userList = userService.getUsers();
      io.emit('conectados', userList);
    } catch (error) {
      socket.emit('errorMessage', {
        type: 'error',
        message: error.message
      });
    }
  }

  static handleDisconnection(socket, io, { user }) {
    try {
      if (user) {
        userService.removeUser(user);
        io.emit('conectados', userService.getUsers());
      }
    } catch (error) {
      console.error('Error handling disconnection:', error);
    }
  }
}

export default ChatController; 