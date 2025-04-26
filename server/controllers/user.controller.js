import {User} from '../models/relationships.js'

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            email : req.body.email,
            password: req.body.password,
            role: req.body.role || 'doctor'
        });

        req.status(201).json({
            status: 'success',
            data : {
                user : {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}