const User = require('../models/User')
const Role = require('../models/Role')
const authCtrl = {}
const config = require('../config')
const jwt = require('jsonwebtoken')

authCtrl.signUp = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            roles
        } = req.body;
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
        //verificacion de roles
        if (req.body.roles) {
            const foundRoles = await Role.find({
                name: {
                    $in: roles
                }
            });
            newUser.roles = foundRoles.map((role) => role._id)
        } else {
            const role = await Role.findOne({
                name: "user"
            })
            newUser.roles = [role._id]
        }

        //salvar usuario en mongo
        const savedUser = await newUser.save();

        //crear token
        const token = jwt.sign({
            id: savedUser._id
        }, config.SECRET, {
            expiresIn: 86400
        }) //24 horas
        return res.status(200).json({
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}
authCtrl.signIn = async (req, res) => {
    //res.json('unsario ingresa')
    try{
        const userFound = await User.findOne({username: req.body.username}).populate('roles')

        if(!userFound) return res.status(400).json ({message: 'Usuario no existe'})

        const matchPassword = await User.comparePassword(req.body.password,userFound.password)

        if(!matchPassword)
            return res.status(400).json({
                token: null,
                message: 'Clave incorrecta'
            })

            const token = jwt.sign({
                id: userFound._id
            }, config.SECRET, {
                expiresIn: 86400
            }) //24 horas

            res.json({token});
             
    }catch(error){
        console.log(error)
    }

}

module.exports = authCtrl;