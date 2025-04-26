import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from 'bcryptjs'

const User = sequelize.define(
    'User', {
        id :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash)
            }
        },
        role:{
            type:DataTypes.ENUM('sysadmin', 'doctor'),
            defaultValue: 'doctor'
        },
        status:{
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    },{
        tableName : 'users',
        hooks : {
            beforeCreate: (user) => user.email = user.email.toLowerCase()
        }
    }
)

User.prototype.comparePassword = async function (password) {
    return  bcrypt.compare(enteredPassword, this.password);
};

export default User