const {
    createUserService,
    loginUserService,
    getAllUsersService,
    forgorPasswordService,
    resetPasswordService
} = require('../services/userService');

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    const data = await loginUserService(email, password);
    if (!data) {
        return res.status(401).json({EC: -1, EM: 'Email hoặc mật khẩu không đúng'});
    }
    return res.status(200).json(data);
};

const getAllUsers = async (req, res) => {
    const data = await getAllUsersService();
    return res.status(200).json(data);
};

const handleForgorPassword = async (req, res) => {
    const {email} = req.body;
    const data = await forgorPasswordService(email);
    return res.status(200).json(data);
};

const handleResetPassword = async (req, res) => {
    const {email, token, newPassword} = req.body;
    const data = await resetPasswordService(email, token, newPassword);
    return res.status(200).json(data);
};

const getAccount = async (req, res) => {
    return res.status(200).json({
        email: req.user.email,
        name: req.user.name,
        id: req.user.id,
    });
};

module.exports = {
    createUser,
    handleLogin,
    getAllUsers,
    handleForgorPassword,
    handleResetPassword,
    getAccount,
}