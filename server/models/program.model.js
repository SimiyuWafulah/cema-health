import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Program = sequelize.define(
    'Program', {
        name : {
            type:DataTypes.STRING,
            allowNull:false,
            unique:  true
        }
    }
)

export default Program