import { DataTypes, STRING } from 'sequelize';
import dbConnected from "../db/index.js";

const Rider = dbConnected.define('Rider', {
    Rider_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adharCard: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [12, 12],
        },
    },
    drivingLicense: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18, 
        },
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleModel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
    isAuthenticated:{
        type: DataTypes.BOOLEAN, // Changed to DataTypes.BOOLEAN
        defaultValue: false,
        allowNull: false
    },
    otp:{
        type:STRING,
        allowNull:true
    }
}, {
    tableName: 'Rider', 
    timestamps: true,
});

export default Rider;
