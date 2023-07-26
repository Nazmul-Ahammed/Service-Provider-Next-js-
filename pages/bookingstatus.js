import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';
import 'react-responsive-modal/styles.css';

export default function BookingStatus() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [updatedServicestatus, setUpdatedServicestatus] = useState('');
  const [updatedValidity, setupdatedValidity] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3000/booking-status/get');
      setData(result.data);
      setFilteredData(result.data);
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    const filteredResults = data.filter((item) => {
      return (
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.id.toString().toLowerCase().includes(searchId.toLowerCase())
      );
    });
    setFilteredData(filteredResults);
    setIsSearching(false);
  };

  const handleUpdate = async () => {
    if (!updatedStatus && updatedServicestatus &&updatedValidity ) {
      return;
    }
    

    try {
      setIsUpdating(true);
      await axios.put(`http://localhost:3000/booking-status/update/${selectedItemId}`, {
        status: updatedStatus,
        servicestatus: updatedServicestatus,
        validity: updatedValidity,
      });

      const updatedData = data.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            status: updatedStatus,
            servicestatus: updatedServicestatus,
            validity: updatedValidity,
          };
        }
        return item;
      });

      setData(updatedData);
      setFilteredData(updatedData);
      closeModal();
    } catch (error) {
      console.log('Error updating item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/booking-status/delete/${itemId}`);
      const updatedData = data.filter((item) => item.id !== itemId);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItemId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by ID"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by status"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      {filteredData.map((item) => (
        <div key={item.id} className="border border-gray-300 rounded p-4 mb-4">
          <ul>
            <li className="font-bold mb-2">{item.status}</li>
            <li className="text-gray-700 mb-2">{item.servicestatus}</li>
          </ul>
          <div className="flex justify-end mt-4">
            {/* Update Button */}
            <button
              onClick={() => openModal(item.id)}
              disabled={isUpdating || selectedItemId === item.id}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded px-4 py-2 mr-2"
            >
              {selectedItemId === item.id ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={isUpdating || selectedItemId === item.id}
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
            >
              {selectedItemId === item.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Update Status</h2>
        <input
          type="text"
          name="status"
          value={updatedStatus.status}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          placeholder="Enter updated status"
          className="border border-gray-300 rounded px-2 py-2 mb-2"
        />
        <div className="mb-4">
          
          <h2>Update Service-Status</h2>
        <input
          type="text"
          name="servicestatus"
          value={updatedStatus.status}
          onChange={(e) => setUpdatedServicestatus(e.target.value)}
          placeholder="Enter updated status"
          className="border border-gray-300 rounded px-2 py-2 mb-2"
        />
        <div className="mb-4">
          
          <h2>Update validity</h2>
        <input
          type="text"
          name="validity"
          value={updatedValidity.validity}
          onChange={(e) => setupdatedValidity(e.target.value)}
          placeholder="Enter updated status"
          className="border border-gray-300 rounded px-2 py-2 mb-2"
        />
        <div className="mb-4">
          {/* Update Button in Modal */}
          <button
            onClick={handleUpdate}
            disabled={isUpdating || !updatedStatus}
            className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2"
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
          {/* Cancel Button in Modal */}
          <button
            onClick={closeModal}
            disabled={isUpdating}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded px-4 py-2 ml-2"
          >
            Cancel
          </button>
          </div>
        </div>
        </div>
      </Modal>
    </div>
  );
}

export async function getServerSideProps() {
  const result = await axios.get('http://localhost:3000/booking-status/get');
  const servicestatus = result.data;
  return { props: { servicestatus } };
}
