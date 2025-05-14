import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserIcon,
  PlusIcon,
  TrashIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  // Helper to check if the path is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-73 bg-gray-800 text-white p-6 space-y-6 border-r-4 border-gray-400 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">Library Options</h3>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className={`sidebar-link ${isActive('/') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/add-book"
            className={`sidebar-link ${isActive('/add-book') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
            Add Book
          </Link>
        </li>
        <li>
          <Link
            to="/show-books"
            className={`sidebar-link ${isActive('/show-books') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
            Show Books
          </Link>
        </li>
        <li>
          <Link
            to="/add-patron"
            className={`sidebar-link ${isActive('/add-patron') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <UserIcon className="h-5 w-5 inline-block mr-2" />
            Add Patron
          </Link>
        </li>
        <li>
          <Link
            to="/show-patrons"
            className={`sidebar-link ${isActive('/show-patrons') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <UserIcon className="h-5 w-5 inline-block mr-2" />
            Show Patrons
          </Link>
        </li>
        <li>
          <Link
            to="/borrow-book"
            className={`sidebar-link ${isActive('/borrow-book') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Borrow Book
          </Link>
        </li>
        <li>
          <Link
            to="/return-book"
            className={`sidebar-link ${isActive('/return-book') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Return Book
          </Link>
        </li>
        <li>
          <Link
            to="/search-borrowed-book"
            className={`sidebar-link ${isActive('/search-borrowed-book') ? 'bg-blue-600 text-white rounded-lg px-3 py-2' : ''}`}
          >
            <MagnifyingGlassIcon className="h-5 w-5 inline-block mr-2" />
            Search Borrowed Book
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
