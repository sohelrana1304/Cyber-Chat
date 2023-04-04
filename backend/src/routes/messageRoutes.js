import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageControllers.js";
const router = express.Router();

router.post("/", userAuth, sendMessage);
router.get("/:chatId", userAuth, allMessages);

export default router;
