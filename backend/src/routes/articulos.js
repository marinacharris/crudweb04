const {Router} = require('express');
const router = Router();
const {getArticulos, createArticulo, getArticulo, deleteArticulo, updateArticulo} = require('../controllers/articulos.controller')
router.route('/')
    .get(getArticulos)
    .post(createArticulo);

router.route('/:id')
    .get(getArticulo)
    .delete(deleteArticulo)
    .put(updateArticulo)
   



module.exports = router;