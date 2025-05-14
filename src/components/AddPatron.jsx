import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../pages/Layout'; // If Layout includes <Toaster />, you can skip it here

const AddPatron = () => {
  const [patron, setPatron] = useState({
    patronId: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatron({ ...patron, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = patron.name.trim();

    if (!trimmedName) {
      toast.error('Please enter a valid patron name!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/patron/addPatron',
        { ...patron, name: trimmedName }
      );
      console.log('Patron added:', response.data);
      toast.success('Patron added successfully!');

      setPatron({ patronId: '', name: '' });
    } catch (error) {
      console.error('Error adding patron:', error);
      const message = error.response?.data?.message || 'Something went wrong!';
      toast.error(message);
    }
  };

  return (
    <Layout>
      {/* Include this only if Layout.js does not have <Toaster /> */}
      <Toaster position="top-right" />

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Register a New Patron</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Patron Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Patron Name"
              value={patron.name}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPatron;
