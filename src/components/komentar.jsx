import React, { useState } from "react";
import "../css/detail.css";
import profil1 from "../assets/profil1.svg";
import profil2 from "../assets/profil2.svg"; // Gambar untuk komentar pertama
import profil3 from "../assets/profil3.svg";
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';


const Komentar = () => {
  // State untuk input komentar dan penghitung karakter
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Fungsi untuk menangani perubahan input komentar
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div>
      {/* Input Komentar */}
      <div className="d-flex mb-5">
        <img src={profil1} alt="Profil" className="profil me-3" style={{ verticalAlign: 'top' }} />
        <div className="comment-input flex-grow-1">
          <textarea
            className="form-control mb-2"
            placeholder="Apa yang ingin anda tanyakan?"
            maxLength={50}
            rows={6}
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="d-flex justify-content-between align-items-center">
            <button className="button-kirim">Kirim</button>
            <small className="text-muted">{charCount}/50</small>
          </div>
        </div>
      </div>

      {/* Daftar Komentar */}
      <div className="pagination-wrapper">
        {/* Misalkan ini adalah data komentar yang sudah ada */}
        {[1].map((item, index) => (
          <div key={index}>
            <div className="d-flex mt-2 mb-5">
              <img src={profil2} alt="Profil" className="profil me-3" style={{ verticalAlign: 'top' }} />
              <div className="comment-content">
                <h6 className="comment-name">Nama Pengguna
                <span className="pemisah"> • </span>
                <span className="pemisah">28 Mar 2024 11:15</span>
                </h6>
                <p className="comment-text">Ini adalah isi komentar yang diberikan oleh pengguna.</p>
              </div>
            </div>
            <div className="d-flex mb-3 ms-5">
              <img src={profil3} alt="Profil" className="profil me-3" style={{ verticalAlign: 'top' }} />
              <div className="comment-content">
                <h6 className="comment-name">Nama Pengguna
                  <span className="pemisah"> • </span>
                  <span className="pemisah">28 Mar 2024 11:15</span>
                </h6>
                
                <p className="comment-text">Ini adalah jawaban terhadap komentar di atas.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-wrapper">
        <div className="pagination-rekom d-flex justify-content-between align-items-center">
          <div className="pagination-container d-flex align-items-center gap-2">
            <span>Item per page</span>
            <select className="pagination-select">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>of 200</span>
          </div>

          <div className=" d-flex align-items-center gap-2">
            <span className="paginasi-komentar"><FaChevronLeft /></span>
            <span className="paginasi-komentar active">1</span>
            <span className="paginasi-komentar">2</span>
            <span className="paginasi-komentar"><FaChevronRight /></span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Komentar;
