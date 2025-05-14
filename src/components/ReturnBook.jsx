import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../pages/Layout"; // Make sure this exists

const ReturnBook = () => {
  const [returnRequest, setReturnRequest] = useState({
    bookId: "",
    patronId: "",
    borrowedQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnRequest({ ...returnRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bookId, patronId, borrowedQuantity } = returnRequest;

    if (!bookId || !patronId || !borrowedQuantity) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/borrowed-books/return",
        returnRequest
      );
      toast.success("Book Returned Successfully!");
      setReturnRequest({ bookId: "", patronId: "", borrowedQuantity: "" });
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Failed to return book!";
      toast.error(backendMessage);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Return Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Patron ID
            </label>
            <input
              type="text"
              name="patronId"
              placeholder="Enter Patron Id"
              value={returnRequest.patronId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Book ID
            </label>
            <input
              type="text"
              name="bookId"
              placeholder="Enter Book Id"
              value={returnRequest.bookId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Borrowed Quantity
            </label>
            <input
              type="number"
              name="borrowedQuantity"
              placeholder="Enter Quantity"
              value={returnRequest.borrowedQuantity}
              onChange={handleChange}
              min="1"
              step="1"
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

export default ReturnBook;
