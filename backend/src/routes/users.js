const {Router} = require('express');
const router = Router();
const {getUsers, createUser, deleteUser} = require('../controllers/users.controllers')
const {validar, autorizar} = require('../middlewares')

router.route('/')
    .get(getUsers)
    .post([autorizar.verifyToken, autorizar.isAdmin, validar.checkDuplicateUsernameOrEmail],createUser);

router.route('/:id')
    .delete([autorizar.verifyToken, autorizar.isAdmin], deleteUser)

module.exports = router;