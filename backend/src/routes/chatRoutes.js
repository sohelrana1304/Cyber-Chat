import express from "express";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatControllers.js";
import { userAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", userAuth, accessChat);
router.get("/", userAuth, fetchChats);
router.post("/group", userAuth, createGroupChat);
router.put("/rename", userAuth, renameGroup);
router.put("/groupRemove", userAuth, removeFromGroup);
router.put("/groupAdd", userAuth, addToGroup);

export default router;
