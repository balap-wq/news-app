import prisma from '../prismaClient.js';

//  UPSERT (insert or update)
export async function upsertArticle(mappedArticle) {
  try {
    const result = await prisma.article.upsert({
      where: {
        url: mappedArticle.url, //  unique field
      },
      update: {
        title: mappedArticle.title,
        content: mappedArticle.content,
        urlToImage: mappedArticle.url_to_image,

        // FIX 1: change sourceName → source
        source: mappedArticle.source,

        publishedAt: mappedArticle.published_at,
        category: mappedArticle.category,
        country: mappedArticle.country,
      },
      create: {
        title: mappedArticle.title,
        content: mappedArticle.content,
        url: mappedArticle.url,
        urlToImage: mappedArticle.url_to_image,

        // ✅ FIX 2: REQUIRED FIELD (very important)
        userId: 1, // 👉 default user (you can change later)
      }
    });

    return result ? 'inserted' : 'updated';
  } catch (error) {
    console.error('Upsert Error:', error);
    throw error;
  }
}