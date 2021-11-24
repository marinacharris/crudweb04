const User = require('../models/User')

const validar = {}
const ROLES = ["user", "admin"]

validar.checkDuplicateUsernameOrEmail = async(req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(user)
            return res.status(400).json({
                message: 'El usario ya existe'
            })
        const email = await User.findOne({email: req.body.email})
        if(email)
            return res.status(400).json({
                message: 'El correo ya existe'
            })
        next()
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

validar.checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.lenght; i++){
            if(!ROLES.include(req.body.roles[i])){
                return res.status(400).json({
                    message: 'El rol no existe'
                })
            }
        }
    }
    next();

}

module.exports = validar;

