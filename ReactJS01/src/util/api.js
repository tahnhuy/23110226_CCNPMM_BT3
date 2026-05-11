import axios from './axios.customize.js';

export const getHello = () => axios.get('/');

export const postRegister = (body) => axios.post('/register', body);

export const postLogin = (body) => axios.post('/login', body);

export const getUsers = () => axios.get('/users');

export const getAccount = () => axios.get('/account');

export const postForgotPassword = (body) => axios.post('/forgot-password', body);

export const postResetPassword = (body) => axios.post('/reset-password', body);
