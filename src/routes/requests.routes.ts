import { Router } from "express";
import {
	protectedRequest,
	publicRequest,
} from "../controllers/requests.controllers";
import { checkJwtMiddleware } from "../middlewares/checkJwt_middleware";
import { getAllUsers } from "../controllers/user.controllers";

console.log({ checkJwtMiddleware });

export const requestRouter = Router();

requestRouter.get("/public", publicRequest);
requestRouter.get("/user", checkJwtMiddleware, protectedRequest);