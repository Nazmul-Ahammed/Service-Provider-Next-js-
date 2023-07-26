import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [DOB, setDOB] = useState('');
  const [DOBError, setDOBError] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [filename, setFilename] = useState('');
  const [filenameError, setFilenameError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send the signup data to the backend
        await axios.post('http://localhost:3000/manager/insert', {
          name,
          address,
          phone,
          email,
          DOB,
          username,
          password,
          confirmPassword,
          filename,
        });

        // Signup successful, redirect or show success message
        console.log('Signup successful');
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    // Validate name field
    if (name.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    // Validate address field
    if (address.trim() === '') {
      setAddressError('Address is required');
      valid = false;
    } else {
      setAddressError('');
    }

    // Validate phone field
    if (phone.trim() === '') {
      setPhoneError('Phone number is required');
      valid = false;
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError('Invalid phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    // Validate email field
    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate DOB field
    if (DOB.trim() === '') {
      setDOBError('Date of Birth is required');
      valid = false;
    } else {
      setDOBError('');
    }

    // Validate username field
    if (username.trim() === '') {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    // Validate password field
    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

   // ...previous code

    // Validate confirmPassword field
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Validate filename field (if required)
    if (filename.trim() === '') {
      setFilenameError('Filename is required');
      valid = false;
    } else {
      setFilenameError('');
    }

    return valid;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
        <h2 className="text-2xl mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your name"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>

          {/* Address field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your address"
            />
            {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
          </div>

          {/* Phone field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your phone number"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>

          {/* Email field */}
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
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {/* DOB field */}
          <div className="mb-4">
            <label htmlFor="DOB" className="block text-gray-700 font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="text"
              id="DOB"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              className="border border
              gray-300 rounded p-2 w-full"
              placeholder="Enter your date of birth"
            />
            {DOBError && <p className="text-red-500 text-sm">{DOBError}</p>}
          </div>

          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your username"
            />
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          </div>

          {/* Password field */}
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
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          {/* Confirm Password field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Confirm your password"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>

          {/* Filename field */}
          <div className="mb-4">
            <label htmlFor="filename" className="block text-gray-700 font-bold mb-2">
              Filename
            </label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter the filename"
            />
            {filenameError && <p className="text-red-500 text-sm">{filenameError}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

