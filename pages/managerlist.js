import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import 'tailwindcss/tailwind.css';

export default function ManagerList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [updatedName, setupdatedName] = useState('');
  const [updatedPhone, setupdatedPhone] = useState('');
  const [updatedEmail, setupdatedEmail] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3000/manager/get');
      setData(result.data);
      setFilteredData(result.data);
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    const filteredResults = data.filter((item) => {
      return item.id.toString().toLowerCase().includes(searchId.toLowerCase());
    });
    setFilteredData(filteredResults);
    setIsSearching(false);
  };
  
const handleUpdate = async (id) => {
  setSelectedItemId(id);
  setIsModalOpen(true);
};

const updateManager = async () => {
  try {
    // Make a PUT request to update the manager's data
    await axios.put(`http://localhost:3000/manager/update/${selectedItemId}`, {
      // Pass the updated data
      name: updatedName,
      phone: updatedPhone,
      email: updatedEmail,
    });

    // Update the data in the state
    const updatedData = data.map((item) => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          name: updatedName,
          phone: updatedPhone,
          email: updatedEmail,
        };
      }
      return item;
    });

    setData(updatedData);
    setFilteredData(updatedData);
    closeModal();
  } catch (error) {
    console.log('Error updating manager:', error);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/manager/delete/${id}`);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };


  const closeModal = () => {
    setSelectedItemId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by ID"
          className="border border-gray-300 rounded p-2 mr-2 flex-grow"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

      {filteredData.map((item) => (
        <div key={item.id} className="border border-gray-300 rounded p-4 mb-4">
          <ul>
            <li className="font-bold mb-2">{item.name}</li>
            <li className="text-gray-700 mb-2">{item.phone}</li>
            <li className="text-gray-700 mb-2">{item.email}</li>
          </ul>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleUpdate(item.id)}
            >
              Update
            </button>
          </div>
          </div>
      ))}
      <Modal open={isModalOpen} onClose={closeModal} center>
  <h2>Update Manager</h2>
  <input
    type="text"
    name="name"
    value={updatedName.name}
    onChange={(e) => setupdatedName(e.target.value)}
    placeholder="Name"
    className="border border-gray-300 rounded px-2 py-2 mb-2"
  />
  <input
    type="text"
    
    value={updatedPhone.phone}
    onChange={(e) => setupdatedPhone(e.target.value)}
    placeholder="Phone"
    className="border border-gray-300 rounded px-2 py-2 mb-2"
  />
  <input
    type="text"
    value={updatedEmail.email}
    onChange={(e) => setupdatedEmail(e.target.value)}
    placeholder="Email"
    className="border border-gray-300 rounded px-2 py-2 mb-2"
  />
  <div className="flex justify-end">
    <button
      onClick={updateManager}
      disabled={!updatedName || !updatedPhone || !updatedEmail}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
    >
      Update
    </button>
    <button
      onClick={closeModal}
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded px-4 py-2 ml-2"
    >
      Cancel
    </button>
  </div>
</Modal>
      </div>
      
      
      
      )}

     