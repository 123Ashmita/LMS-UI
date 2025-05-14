import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../pages/Layout';

const PatronList = () => {
  const [patrons, setPatrons] = useState([]);

  const fetchPatrons = async () => {
    try {
      const res = await axios.get('http://localhost:8080/patron/list');
      setPatrons(res.data);
    } catch (error) {
      toast.error('Failed to load patrons');
    }
  };

  const handleDelete = async (pid) => {
    try {
      await axios.delete(`http://localhost:8080/patron/delete/${pid}`); 
      toast.success('Patron deleted successfully!');
      fetchPatrons();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchPatrons();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">All Patrons</h2>
        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="p-3">S. No.</th>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patrons.map((patron, index) => (
                <tr key={patron.patronId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td> {/* S. No. */}
                  <td className="p-3">{patron.pid}</td> {/* Make sure backend sends this field */}
                  <td className="p-3">{patron.name}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(patron.pid)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {patrons.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No patrons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PatronList;
