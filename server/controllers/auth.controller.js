import jwt from 'jsonwebtoken'
import {User } from '../models/relationships.js'

export const login = async ( req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if(!user || !(await user.comparePassowrd(password))){
            throw new Error('Invalid credentials')
        }

        const token = jwt.sign({id: user.id, role:user.role}, process.env.JWT,{expiresIn: process.env.JWT_EXPIRES});
        res.json({
            status: 'success',
            token,
            data : {
                user : {
                    id: user.id,
                    email: user.email,
                    role:user.role
                }
            }
        })
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: err.message
        })
    }
}