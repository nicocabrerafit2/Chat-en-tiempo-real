import { Server } from 'socket.io';
import ChatController from '../controllers/chatController.js';

export function initializeSocket(server) {
  const io = new Server(server, {
    pingTimeout: 5000,
    pingInterval: 10000
  });

  const connectedSockets = new Map();

  io.on('connection', (socket) => {
    socket.on('checkUsername', (username, callback) => 
      ChatController.handleCheckUsername(socket, username, callback)
    );
    
    socket.on('mensaje', (data) => 
      ChatController.handleMessage(socket, io, data)
    );
    
    socket.on('nuevoUsuario', (data) => {
      connectedSockets.set(socket.id, data.user);
      ChatController.handleNewUser(socket, io, data);
    });
    
    socket.on('userDisconnected', (data) => {
      connectedSockets.delete(socket.id);
      ChatController.handleDisconnection(socket, io, data);
    });

    socket.on('disconnect', () => {
      const username = connectedSockets.get(socket.id);
      if (username) {
        console.log(`Usuario ${username} desconectado por pérdida de conexión`);
        ChatController.handleDisconnection(socket, io, { user: username });
        connectedSockets.delete(socket.id);
      }
    });
  });

  return io;
} 