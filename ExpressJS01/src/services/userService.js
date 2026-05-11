require ('dotenv').config();

const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        return {
            EC: 0,
            EM: 'Create user successfully',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
        };
    } catch (error) {
        return {
            EC: -1,
            EM: 'Create user failed',
            data: {}
        };
    }
};


const loginUserService = async (email, password) => {
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const payload = { email: user.email, name: user.name, id: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        return {
            EC: 0,
            access_token: accessToken,
            user: { email: user.email, name: user.name, role: user.role },
        };
    } catch (error) {
        console.log('Error in loginUserService:', error);
        return null;
    };
}

const getAllUsersService = async () => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });
        return users;
    } catch (error) {
        console.log('Error in getAllUsersService:', error);
        return null;
    }
}

const forgorPasswordService = async () => {
    try {
        const user = await Users.findOne({where: {email}});
        if (!user) {
            return {
                EC: -1,
                EM: 'User not found'
            };
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpire =new Date(Date.now() + 1000 * 60 * 15);

        await user.update({resetToken, resetTokenExpire});

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        await transporter.sendMail({
            from: '"FullStack MySQL" <{process.env.EMAIL_USER}>',
            to: user.email,
            subject: 'Reset Password',
            html: `
                <h2>Xin chào ${user.name},</h2>
                <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link bên dưới (có hiệu lực trong 15 phút):</p>
                <a href="${resetLink}" style="
                background:#1677ff;color:white;padding:10px 20px;
                border-radius:5px;text-decoration:none;display:inline-block;margin:10px 0
                ">Đặt lại mật khẩu</a>
                <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
            `,
        });

        return {
            EC: 0,
            EM: 'Reset password email sent successfully'
        };
    } catch(error) {
        console.log('Error in forgorPasswordService:', error);
        return {
            EC: -1,
            EM: 'Reset password email failed'
        };
    }
};

const resetPasswordService = async (email, token, newPassword) => {
    try {
        const user = await Users.findOne({where: {email}});
        if (!user) {
            return {
                EC: -1,
                EM: 'User not found'
            };
        }
        if (new Date() > user.resetTokenExpire) {
            return {
                EC: -1,
                EM: 'Reset token expired'
            };
        }
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await user.update({password: hashedPassword, resetToken: null, resetTokenExpire: null});
        return {
            EC: 0,
            EM: 'Reset password successfully'
        };
    } catch(error) {
        console.log('Error in resetPasswordService:', error);
        return {
            EC: -1,
            EM: 'Reset password failed'
        };
    }
    
    module.exports = {
        createUserService,
        loginUserService,
        getAllUsersService,
        forgorPasswordService,
        resetPasswordService
    };
};