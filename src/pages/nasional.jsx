import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Untuk navigasi antar halaman

const nasional = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari API
  const fetchNews = async () => {
    try {
      const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/nasional');
      const data = await response.json();
      setNews(data.data.posts); // Simpan berita ke state
    } catch (err) {
      setError('Gagal memuat berita. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(); // Panggil fungsi untuk mengambil berita saat komponen dimuat
  }, []);

  // Jika sedang memuat data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Jika terjadi error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container my-4">
      <h1>Berita Nasional</h1>
      <div className="row">
        {news.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/360x200')} // Gambar default jika gagal memuat
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link to={`/nasional/detail/${index}`} className="btn btn-primary">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default nasional;
