import { DataTypes } from 'sequelize';
import dbConnected from "../db/index.js";

const User = dbConnected.define('User', {
    user_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_Email: {
        type: DataTypes.STRING, // Ensure it's mapped correctly as STRING
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Is_Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    Is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING, // Assuming OTPs are strings
        allowNull: true,
    }
}, {
    tableName: 'User', 
    timestamps: true,
});

export default User;
