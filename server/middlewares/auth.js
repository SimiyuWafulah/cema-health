import jwt from 'jsonwebtoken';
import {User} from '../models/relationships.js';

export const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split( '') [1]
    }

    if(!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! sign in to access page'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        const currentUser = await User.findByPk(decoded.id);

        if(!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'user no longer exists'
            })
        }

        req.user = currentUser;
        next()
    } catch (err) {
        return res.status(401).json({
            status: 'fail',
            message: 'invalid token!'
        })
    }
}

export const restrictTo = (...roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)){
        return res.status(401).json({
            status: 'fail',
            message: 'You are not authorized to perform this action'
        })
    }
    next();
}


export const checkProgramOwnership = async (req, res, next) => {
    try {
      const program = await Program.findByPk(req.params.id);
      
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }
      
      if (program.createdBy !== req.user.id && req.user.role !== 'sysadmin') {
        return res.status(403).json({ message: 'Not authorized to modify this program' });
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };