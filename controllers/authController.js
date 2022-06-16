import {getRefreshToken, login} from "../services/authService.js";
import jwtTokens from "../utils/jwt-helpers.js";

async function loginController(req, res, next) {
    try {
        const {email} = req.body;
        const user = await login(email);
        let tokens = jwtTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true,
            ...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN})
        });
        res.json({...user.dataValues, ...tokens})
    }catch (err){
        next(err);
    }
}

async function refreshTokenController(req, res, next){
    try {
        const refreshToken = req.cookies.refresh_token;
        const newRefreshToken = await getRefreshToken(refreshToken)
        res.cookie('refresh_token', newRefreshToken.refreshToken,  {
            ...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        return res.json({accessToken: newRefreshToken.accessToken});

    }catch (err){
        next(err)
    }
}

async  function deleteTokenController(req, res, next){
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({message: "Refresh token deleted"})
    }catch (err){
        next(err)
    }
}

export default {
    loginController,
    refreshTokenController,
    deleteTokenController,
}
