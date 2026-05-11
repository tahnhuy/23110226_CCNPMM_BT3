const express = require('express');
const {
    createUser,
    handleLogin,
    getAllUsers,
    handleForgorPassword,
    handleResetPassword,
    getAccount,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

routerAPI.use(auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
});

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
routerAPI.get('/users', getAllUsers);
routerAPI.get('/account', getAccount);
routerAPI.post('/forgot-password', handleForgorPassword);
routerAPI.post('/reset-password', handleResetPassword);

module.exports = routerAPI;