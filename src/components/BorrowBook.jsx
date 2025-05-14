import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../pages/Layout"; // assuming you use this in AddBook too

const BorrowBook = () => {
  const [borrowRequest, setBorrowRequest] = useState({
    bookId: "",  // bookId is expected by the backend
    pid: "",     // pid is expected by the backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowRequest({ ...borrowRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bookId, pid } = borrowRequest;

    if (!bookId || !pid) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Ensure the request body matches what the backend expects
      const response = await axios.post(
        "http://localhost:8080/borrow/borrowBook",
        {
          pid: parseInt(pid),     // ensure patron ID is an integer
          bookId: parseInt(bookId), // ensure book ID is an integer
        }
      );
      console.log(response);
      toast.success("Book Borrowed Successfully!");
      setBorrowRequest({ bookId: "", pid: "" });  // reset the form after success
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Failed to borrow book!";
      toast.error(backendMessage);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Borrow Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Patron ID</label>
            <input
              type="text"
              name="pid"
              placeholder="Enter Patron Id"
              value={borrowRequest.pid}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Book ID</label>
            <input
              type="text"
              name="bookId"
              placeholder="Enter Book Id"
              value={borrowRequest.bookId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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

export default BorrowBook;
