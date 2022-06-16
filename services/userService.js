import bcrypt from "bcrypt";

import User from "../orm/models/userModel.js";


export async function getUsers(){
    return await  User.findAll()
}

export async function createUser(name, email, password, birthdate, country, is_agreed){
    const hashedPassword = await  bcrypt.hash(password, 10);
    return User.create({name, email, password: hashedPassword, birthdate, country, is_agreed});
}
