import pool from "../config/db.js";

const articles = [
  {
    title: "AI Transforms Modern Businesses",
    description: "Companies adopt AI to improve efficiency and automation.",
    url_to_image: "https://picsum.photos/300?1",
    source_name: "TechCrunch",
    published_at: new Date(),
    created_at: new Date(),
    content: "Artificial Intelligence is revolutionizing industries with automation and predictive analytics.",
    url: "https://news.com/article-1",
    author: "John Doe",
    category: "technology"
  },
  {
    title: "Global Economy Faces Slowdown",
    description: "Economic growth slows amid global uncertainty.",
    url_to_image: "https://picsum.photos/300?2",
    source_name: "Bloomberg",
    published_at: new Date(),
    created_at: new Date(),
    content: "Experts warn of a potential recession due to inflation and geopolitical tensions.",
    url: "https://news.com/article-2",
    author: "Jane Smith",
    category: "business"
  },
  {
    title: "Space Exploration Milestone Achieved",
    description: "New satellite successfully launched into orbit.",
    url_to_image: "https://picsum.photos/300?3",
    source_name: "Space News",
    published_at: new Date(),
    created_at: new Date(),
    content: "The mission marks a significant step in commercial space exploration.",
    url: "https://news.com/article-3",
    author: "Alex Carter",
    category: "science"
  },
  {
    title: "Healthcare Advances in 2026",
    description: "Medical breakthroughs improve patient outcomes.",
    url_to_image: "https://picsum.photos/300?4",
    source_name: "Medical Journal",
    published_at: new Date(),
    created_at: new Date(),
    content: "AI-powered diagnostics are transforming healthcare systems globally.",
    url: "https://news.com/article-4",
    author: "Dr. Sarah Lee",
    category: "health"
  },
  {
    title: "Football Championship Final Highlights",
    description: "A thrilling end to the national championship.",
    url_to_image: "https://picsum.photos/300?5",
    source_name: "ESPN",
    published_at: new Date(),
    created_at: new Date(),
    content: "The final match ended in a dramatic penalty shootout.",
    url: "https://news.com/article-5",
    author: "Mike Johnson",
    category: "sports"
  },
  {
    title: "Climate Change Impact Rising",
    description: "Global temperatures continue to increase.",
    url_to_image: "https://picsum.photos/300?6",
    source_name: "Nature",
    published_at: new Date(),
    created_at: new Date(),
    content: "Scientists urge immediate action to combat climate change effects.",
    url: "https://news.com/article-6",
    author: "Emma Green",
    category: "environment"
  },
  {
    title: "New Smartphone Innovations",
    description: "Latest devices feature AI integration.",
    url_to_image: "https://picsum.photos/300?7",
    source_name: "Gadgets 360",
    published_at: new Date(),
    created_at: new Date(),
    content: "Smartphones now include advanced cameras and processors.",
    url: "https://news.com/article-7",
    author: "Tech Guru",
    category: "technology"
  },
  {
    title: "Education System Goes Digital",
    description: "Online learning platforms expand globally.",
    url_to_image: "https://picsum.photos/300?8",
    source_name: "EdTech Review",
    published_at: new Date(),
    created_at: new Date(),
    content: "Digital classrooms are becoming the new normal.",
    url: "https://news.com/article-8",
    author: "Anita Rao",
    category: "education"
  },
  {
    title: "Electric Cars Dominate Market",
    description: "EV adoption sees record growth.",
    url_to_image: "https://picsum.photos/300?9",
    source_name: "AutoCar",
    published_at: new Date(),
    created_at: new Date(),
    content: "Governments push incentives for electric vehicle adoption.",
    url: "https://news.com/article-9",
    author: "Raj Kumar",
    category: "automobile"
  },
  {
    title: "Cybersecurity Threats Increase",
    description: "Hackers target large corporations.",
    url_to_image: "https://picsum.photos/300?10",
    source_name: "Security Weekly",
    published_at: new Date(),
    created_at: new Date(),
    content: "Companies invest heavily in cybersecurity measures.",
    url: "https://news.com/article-10",
    author: "Cyber Analyst",
    category: "technology"
  },
  {
    title: "Stock Market Hits Record High",
    description: "Markets surge due to investor confidence.",
    url_to_image: "https://picsum.photos/300?11",
    source_name: "Reuters",
    published_at: new Date(),
    created_at: new Date(),
    content: "Strong earnings reports drive stock prices upward.",
    url: "https://news.com/article-11",
    author: "Finance Expert",
    category: "business"
  },
  {
    title: "Breakthrough in Renewable Energy",
    description: "New solar tech increases efficiency.",
    url_to_image: "https://picsum.photos/300?12",
    source_name: "Energy Today",
    published_at: new Date(),
    created_at: new Date(),
    content: "Solar panels now generate more power at lower cost.",
    url: "https://news.com/article-12",
    author: "Energy Analyst",
    category: "environment"
  },
  {
    title: "Olympics 2026 Preparations Begin",
    description: "Host city gears up for global event.",
    url_to_image: "https://picsum.photos/300?13",
    source_name: "Olympics Org",
    published_at: new Date(),
    created_at: new Date(),
    content: "Infrastructure projects are underway.",
    url: "https://news.com/article-13",
    author: "Sports Desk",
    category: "sports"
  },
  {
    title: "New AI Model Released",
    description: "Next-gen AI model outperforms predecessors.",
    url_to_image: "https://picsum.photos/300?14",
    source_name: "OpenAI News",
    published_at: new Date(),
    created_at: new Date(),
    content: "The model demonstrates improved reasoning capabilities.",
    url: "https://news.com/article-14",
    author: "AI Researcher",
    category: "technology"
  },
  {
    title: "Tourism Industry Rebounds",
    description: "Travel demand rises post-pandemic.",
    url_to_image: "https://picsum.photos/300?15",
    source_name: "Travel Weekly",
    published_at: new Date(),
    created_at: new Date(),
    content: "Tourist destinations report increased bookings.",
    url: "https://news.com/article-15",
    author: "Travel Expert",
    category: "travel"
  },
  {
    title: "Food Prices Continue to Rise",
    description: "Inflation affects grocery costs.",
    url_to_image: "https://picsum.photos/300?16",
    source_name: "Food Times",
    published_at: new Date(),
    created_at: new Date(),
    content: "Consumers feel the impact of rising food prices.",
    url: "https://news.com/article-16",
    author: "Market Analyst",
    category: "economy"
  },
  {
    title: "Gaming Industry Growth",
    description: "Gaming sees record revenues.",
    url_to_image: "https://picsum.photos/300?17",
    source_name: "GameSpot",
    published_at: new Date(),
    created_at: new Date(),
    content: "New releases boost gaming industry profits.",
    url: "https://news.com/article-17",
    author: "Game Reviewer",
    category: "entertainment"
  },
  {
    title: "Fashion Trends in 2026",
    description: "Sustainable fashion gains popularity.",
    url_to_image: "https://picsum.photos/300?18",
    source_name: "Vogue",
    published_at: new Date(),
    created_at: new Date(),
    content: "Eco-friendly clothing becomes mainstream.",
    url: "https://news.com/article-18",
    author: "Fashion Editor",
    category: "lifestyle"
  },
  {
    title: "Blockchain Technology Expands",
    description: "More industries adopt blockchain solutions.",
    url_to_image: "https://picsum.photos/300?19",
    source_name: "Crypto News",
    published_at: new Date(),
    created_at: new Date(),
    content: "Blockchain improves transparency and security.",
    url: "https://news.com/article-19",
    author: "Crypto Analyst",
    category: "technology"
  },
  {
    title: "Mental Health Awareness Increases",
    description: "Focus on mental well-being grows.",
    url_to_image: "https://picsum.photos/300?20",
    source_name: "Healthline",
    published_at: new Date(),
    created_at: new Date(),
    content: "More people seek professional mental health support.",
    url: "https://news.com/article-20",
    author: "Health Writer",
    category: "health"
  }
];

const seedArticles = async () => {
  try {
    console.log("Seeding articles data...");

    for (let article of articles) {
      await pool.query(
        `INSERT INTO articles 
        (title, description, url_to_image, source_name, published_at, created_at, content, url, author, category)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          article.title,
          article.description,
          article.url_to_image,
          article.source_name,
          article.published_at,
          article.created_at,
          article.content,
          article.url,
          article.author,
          article.category
        ]
      );
    }

    console.log("Articles Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Here some Seeding Error:", error);
    process.exit(1);
  }
};

seedArticles();