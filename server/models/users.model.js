import { DataTypes } from "sequelize";
import sequelize from "../database";
import bcrypt from 'bcryptjs'

const User = sequelize.define(
    'Users', {
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {isEmail: true}
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type:DataTypes.ENUM('sysadmin', 'doctor'),
            defaultValue: 'doctor'
        },
        status:{
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    }, {
        hooks :{
            beforeCreate: async (user) =>{
                user.password =await bcrypt.hash(user.password, 10)
            }
        }
    }
)

Users.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default User