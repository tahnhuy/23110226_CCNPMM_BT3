import axios from './axios.customize';

const createUserApi = (name, email, password) => {
  return axios.post('/api/v1/register', { name, email, password });
};

const loginApi = (email, password) => {
  return axios.post('/api/v1/login', { email, password });
};

const getUserApi = () => {
  return axios.get('/api/v1/users');
};

const forgotPasswordApi = (email) => {
  return axios.post('/api/v1/forgot-password', { email });
};

const resetPasswordApi = (email, token, newPassword) => {
  return axios.post('/api/v1/reset-password', { email, token, newPassword });
};

const getAccountApi = () => {
  return axios.get('/api/v1/account');
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getAccountApi,
};
