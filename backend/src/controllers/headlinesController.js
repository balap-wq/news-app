import * as headlinesRepository from "../repositories/headlinesRepository.js";

export const getHeadlines = async (req, res) => {
  try {
    const { page = 1, limit = 10, fields } = req.query;

    const skip = (page - 1) * limit;

    const articles = await headlinesRepository.getArticles(skip, limit);
    const total = await headlinesRepository.countArticles();

    let filteredArticles = articles;

    if (fields) {
      // ✅ CHANGE: trim added
      const fieldArray = fields.split(",").map(f => f.trim());

      filteredArticles = articles.map(article => {
        let obj = {};
        fieldArray.forEach(f => {
          obj[f] = article[f];
        });
        return obj;
      });
    }

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: filteredArticles
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};