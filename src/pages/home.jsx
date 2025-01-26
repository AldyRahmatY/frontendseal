import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../components/newscard';
import Rekomendasi from '../components/rekomendasi';
import Banner from '../components/banner';
import { FaCalendarAlt, FaArrowRight, FaChevronLeft, FaChevronRight, FaSearch, FaArrowLeft } from 'react-icons/fa';
import '../css/home.css';
import '../css/newssec.css';
import '../css/rekomendasi.css';
import '../css/banner.css';


// Fungsi untuk membuat slug dari judul berita
const createSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Ganti karakter selain huruf/angka dengan "-"
    .replace(/(^-|-$)/g, ''); // Hapus "-" di awal/akhir

const Home = () => {
  const [news, setNews] = useState({
    nasional: [],
    terbaru: [],
    internasional: [],
    olahraga: [],
    ekonomi: [],
    teknologi: [],
    hiburan: [],
    gayaHidup: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fungsi untuk mengambil data berita
  const fetchNews = async (category) => {
    try {
      const response = await fetch(`https://api-berita-indonesia.vercel.app/cnn/${category}`);
      if (!response.ok) {
        throw new Error(`Gagal memuat berita kategori: ${category}`);
      }
      const data = await response.json();
      // Tambahkan kategori secara manual ke setiap item berita
      const postsWithCategory = data.data.posts.map((post) => ({
        ...post,
        category: category.charAt(0).toUpperCase() + category.slice(1), // Format kategori
      }));
      setNews((prevNews) => ({ ...prevNews, [category]: postsWithCategory }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
  
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const categories = ['nasional', 'terbaru', 'internasional', 'olahraga', 'ekonomi', 'teknologi', 'hiburan', 'gayaHidup'];
    categories.forEach((category) => {
      fetchNews(category).then(() => {
        console.log(`Data kategori ${category}:`, news[category]);
      });
    });
  }, []);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      {/* Headline Section */}
      <section className="headline-section mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <p className="headline-category">Headline</p>
              <h2 className="headline-title">{news.terbaru[0]?.title}</h2>
              <p className="headline-description mt-3">{news.terbaru[0]?.description}</p>
              <div className="headline-date">
                <FaCalendarAlt className="icon" /> 
                {formatDate(news.terbaru[0]?.pubDate) || 'Tidak diketahui'}
              </div>
              <div 
                className="read-more d-flex align-items-center text-primary mt-4 mb-3"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/detail/${createSlug(news.terbaru[0]?.title)}`)}
              >
                <span className="me-2">Baca Selengkapnya</span> <FaArrowRight />
              </div>

            </div>
            <div 
              className="col-md-7 d-flex align-items-center justify-content-end" 
              style={{ height: '100%' }}
            >
              <img
                src={news.terbaru[0]?.thumbnail}
                alt="Headline"
                className="img-fluid rounded headline-image"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/728x400')}
                style={{
                  width: '80%',      // Gambar memenuhi lebar parent
                  height: '100%',     // Gambar mengikuti tinggi parent
                  objectFit: 'cover', // Memastikan gambar tidak terdistorsi
                  borderRadius: '10px', // Tambahkan border-radius untuk tampilan lebih halus
                }}
              />
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-container mt-5 text-center">
            <span className="pagination-prev"><FaChevronLeft /></span>
            <span className="pagination-text">1</span>
            <span className="pagination-text">dari</span>
            <span className="pagination-text">5</span>
            <span className="pagination-next"><FaChevronRight /></span>
          </div>
        </div>
      </section>

      {/* Berita Terpopuler */}
      
      <section className="populer-section mt-5 mb-5">
        <div className="container">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="highlight-box"></div>
              <h4 className="section-title">Berita Terpopuler</h4>
            </div>
          </div>
          <div className="row">
            {news.teknologi.slice(0, 6).map((item, index) => (
              <div className="col-md-4" key={index}>
                <NewsCard
                  title={item.title}
                  image={item.thumbnail}
                  description={item.description}
                  date={formatDate(item.pubDate)}
                  category={item.category}
                  number={index + 1}
                  onClick={() => navigate(`/detail/${createSlug(item.title)}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Rekomendasi */}
      <section className="rekomendasi-section mt-5 mb-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="highlight-box"></div>
              <h4 className="section-title">Rekomendasi Untuk Anda</h4>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Cari disini..." />
              <span className="search-icon"><FaSearch /></span>
            </div>
          </div>
          <div className="row mt-4">
            {news.internasional.slice(0, 8).map((item, index) => (
              <div className="col-md-3" key={index}>
                <Rekomendasi
                  title={item.title}
                  image={item.thumbnail}
                  description={item.description}
                  date={formatDate(item.pubDate)}
                  category={item.category}
                  number={index + 1}
                  onClick={() => navigate(`/detail/${createSlug(item.title)}`)}
                />
              </div>
            ))}

            {/* Pagination */}
            <div className="pagination-rekom d-flex justify-content-between align-items-center m-3">
              <div className="results-count">
                Showing 1 to 10 of 97 results
              </div>
              <div className="pagination-container d-flex align-items-center gap-2 me-5">
                <a href="#" className="pagination-link text-secondary">← Previous</a>
                <a href="#" className="pagination-link active">1</a>
                <a href="#" className="pagination-link text-secondary">2</a>
                <span className="pagination-dots text-secondary">...</span>
                <a href="#" className="pagination-link text-secondary">8</a>
                <a href="#" className="pagination-link text-secondary">9</a>
                <a href="#" className="pagination-link text-secondary">Next →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-section mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Banner />
            </div>
          </div>
          <div className="pagination-container text-center mt-3">
            <span className="pagination-banner"> ● </span>
            <span className="pagination-banner active"> ● </span>
            <span className="pagination-banner"> ● </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;