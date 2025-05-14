import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../pages/Layout';

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/book/list');
      setBooks(res.data);
    } catch (error) {
      toast.error('Failed to load books');
    }
  };

  // Handle deletion of a book
  const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/book/deleteBook/${id}`);

    if (response.status === 200) {
      toast.success(response.data); // This uses backend message like "Delete book id 2 successfully"
      fetchBooks(); // Refresh the list
    } else {
      toast.error('Delete failed!');
    }
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'Book is currently borrowed'
    ) {
      toast.error('Cannot delete a borrowed book!');
    } else {
      toast.error('Delete failed!');
    }
  }
};


  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">All Books</h2>

        {/* Scrollable wrapper for the table with fixed height */}
        <div className="overflow-x-auto max-h-[320px]"> {/* Set a fixed height and allow scrolling */}
          <div className="min-w-[800px]"> {/* Ensure table width is set to trigger overflow */}
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-800 text-left text-sm md:text-base">
                  <th className="p-3">S. No.</th>
                  <th className="p-3">Book ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Total Quantity</th>
                  <th className="p-3">Available Quantity</th>
                  <th className="p-3">Available</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.bookId} className="border-b hover:bg-gray-50 text-sm md:text-base">
                    <td className="p-3">{index + 1}</td>  {/* Serial number */}
                    <td className="p-3">{book.bookId}</td> {/* Book ID */}
                    <td className="p-3">{book.title}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3">{book.totalQuantity}</td>
                    <td className="p-3">{book.availableQuantity ?? 'N/A'}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          book.availableQuantity > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {book.availableQuantity > 0 ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(book.bookId)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1 px-3 rounded-lg transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookList;
