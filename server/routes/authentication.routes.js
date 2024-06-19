//routes/authentication.routes.js

const { Router } = require('express');
const { loginUser, createUser  } = require('../controllers/authentication.controller')

const router = Router();


router.post('/login', loginUser )
router.post('/register', createUser )



module.exports= router;