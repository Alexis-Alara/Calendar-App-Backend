/*
    Auth routes
    host+/api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/field-validators')
const { newUser, loginUser, renewToken } = require('../controllers/auth');
const { JWTValidators } = require('../middlewares/JWT-validators')

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidators

    ], 
    newUser);

router.post(
    '/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidators     
    ], 
    loginUser);

router.get('/renew', JWTValidators, renewToken);


module.exports = router;