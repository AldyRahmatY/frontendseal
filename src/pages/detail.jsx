import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from 'cheerio';
import '../css/detail.css';
import '../css/newssec.css';
import '../css/rekomendasi.css';
import NewsCard from '../components/newscard';
import Rekomendasi from '../components/rekomendasi';
import Komentar from '../components/komentar';
import { FaChevronRight, FaHouseUser } from 'react-icons/fa';



// Fungsi untuk membuat slug dari judul
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const Detail = () => {
  const { slug } = useParams(); // Mengambil parameter slug dari URL
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]); // Tambahkan state untuk berita terkait
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  
  

  const fetchNewsDetail = async () => {
    try {
      const categories = ['nasional', 'terbaru', 'internasional', 'olahraga', 'ekonomi', 'teknologi', 'hiburan', 'gayaHidup'];
      const allResponses = await Promise.all(
        categories.map((category) =>
          axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`)
        )
      );

      let newsList = [];
      allResponses.forEach((response) => {
        newsList = [...newsList, ...response.data.data.posts];
      });

      // Cari berita berdasarkan slug
      const selectedNews = newsList.find((news) => createSlug(news.title) === slug);

      if (!selectedNews) {
        throw new Error('Berita tidak ditemukan');
      }

      const { title, pubDate, thumbnail, link } = selectedNews;

      // Fetch konten berita dari link asli
      const htmlResponse = await axios.get(link);
      const html = htmlResponse.data;

      const $ = load(html);

      const contentDiv = $('div.detail-text');
      if (contentDiv.length === 0) {
        throw new Error('Konten tidak ditemukan. Pastikan struktur halaman sesuai.');
      }

      const rawContent = [];
      contentDiv.children('p, span, h2').each((_, element) => {
        rawContent.push($(element).text().trim());
      });

      // Gabungkan semua teks menjadi satu string
      const fullText = rawContent.join(' ');

      // Pisahkan teks menjadi kalimat menggunakan tanda baca
      const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [];

      // Kelompokkan kalimat menjadi paragraf dengan maksimal 3 kalimat per paragraf
      const content = [];
      let paragraphBuffer = [];
      sentences.forEach((sentence) => {
        paragraphBuffer.push(sentence.trim());
        if (paragraphBuffer.length === 4) {
          content.push(paragraphBuffer.join(' '));
          paragraphBuffer = [];
        }
      });
      // Tambahkan paragraf terakhir jika masih ada sisa kalimat
      if (paragraphBuffer.length > 0) {
        content.push(paragraphBuffer.join(' '));
      }

      // Ambil berita terkait
      const related = newsList.slice(0, 3); // Ambil 5 berita terkait untuk NewsCar
      
      setNewsDetail({
        title,
        pubDate,
        thumbnail,
        content,
      });
      setRelatedNews(related);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat detail berita. Pastikan struktur halaman sesuai dengan selektor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail(); // Panggil fungsi fetch saat komponen dimuat
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="container my-4">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Pastikan struktur halaman belum berubah atau periksa koneksi.</p>
      </div>
    );

  return (

    
<div className="container my-4">
  <div className="listatas mb-4">
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb d-flex align-items-center m-0 p-0 list-unstyled">
        <li className="d-flex align-items-center">
        <FaHouseUser className="mx-2 text-secondary" />
          <a href="#" className="text-decoration-none text-dark">
            <i className="bi bi-house-door"></i> Beranda
          </a>
          <FaChevronRight className="mx-2 text-secondary" />
        </li>
        <li className="d-flex align-items-center">
          <a href="#" className="text-decoration-none text-dark">Terbaru</a>
          <FaChevronRight className="mx-2 text-secondary" />
        </li>
        <li className="active text-secondary">Detail</li>
      </ul>
    </nav>
  </div>

      <div className="row">
        {/* Konten Berita */}
        <div className="detail-meta col-md-8">
          <h1 className="Judul mb-4">{newsDetail.title}</h1>
          <span className="category">{newsDetail.category || "Terbaru"}</span>
          <span className="pemisah"> • </span>
          <span className="date">{formatDate(newsDetail.pubDate)}</span>
          <img
            src={newsDetail.thumbnail}
            alt={newsDetail.title}
            className="foto-detail d-flex mt-4 mb-4"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/728x400')}
          />
          <div className="paragraf mt-4">
            {newsDetail.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="section-detail">

            <div className="d-flex align-items-center">
              <div className="highlight-box"></div>
              <h4 className="section-title">Komentar</h4>
            </div>
            <Komentar 
            />
          </div>

            <div className="section-detail">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="highlight-box"></div>
                  <h4 className="section-title">Berita Terkait</h4>
                </div>
                <div className="lihat-semua d-flex align-items-center justify-content-center">
                  <span>Lihat Semua</span>
                </div>
              </div>

                <div className="row">
                {relatedNews.map((item, index) => (
                  <div className="col-4" key={index}>
                    <Rekomendasi
                      title={item.title}
                      image={item.thumbnail}
                      description={item.description}
                      date={formatDate(newsDetail.pubDate)}
                      category={item.category || "Terbaru"}
                      onClick={() => navigate(`/detail/${createSlug(item.title)}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Berita Terkait */}
        <div className="col-md-4">
          <h3>Berita Terpopuler</h3>
          <div className="row">
            {relatedNews.map((item, index) => (
              <div className="col-12" key={index}>
                <NewsCard
                  title={item.title}
                  image={item.thumbnail}
                  description={item.description}
                  date={formatDate(newsDetail.pubDate)}
                  category={item.category || "Nasional"}
                  number={index + 1}
                  onClick={() => navigate(`/detail/${createSlug(item.title)}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
