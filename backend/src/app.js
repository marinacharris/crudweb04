const express = require('express')
const app = express()
const cors = require('cors')

//settings
app.set('port', process.env.port||5000)

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/articulos', require('./routes/articulos'));

module.exports = app;
