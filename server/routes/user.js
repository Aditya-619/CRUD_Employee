const { Router } = require('express');
const { 
    registerUser, 
    loginUser,
} = require('../controllers/user.js');

const userRoute = Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

module.exports = userRoute;