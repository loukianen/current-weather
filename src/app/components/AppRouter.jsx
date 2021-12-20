import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreProvider from './StoreProvider.jsx';

export default () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<StoreProvider />} />
      <Route path="/desktop" element={<StoreProvider mode="desktop" />} />
      <Route path="/mobile" element={<StoreProvider mode="mobile" />} />
      <Route path="*" element={<StoreProvider />} />
    </Routes>
  </Router>
);
