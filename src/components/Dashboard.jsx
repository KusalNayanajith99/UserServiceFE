import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { cartService } from '../services/cartService';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const user = userService.getCurrentUser();
    setUsername(user);

    const fetchCart = async () => {
      try {
        const userCart = await cartService.getUserCart(user);
        setCart(userCart);
      } catch (error) {
        console.error('Failed to fetch cart', error);
      }
    };

    fetchCart();
  }, []);

  const handleLogout = () => {
    userService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart && cart.cartItems ? (
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.skuCode} className="mb-2 p-2 border rounded">
                  SKU: {item.skuCode}, Quantity: {item.qyt}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;