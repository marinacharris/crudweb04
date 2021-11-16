const{Schema, model} = require('mongoose');

const articulosSchema = new Schema(
    {
        titulo: {type: String, required: true},
        imagen: String,
        descripcion: String,
        precio: {type: String},
        stock: {type: Number}
    },
);
module.exports = model ('Productos', articulosSchema)

