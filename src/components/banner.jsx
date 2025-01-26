import React from 'react';
import fotobanner from '../assets/banner.svg';

const Banner = () => {
  return (
    <div className="banner-container position-relative">
      <div className="container d-flex flex-column flex-lg-row align-items-center">
        <div className="text-section col-lg-5">
          <h1 className="banner-title">Petualangan Edukatif bersama Malang Mbois City Tour!</h1>
          <p className="banner-subtitle">Petualangan Edukatif bersama Malang Mbois City Tour!</p>
        </div>
        <div className="image-section col-lg-6">
          <img src={fotobanner} alt="Banner" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
