import axiosInstance from './axiosConfig';
import bcrypt from 'bcryptjs';

export const userService = {
  register: async (userData) => {
    try {
      const processedData = {
        ...userData,
        age: parseInt(userData.age),
        isCus: true
      };
      const response = await axiosInstance.post('/addUser', processedData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/authenticate', credentials);
      if (response.data) {
        localStorage.setItem('userToken', response.data);
        localStorage.setItem('username', credentials.userName);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  getCurrentUser: () => {
    return localStorage.getItem('username');
  },

  logout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
  },

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
};