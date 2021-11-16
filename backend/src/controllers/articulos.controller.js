const Articulo = require ('../models/Articulo');

const articulosCtrl = {};

articulosCtrl.getArticulos = async(req, res) =>{
    const articulos = await Articulo.find();
    res.json(articulos);
};

articulosCtrl.createArticulo = async(req, res)=>{
    const {titulo, imagen, descripcion, precio, stock } = req.body;
    const newArticulo = new Articulo(
        {
            titulo,
            imagen,
            descripcion,
            precio, 
            stock
        }
    );
    await newArticulo.save();
    res.json('Artículo añadido')
}

articulosCtrl.getArticulo = async(req, res)=>{
    const articulo = await Articulo.findById(req.params.id)
    res.json(articulo) 
}

articulosCtrl.deleteArticulo = async(req,res)=>{
    await Articulo.findByIdAndDelete(req.params.id)
    res.json('Articulo eliminado')
}

articulosCtrl.updateArticulo = async(req, res)=>{
    const {titulo, imagen, descripcion, precio, stock} = req.body;
    await Articulo.findByIdAndUpdate(req.params.id, {
        titulo,
        imagen,
        descripcion,
        precio, 
        stock
    })
    res.json("Articulo actualizado")
}

module.exports = articulosCtrl