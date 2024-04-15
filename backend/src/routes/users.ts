import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.post("/signup", UsersController.createUser);
router.get("/", UsersController.getUsers);
router.post("/login", UsersController.login);
router.post("/currentUser", UsersController.getAuthenticatedUser);

export default router;
