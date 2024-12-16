class Message {
  constructor(user, mensaje) {
    this.user = user;
    this.mensaje = mensaje;
    this.timestamp = new Date();
  }
}

export default Message; 