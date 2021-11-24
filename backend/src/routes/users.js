const {Router} = require('express');
const router = Router();
const {getUsers, createUser, deleteUser} = require('../controllers/users.controllers')
const {validar, autorizar} = require('../middlewares')

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .delete(deleteUser)

module.exports = router;