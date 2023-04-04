import express from "express";
import {
  getAllUsers,
  login,
  registerUser,
} from "../controllers/userController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello from User Route");
});


router.post("/register", registerUser);
router.post("/login", login);
router.get("/", userAuth, getAllUsers);

export default router;
