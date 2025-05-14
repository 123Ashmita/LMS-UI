import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]); // To store the list of books
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(''); // To manage error state

  useEffect(() => {
    // Fetching the book list from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/book/list'); // Replace with your actual backend URL
        setBooks(response.data); // Store the fetched books in state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        setError('Failed to fetch books');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures the effect runs only once after component mounts

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Display error message if any
  }

  // Render the list of books
  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>
            <strong>{book.title}</strong> by {book.author} -{' '}
            {book.available ? 'Available' : 'Not Available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
