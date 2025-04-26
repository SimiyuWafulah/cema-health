import { DataTypes } from "sequelize";
import sequelize from '../database.js'

const Client = sequelize.define(
    'Client', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[2,100]
            }
        },

        email : {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail: true
            }
        }
    }, {timestamps: true}
)

export default Client