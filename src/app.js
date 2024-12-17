import express from "express";
import handlebars from "express-handlebars";
import { config } from './config/config.js';
import { router } from './routes/viewsRoutes.js';
import { initializeSocket } from './utils/socket.js';
import { __dirname } from './utils/path.js';
import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "https:", "data:"],
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"]
    }
  }
}));
app.use(compression());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite por IP
});
app.use(limiter);

// Configuración de Express
app.engine("handlebars", handlebars.engine());
app.set("views", join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(join(__dirname, "../public")));
app.use("/", router);

// Inicializar servidor
const PORT = process.env.PORT || 8080;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on ${process.env.RAILWAY_STATIC_URL || `http://${HOST}:${PORT}`}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});

// Inicializar Socket.IO
const io = initializeSocket(server);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Error interno del servidor');
});

export { app };
