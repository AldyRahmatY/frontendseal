import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home'; // Import the Home component
import Detail from './pages/detail';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:slug" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
