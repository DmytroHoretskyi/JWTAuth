import {Router} from "express";

import authController from "../controllers/authController.js";
import {passwordValidate, refreshTokenValidate} from "../middlewares/authorization.js";

const authRouter = Router();

authRouter.post('/login',passwordValidate,  authController.loginController);
authRouter.get('/refresh_token', refreshTokenValidate,  authController.refreshTokenController);
authRouter.delete('/delete_token', authController.deleteTokenController);


export default authRouter;
