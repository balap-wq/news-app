import prisma from '../src/prismaClient.js';

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.article.createMany({
    data: [
      {
        title: 'Technology News Today',
        description: 'Latest updates in technology.',
        content: 'Sample content for technology article.',
        url: 'https://example.com/tech-news-1',
        url_to_image: 'https://example.com/images/tech1.jpg',
        source_name: 'Tech Source',
        author: 'OpenAI',
        category: 'technology',
        country: 'us',
        published_at: new Date(),
      },
      {
        title: 'Business Market Update',
        description: 'Daily business market summary.',
        content: 'Sample content for business article.',
        url: 'https://example.com/business-news-1',
        url_to_image: 'https://example.com/images/business1.jpg',
        source_name: 'Business Source',
        author: 'OpenAI',
        category: 'business',
        country: 'us',
        published_at: new Date(),
      },
      {
        title: 'General Headlines',
        description: 'Top general headlines.',
        content: 'Sample content for general article.',
        url: 'https://example.com/general-news-1',
        url_to_image: 'https://example.com/images/general1.jpg',
        source_name: 'News Source',
        author: 'OpenAI',
        category: 'general',
        country: 'us',
        published_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  const count = await prisma.article.count();

  console.log(`✅ Seed complete. Total articles: ${count}`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
