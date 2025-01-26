import React from 'react'

const Rekomendasi = ({ title, image, date, category, onClick }) => {
  return (
    <div className="rekom-card d-flex flex-column mb-3" onClick={onClick}>      
      <img
        src={image}
        alt={title}
        className="rekom-image text-center"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
      />
      <div className="rekom-content">
        <h6 className="rekom-title mt-2">{title}</h6>
        <div className="rekom-meta">
          <span className="rekom-category">{category}</span>
          <span className="pemisah"> • </span>
          <span className="rekom-date">{date}</span>
        </div>
      </div>
    </div>
  );
};


export default Rekomendasi