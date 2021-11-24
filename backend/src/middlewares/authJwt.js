const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')
const config = require('../config')

const autorizar = {};

autorizar.verifyToken = async(req, res, next)=>{
    let token = req.headers['x-access-token']; //recibiendo token
    if(!token) return res.status(403).json({
        message: 'No hay Token'
    })
    try{
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        const user = await User.findById(req.userId, {password:0})
        if(!user) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        next();
    }catch(error){
        return res.status(401).json({

            message:'Autorizado'
        })
    }
}

autorizar.isAdmin = async(req,res, next) =>{
    try{
        const  user = await User.findById(req.userId);
        const roles = await Role.find({_id: {$in: user.roles}})
    }

}

module.exports = autorizar;