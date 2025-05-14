import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 👈 Import toaster here

import Dashboard from './pages/Dashboard';
import AddBook from './components/AddBook';
import ShowBooks from './components/BookList';
import AddPatron from './components/AddPatron';
import ShowPatrons from './components/PatronList';
import BorrowBook from './components/BorrowBook';
import ReturnBook from './components/ReturnBook';
import PatronBorrowedList from './components/PatronBorrowedList'

function App() {
  return (
    <Router>
      {/* 👇 Place Toaster globally so it stays on route change */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/show-books" element={<ShowBooks />} />
        <Route path="/add-patron" element={<AddPatron />} />
        <Route path="/show-patrons" element={<ShowPatrons />} />
        <Route path="/borrow-book" element={<BorrowBook />} />
        <Route path="/return-book" element={<ReturnBook />} />
         <Route path="/search-borrowed-book" element={<PatronBorrowedList />} />
      </Routes>
    </Router>
  );
}

export default App;
