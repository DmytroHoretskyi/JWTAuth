import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    is_agreed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User;
