import { Router } from "express";
import ChatController from '../controllers/chatController.js';

const router = Router();

router.get("/", ChatController.renderHome);

export { router };
