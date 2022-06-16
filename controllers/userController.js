import jwtTokens from "../utils/jwt-helpers.js";
import {
    getUsers,
    createUser
} from "../services/userService.js";

async function getUsersController (req, res, next) {
    try {
        const users = await getUsers()
        return res.status(201).json(users);
    }catch (err){
        next(err);
    }
}

async function creteUserController (req, res, next) {
    try {
        const {name, email, password, birthdate, country, is_agreed} = req.body
        const newUser = await createUser(name, email, password, birthdate, country, is_agreed)
        return res.status(201).json({...newUser.dataValues, ...(jwtTokens(newUser))});
    }catch (err){
        next(err);
    }
}

export default {
    getUsersController,
    creteUserController
};
