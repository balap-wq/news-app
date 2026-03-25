import { findArticleById } from '../repositories/articleRepository.js';
async function getArticleById(req, res) {
  try {
    const { id } = req.params;

   
    const parsedId = parseInt(id, 10);
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ error: 'Invalid article ID' });
    }

    const article = await findArticleById(parsedId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found', articleId: parsedId });
    }

    res.status(200).json(article);

  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getArticleById };