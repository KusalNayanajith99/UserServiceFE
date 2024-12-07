import axiosInstance from './axiosConfig';

export const cartService = {
  getUserCart: async (username) => {
    try {
      const response = await axiosInstance.get(`/cart/${username}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Fetch cart failed');
    }
  },

  addItemToCart: async (cartInfo) => {
    try {
      const response = await axiosInstance.post('/cart/add', cartInfo);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Add to cart failed');
    }
  }
};