import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { cartService } from '../services/cartService';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: '',
    password: '',
    email: '',
    name: '',
    age: '',
    dob: ''
  });

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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/user/getUser/${username}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300"
    style={{
      backgroundImage: "url('https://lithospos.com/blog/wp-content/uploads/2021/05/close-up-view-shopping-cart-overloaded-with-food-while-background-female-person-choosing-products-min-1200x800.jpg')",
    }}
    >
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 focus:outline-none"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zM17.25 18c0-2.07-2.136-3.75-5.25-3.75s-5.25 1.68-5.25 3.75"
                  />
                </svg>
              </div>

              <span className="hidden sm:inline-block font-medium">{username}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-10">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    fetchUserDetails();
                    setShowDropdown(false);
                    setShowProfileModal(true);
                  }}
                >
                  View Profile
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome, <span className="text-blue-600">{username}</span>!
          </h1>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Cart</h2>
            {cart && cart.cartItems ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cart.cartItems.map((item) => (
                  <li
                    key={item.skuCode}
                    className="bg-gray-100 p-4 border rounded-lg shadow-sm hover:shadow-md"
                  >
                    <p className="font-medium">SKU: {item.skuCode}</p>
                    <p>Quantity: {item.qyt}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Your cart is empty</p>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {userDetails && showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h2>
            <div className="space-y-3">
              <p>
                <strong>Username:</strong> {userDetails.userName}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p>
                <strong>Age:</strong> {userDetails.age}
              </p>
              <p>
                <strong>Date of Birth:</strong>{' '}
                {new Date(userDetails.dob).toLocaleDateString()}
              </p>
            </div>
            <button
              className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowProfileModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
