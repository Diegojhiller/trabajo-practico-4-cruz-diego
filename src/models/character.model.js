import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const characters = sequelize.define("character",{
    id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true,},
    name: {type: DataTypes.STRING, allowNull: false, unique:true },
    ki:{type: DataTypes.INTEGER, allowNull:false},
    race:{type: DataTypes.STRING, allowNull:false},
    gender:{type: DataTypes.ENUM("Male", "Female"), allowNull:false},
    description:{type: DataTypes.STRING }
});
export default characters;