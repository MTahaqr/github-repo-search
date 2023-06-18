import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookmarkPage from './containers/BookmarkPage';
import SearchPage from './containers/SearchPage';
import MainLayout from './Layouts/MainLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
