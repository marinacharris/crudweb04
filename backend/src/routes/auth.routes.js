const {Router} = require('express');
const router = Router();

const {signUp, signIn} = require('../controllers/auth.controllers');

router.route('/signup')
    .post(signUp)


router.route('/signin')
    .post(signIn)



module.exports = router;

