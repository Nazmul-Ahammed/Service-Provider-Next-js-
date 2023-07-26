import axios from "axios";
import { useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export default function Booking({ services }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    id: 0,
    name: "",
    description: "",
    type: "",
    isAvailable: false,
    price: 0,
  });

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/service/delete/${id}`).then(() => {
      window.location.reload();
    });
  }

  function handleEdit(id) {
    const selectedService = services.find((service) => service.id === id);
    setServiceData(selectedService);
    setOpen(true);
  }

  function handleServiceInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setServiceData((prevServiceData) => ({
      ...prevServiceData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/service/update/${serviceData.id}`, serviceData)
      .then(() => {
        window.location.reload();
      });
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchOptionChange(event) {
    setSearchOption(event.target.value);
  }

  const filteredData = services.filter((item) => {
    if (searchOption === "id") {
      return item.id.toString().includes(searchTerm);
    } else if (searchOption === "name") {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "type") {
      return item.type.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-gray-300 p-2 w-64 rounded-lg mr-4"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <select
          className="border-2 border-gray-300 p-2 rounded-lg"
          value={searchOption}
          onChange={handleSearchOptionChange}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div>
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/6 p-4">ID</th>
              <th className="w-1/6 p-4">Name</th>
              <th className="w-1/3 p-4">Description</th>
              <th className="w-1/6 p-4">Type</th>
              <th className="w-1/12 p-4">Availability</th>
              <th className="w-1/6 p-4">Price</th>
              <th className="w-1/6 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.map((service) => (
              <tr key={service.id}>
                <td className="border p-4">{service.id}</td>
                <td className="border p-4">{service.name}</td>
                <td className="border p-4">{service.description}</td>
                <td className="border p-4">{service.type}</td>
                <td className="border p-4">
                  {service.isAvailable ? "Available" : "Not available"}
                </td>
                <td className="border p-4">{service.price}</td>
                <td className="border p-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={() => handleEdit(service.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              className="border-2 border-gray-300 p-2 w-full rounded-lg"
              type="text"
              name="name"
              value={serviceData.name}
              onChange={handleServiceInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              className="border-2 border-gray-300 p-2 w-full rounded-lg"
              name="description"
              value={serviceData.description}
              onChange={handleServiceInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Type</label>
            <input
              className="border-2 border-gray-300 p-2 w-full rounded-lg"
              type="text"
              name="type"
              value={serviceData.type}
              onChange={handleServiceInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Availability
            </label>
            <input
              className="mr-2"
              type="checkbox"
              name="isAvailable"
              checked={serviceData.isAvailable}
              onChange={handleServiceInputChange}
            />
            Available
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              className="border-2 border-gray-300 p-2 w-full rounded-lg"
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={serviceData.price}
              onChange={handleServiceInputChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font bold py-2 px-4 rounded mr
              {4}
              "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}



export async function getServerSideProps() {

   const result = await axios.get("http://localhost:3000/service/get");
  
   const services = result.data;
  
   return { props: { services } };
  
  }