import React from 'react';

const NewsCard = ({ title, image, date, category, number, onClick }) => {
  return (
    <div className="news-card d-flex align-items-center mb-3" onClick={onClick}>
      <span className="news-number">{number}</span>
      <img
        src={image}
        alt={title}
        className="news-image"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
      />
      <div className="news-content">
        <h6 className="news-title">{title}</h6>
        <div className="news-meta">
          <span className="news-category">{category}</span>
          <span className="pemisah"> ● </span>
          <span className="news-date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
