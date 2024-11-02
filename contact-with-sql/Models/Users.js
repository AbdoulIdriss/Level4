const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig/database');

const User = sequelize.define('User', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    }
} );

module.exports = User;