const express = require('express')
const app = express()
const cors = require('cors')

const inicio = require('./libs/initialSetup')

inicio.createRoles()
inicio.createAdmin()


//settings
app.set('port', process.env.port||80)

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/articulos', require('./routes/articulos'));
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth.routes'))

module.exports = app;
