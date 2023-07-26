import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/manager/get');
      const Manager_list = response.data;

      // Check if the entered email and password match any manager's credentials
      const matchedManager = Manager_list.find(
        (Manager_list) => Manager_list.email === email && Manager_list.password === password
      );

      if (matchedManager) {
        // Login successful
        console.log('Login successful');
        setLoginError(false);
      } else {
        // Login failed
        console.log('Invalid email or password');
        setLoginError(true);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your password"
            />
          </div>
          {loginError==true && <p className="text-red-500 mb-4">Invalid email or password</p>}
          {loginError==false && <p className="text-red-500 mb-4">Login successful</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
