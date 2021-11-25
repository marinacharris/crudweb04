const Role = require('../models/Role')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const inicio = {}

inicio.createRoles = async()=>{
    try{
        const contador = await Role.estimatedDocumentCount()
        //const contador = await Role.find({name: 'user'});
        if (contador > 0) return;
        const values = await Promise.all(
            [
                new Role({name: "user"}).save(),
                new Role({name: "admin"}).save(),
                new Role({name: "auditor"}).save()
            ]
        )
        console.log(values)
    }catch(error){
        console.error(error)
    }
}

inicio.createAdmin = async() =>{
    try{
        const user = await User.findOne({email: "admin@gmail.com"})
        const roles= await Role.find({name: {$in: ['admin']}})
        if (!user){
            await User.create({
                username: 'admin',
                email: 'admin@gmail.com',
                password: await bcrypt.hash("Admin123",10),
                roles: roles.map((role) => role._id)
                
            })
        
            console.log('Administrador creado')
        }
    }catch(error){
        console.log(error)
    }
    
}


module.exports = inicio;