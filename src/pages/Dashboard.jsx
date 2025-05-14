import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Layout from './Layout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalPatrons: 0,
    borrowedBooks: 0,
    availableCopies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/book/dashboard');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading Dashboard...</p>;

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to LMS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-6 w-6 text-blue-800 mr-4" />
            <h3 className="text-xl font-semibold text-gray-700">Total Books</h3>
          </div>
          <p className="text-4xl font-bold text-blue-800 mt-2">{stats.totalBooks}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center mb-4">
            <UserIcon className="h-6 w-6 text-blue-800 mr-4" />
            <h3 className="text-xl font-semibold text-gray-700">Total Patrons</h3>
          </div>
          <p className="text-4xl font-bold text-blue-800 mt-2">{stats.totalPatrons}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-6 w-6 text-blue-800 mr-4" />
            <h3 className="text-xl font-semibold text-gray-700">Available Copies</h3>
          </div>
          <p className="text-4xl font-bold text-blue-800 mt-2">{stats.availableCopies}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-6 w-6 text-blue-800 mr-4" />
            <h3 className="text-xl font-semibold text-gray-700">Borrowed Books</h3>
          </div>
          <p className="text-4xl font-bold text-blue-800 mt-2">{stats.borrowedBooks}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
