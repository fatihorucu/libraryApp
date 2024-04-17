import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.post("/signup", UsersController.createUser);
router.get("/", UsersController.getAuthenticatedUser);
router.post("/login", UsersController.login);
router.get("/all", UsersController.getUsers);
router.post("/logout", UsersController.logout);

export default router;
