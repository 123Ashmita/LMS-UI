import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    
    <div className="h-screen flex flex-col font-sans">
      <header className="bg-gray-900 text-white px-6 py-8 text-5xl font-bold shadow text-center">
        Library Management System
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
  <Toaster position="top-right" />
};

export default Layout;
