import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controllers";
 import { checkJwtMiddleware } from "../middlewares/checkJwt_middleware";

const userRoutes: Router = Router();

userRoutes.get("/", 
// checkJwtMiddleware, 
getAllUsers);

userRoutes.post("/", createUser);

userRoutes.patch("/:userID", updateUser);

userRoutes.delete("/:userID", deleteUser);

export default userRoutes;
