import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import {login} from "../services/authService.js";
import AuthError from "../errors/authError.js";


export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      throw new AuthError(401, 'null token')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        throw new AuthError(403, 'jwt is not verified')
      }
      req.user = user;
      next();
    });
  }catch (err){
    next(err)
  }
}

export async function passwordValidate(req, res, next) {
  try {
    const {email, password} = req.body;
    const user = await login(email);

    if (!user){
      throw new AuthError(401, 'can not find this user')
    }

    const validatePassword  = await bcrypt.compare(password, user.dataValues.password);

    if(!validatePassword) {
      throw new AuthError(401, 'incorrect password')
    }
    next()
  }catch (err){
    next(err)
  }

}

export async function refreshTokenValidate(req, res, next) {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken)
    if (!refreshToken) {
      throw new AuthError(401, 'incorrect refresh token')
    }
    next()
  }catch (err){
    next(err)
  }

}
