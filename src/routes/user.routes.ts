import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controllers";

const userRoutes: Router = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/", createUser);

userRoutes.patch("/:userID", updateUser);

userRoutes.delete("/:userID", deleteUser);

export default userRoutes;
