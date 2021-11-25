const User = require('../models/User');
const Role = require('../models/Role')
const userCtrl = {};

userCtrl.getUsers = async(req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(400).json({
            error: err
        });
    }
}

userCtrl.createUser = async (req, res) =>{
    try {
        const {username, email, password, roles} = req.body;
        const rolesFound = await Role.find({name:{$in:roles}})
        const newUser = new User({
            username,
            email,           
            password,
            roles:rolesFound.map((role)=> role._id)
        })

        newUser.password = await User.encryptPassword(newUser.password)
        const savedUser = await newUser.save();
        res.json('Usuario creado')
        return res.status(200).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            roles: savedUser.roles

        })
    }
    catch(e){
        console.log(e)
        res.json(e.errmsg);

    }
}

userCtrl.deleteUser = async (req, res) =>{
    const {id}= req.params;
    await User.findByIdAndDelete(id);
    res.json('Usuario eliminado')
}

module.exports = userCtrl