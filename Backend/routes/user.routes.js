const express = require('express')
const router = express.Router()
const {body} = require('expres-validator')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 5}).withMessage('Password must be at 5 characters'),
])

module.exports = router