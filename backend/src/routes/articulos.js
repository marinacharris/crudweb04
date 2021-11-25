const {Router} = require('express');
const router = Router();
const {autorizar} = require('../middlewares')
const {getArticulos, createArticulo, getArticulo, deleteArticulo, updateArticulo} = require('../controllers/articulos.controller')
router.route('/')
    .get(getArticulos)
    .post([autorizar.verifyToken, autorizar.isAuditor], createArticulo);

router.route('/:id')
    .get(getArticulo)
    .delete([autorizar.verifyToken, autorizar.isAdmin], deleteArticulo)
    .put([autorizar.verifyToken, autorizar.isAuditor], updateArticulo)
   



module.exports = router;