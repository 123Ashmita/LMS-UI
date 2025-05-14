import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../pages/Layout';

const AddBook = () => {
  const [book, setBook] = useState({
    bookId: '',
    title: '',
    author: '',
    totalQuantity: 1, // default quantity is 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: name === 'totalQuantity' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim input values
    const trimmedTitle = book.title.trim();
    const trimmedAuthor = book.author.trim();

    // Validation checks
    if (!trimmedTitle || !trimmedAuthor) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (!Number.isInteger(book.totalQuantity) || book.totalQuantity < 1) {
      toast.error('Quantity must be 1 or more!');
      return;
    }

    // Send data to backend
    try {
      const response = await axios.post(
        'http://localhost:8080/book/addBook',
        { ...book, title: trimmedTitle, author: trimmedAuthor },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Book added:', response.data);
      toast.success('Book added successfully!');

      // Reset form
      setBook({
        bookId: '',
        title: '',
        author: '',
        totalQuantity: 1,
      });
    } catch (error) {
      console.error('Error adding book:', error);
      const message = error.response?.data?.message || 'Something went wrong!';
      toast.error(message);
    }
  };

  return (
    <Layout>
      {/* Ensure Toaster is included somewhere in the app (here or in Layout) */}
      <Toaster position="top-right" />

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Book Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Book Title"
              value={book.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Author</label>
            <input
              type="text"
              name="author"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Author Name"
              value={book.author}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Quantity</label>
            <input
              type="number"
              name="totalQuantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Total Quantity"
              value={book.totalQuantity}
              onChange={handleChange}
              min="1"
              step="1"
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

export default AddBook;
