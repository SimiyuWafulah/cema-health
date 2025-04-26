import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'

const Patient = sequelize.define(
    'Patient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[2,100]
            }
        },

        contact : {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                is : /^(\+?[0-9]{10,15})$/
            }
        }
    },{
        tableName: 'patients'
    },{timestamps: true}
)

export default Patient