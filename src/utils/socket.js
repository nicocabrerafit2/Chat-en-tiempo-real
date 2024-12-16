import { Server } from 'socket.io';
import ChatController from '../controllers/chatController.js';

export function initializeSocket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('checkUsername', (username, callback) => 
      ChatController.handleCheckUsername(socket, username, callback)
    );
    
    socket.on('mensaje', (data) => 
      ChatController.handleMessage(socket, io, data)
    );
    
    socket.on('nuevoUsuario', (data) => 
      ChatController.handleNewUser(socket, io, data)
    );
    
    socket.on('userDisconnected', (data) => 
      ChatController.handleDisconnection(socket, io, data)
    );
  });

  return io;
} 