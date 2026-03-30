export async function getHeadlines(req, res) {
  try {
    const { limit, offset, category } = req.query; 

    const headlines = await findTopHeadlines({
      limit,
      offset,
      category,
    });

    const totalResults = await countArticles({ category });

    const transformedArticles = headlines.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults,
      count: transformedArticles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed to fetch data',
    });
  }
}