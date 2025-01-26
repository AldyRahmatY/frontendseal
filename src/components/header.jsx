import React, { useState, useEffect } from 'react';
import '../css/navbar.css';
import logobiru from '../assets/logobiru.svg';
import logoputih from '../assets/logoputih.svg';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className={`navbar navbar-expand-lg fixed-top ${
          scrolled ? 'scrolled' : 'default-bg'
        } shadow-sm transition-all`}
      >
        <div className="container">
          <img src={scrolled ? logoputih : logobiru} alt="Logo" width="44" />
          <a className="navbar-brand m-3" href="#">Berita Kini</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item m-2">
                <a href="/" className="nav-link active">Beranda</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Nasional</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Internasional</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Ekonomi</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Olahraga</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Teknologi</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Hiburan</a>
              </li>
              <li className="nav-item m-2">
                <a href="/" className="nav-link">Gaya Hidup</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Add spacing to avoid navbar overlapping content */}
      <div style={{ marginTop: '130px' }}></div>
    </>
  );
};

export default Header;
