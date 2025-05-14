import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../pages/Layout';

const PatronBorrowedList = () => {
  const [patronId, setPatronId] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [noBooks, setNoBooks] = useState(false);

  const handleChange = (e) => {
    setPatronId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNoBooks(false);
    setBorrowedBooks([]);
    setFormSubmitted(true);

    try {
      const response = await axios.get(`http://localhost:8080/borrow/listBooks/${patronId}`);
      console.log('Response data:', response.data);
      setBorrowedBooks(response.data);

      if (response.data.length === 0) {
        setNoBooks(true);
      }
    } catch (error) {
      const backendMessage = error.response?.data || 'Something went wrong.';
      const status = error.response?.status;

      if (status === 404) {
        if (backendMessage.includes('Patron ID not found')) {
          setError('Patron ID not found');
          toast.error('Patron ID not found.');
        } else if (backendMessage.includes('No Books Borrowed')) {
          setNoBooks(true);
        } else {
          setError(backendMessage);
          toast.error(backendMessage);
        }
      } else if (status === 400) {
        setError(backendMessage);
        toast.error(backendMessage);
      } else {
        setError('An unexpected error occurred.');
        toast.error(backendMessage);
      }
    }
  };

  const handleReset = () => {
    setPatronId('');
    setBorrowedBooks([]);
    setError('');
    setNoBooks(false);
    setFormSubmitted(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          View Borrowed Books by Patron
        </h2>

        {!formSubmitted && (
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter Patron ID"
              value={patronId}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg mb-4 text-lg"
              disabled={formSubmitted}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={formSubmitted}
            >
              Submit
            </button>
          </form>
        )}

        {formSubmitted && (
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
            style={{ marginTop: '10px' }}
          >
            Search Another Patron
          </button>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {noBooks && !error && (
          <p className="text-red-500 text-center mt-4">
            No books borrowed by this patron.
          </p>
        )}

        {borrowedBooks.length > 0 && !noBooks && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-blue-100 text-blue-800 text-sm md:text-base">
                <tr>
                  <th className="p-3">S. No.</th>
                  <th className="p-3">Book ID</th>
                  <th className="p-3">Book Title</th>
                  <th className="p-3">Book Author</th>
                  <th className="p-3">Borrowed Quantity</th>
                  <th className="p-3">Patron ID</th>
                  <th className="p-3">Patron Name</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book, index) => (
                  <tr key={book.bookId} className="border-b hover:bg-gray-50 text-sm md:text-base">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{book.bookId}</td>
                    <td className="p-3">{book.title}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3">{book.quantity}</td>
                    <td className="p-3">{book.pid}</td>
                    <td className="p-3">{book.patronName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatronBorrowedList;
