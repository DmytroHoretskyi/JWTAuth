import jwt from "jsonwebtoken";
import AuthError from "../errors/authError.js";
import User from "../orm/models/userModel.js";
import jwtTokens from "../utils/jwt-helpers.js";

export async function login(email){
    return await User.findOne({where: {email}})
}

export async function getRefreshToken(token){
    const verify = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    if (!verify) {
        throw new AuthError(403, 'jwt is not verified')
    }
    return jwtTokens(verify)
}
