import React from 'react';
import '../css/navbar.css';
import logoputih from '../assets/logoputih.svg';
import { FaYoutubeSquare, FaInstagramSquare, FaFacebookSquare, FaArrowRight } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-5">
            
            <h5 className="footer-brand"><img src={logoputih} alt="Logo" width="66" className="me-3" />
            Berita Kini</h5>
            <p>© 2025 Berita Kini. All Rights Reserved.</p>
            <div className="social-icons pt-3">
              <p>Ikuti Kami</p> 
              <a href="#" className="social-icon me-2"><FaYoutubeSquare /></a>
              <a href="#" className="social-icon me-2"><FaInstagramSquare /></a>
              <a href="#" className="social-icon"><FaFacebookSquare /></a>
            </div>

          </div>
          <div className="subfooter col-md-2">
            <h5>Telusuri</h5>
            <ul className="list-unstyled">
              <li><a href="#">Beranda</a></li>
              <li><a href="#">Nasional</a></li>
              <li><a href="#">Internasional</a></li>
              <li><a href="#">Ekonomi</a></li>
              <li><a href="#">Olahraga</a></li>
              <li><a href="#">Teknologi</a></li>
              <li><a href="#">Hiburan</a></li>
              <li><a href="#">Gaya Hidup</a></li>

            </ul>
          </div>
          <div className="subfooter col-md-2">
            <h5>Bantuan</h5>
            <ul className="list-unstyled">
              <li><a href="#">Kontak Kami</a></li>
              <li><a href="#">Laporan Pembajakan</a></li>
              <li><a href="#">Kebijakan</a></li>
            </ul>
          </div>
          <div className="subfooter col-md-3">
            <h5>Berlangganan Berita Terbaru</h5>
            <div className="subscribe-box">
              <input type="email" className="form-control" placeholder="Masukan email" />
              <button className="btn btn-primary"><FaArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
