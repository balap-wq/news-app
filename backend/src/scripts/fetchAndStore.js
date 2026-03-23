import axios from 'axios';
import pool from '../config/db.js';
import { NEWS_API_KEY } from '../../';

async function fetchAndStore() {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=72565d6cc6cb4140ac1631d3f2dcf401`
    );

    console.log('STATUS:', res.data.status);
    console.log('TOTAL ARTICLES:', res.data.articles.length);

    const articles = res.data.articles;

    for (const article of articles) {
      await pool.query(
        `INSERT INTO articles 
        (title, description, url_to_image, source_name, published_at)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          article.title || null,
          article.description || null,
          article.urlToImage || null,
          article.source?.name || null,
          article.publishedAt || null,
        ]
      );
    }

    console.log('Articles stored');
  } catch (err) {
    console.error('Error fetching/storing articles:', err);
  }
}

fetchAndStore();
