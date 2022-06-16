import {Router} from "express";

import userController from "../controllers/userController.js";
import {authenticateToken} from "../middlewares/authorization.js";

const userRouter = Router();

userRouter.get('/users',authenticateToken, userController.getUsersController)
userRouter.post('/register', userController.creteUserController)

export default userRouter;
