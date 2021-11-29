import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreProvider from './app/components/StoreProvider.jsx';

render(
  <Router>
    <Routes>
      <Route exact path="/" element={<StoreProvider />} />
      <Route path="/desktop" element={<StoreProvider mode="desktop" isSelection={false} />} />
      <Route path="/desktop_s" element={<StoreProvider mode="desktop" isSelection={true} />} />
      <Route path="/mobile" element={<StoreProvider mode="mobile" isSelection={false} />} />
      <Route path="/mobile_s" element={<StoreProvider mode="mobile" isSelection={true} />} />
      <Route path="*" element={<StoreProvider />} />
    </Routes>
  </Router>,
  document.getElementById('main'),
);
