import Message from '../models/Message.js';
import { config } from '../config/config.js';


class ChatService {
  constructor() {
    this.messages = [];
  }

  addMessage(user, mensaje) {
    if (!user || !mensaje) {
      throw new Error('Usuario y mensaje son requeridos');
    }

    const newMessage = new Message(user, mensaje);
    
    if (this.messages.length >= config.maxMessages) {
      this.messages.pop();
    }
    
    this.messages.unshift(newMessage);
    return newMessage;
  }

  getMessages() {
    return [...this.messages];
  }
}

export default new ChatService(); 