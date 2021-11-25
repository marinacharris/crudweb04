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

        for (let i = 0; i<roles.length; i++){
            if (roles[i].name === "admin"){
                next();
                return;
            }
        }
        return res.status(403).json({
            message: 'Requiere el rol de adminnistrador'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({message: error})

    }

}

autorizar.isAuditor = async(req,res, next) =>{
    try{
        const  user = await User.findById(req.userId);
        const roles = await Role.find({_id: {$in: user.roles}})

        for (let i = 0; i<roles.length; i++){
            if (roles[i].name === "auditor"){
                next();
                return;
            }
        }
        return res.status(403).json({
            message: 'Requiere el rol de auditor'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({message: error})

    }

}

module.exports = autorizar;