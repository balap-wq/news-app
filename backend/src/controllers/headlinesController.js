import { findTopHeadlines, countArticles } from "../repositories/headlinesRepository.js";

export async function getHeadlines(req, res) {

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 9);

  const offset = (page - 1) * limit;

  const articles = await findTopHeadlines({ limit, offset });
  const total = await countArticles();

  res.json({
    data: articles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  });
}