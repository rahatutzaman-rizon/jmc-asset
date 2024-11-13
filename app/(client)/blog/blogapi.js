export default function handler(req, res) {
    res.status(200).json([
      {
        title: 'How to Improve Your Roofing',
        author: 'John Doe',
        date: 'August 19, 2020',
        views: 150,
        comments: 20,
        excerpt: 'Learn the best practices in maintaining your roof, including tips on materials, maintenance, and more.',
        image: '/images/roofing1.jpg',
        slug: 'how-to-improve-your-roofing',
        youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        title: 'The Benefits of Using Solar Panels',
        author: 'Jane Smith',
        date: 'September 15, 2020',
        views: 230,
        comments: 12,
        excerpt: 'Solar panels can save you money and protect the environment. Discover how to integrate solar energy into your home.',
        image: '/images/solar-panels.jpg',
        slug: 'benefits-of-using-solar-panels',
        youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        title: 'Understanding Roof Insulation',
        author: 'Alan Turing',
        date: 'October 10, 2020',
        views: 310,
        comments: 25,
        excerpt: 'Roof insulation is crucial for energy efficiency. Explore the types of insulation and their benefits.',
        image: '/images/insulation.jpg',
        slug: 'understanding-roof-insulation',
        youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ]);
  }
  