"use client"

import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import banner from '../../Asset/blogs/bg.png';
import blog from '../../Asset/blogs/blog.png';
import blogs from '../../Asset/blogs/blogs.png';
import { useEffect, useState } from 'react';

const blogPostsData = [
  {
    id: 1,
    title: 'UX/UI Design Trends Going Into 2024',
    category: 'Design',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur. Eu nulla tellus vel ...',
    image: '/images/featured-post.jpg',
    author: 'Writer Name'
  },
  // Add more blog posts here
];

const categoriesData = [
  { name: 'Category Name', image: '/images/category1.jpg' },
  { name: 'Category Name', image: '/images/category2.jpg' },
  { name: 'Category Name', image: '/images/category3.jpg' },
  { name: 'Category Name', image: '/images/category4.jpg' },
  { name: 'Category Name', image: '/images/category5.jpg' },
  { name: 'Category Name', image: '/images/category6.jpg' },
  { name: 'Category Name', image: '/images/category7.jpg' },
  { name: 'Category Name', image: '/images/category8.jpg' },
];

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchData = () => {
      setTimeout(() => {
        setBlogPosts(blogPostsData);
        setCategories(categoriesData);
        setLoading(false);
      }, 2000); // 2 seconds delay
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative h-72 mt-16">
        <Image
          src={banner}
          alt="Header background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-end justify-start ml-8 md:ml-48 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Blogs</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <Image
                  src={blog}
                  alt={blogPosts[0].title}
                  width={600}
                  height={200}
                  objectFit="cover"
                />
              )}
            </div>
            <div className="p-6 md:p-8">
              {loading ? (
                <>
                  <Skeleton height={30} width="80%" />
                  <Skeleton height={20} count={2} />
                </>
              ) : (
                <>
                  <Link href={`/blog/${blogPosts[0].id}`} passHref>
                    <p className="block mt-1 text-2xl md:text-4xl text-primary leading-tight font-semibold hover:underline">
                      {blogPosts[0].title}
                    </p>
                  </Link>
                  <p className="mt-2 text-primary">{blogPosts[0].excerpt}</p>
                  <p className="mt-4 text-primary font-bold">{blogPosts[0].author}</p>
                  <Link href={`/blog/blogDetails`} passHref>
                    <p className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90">
                      Read More
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Skeleton height={200} />
                  <div className="p-4">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={15} count={2} />
                  </div>
                </div>
              ))
            ) : (
              categories.map((category, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={blogs}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{category.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet consectetur. Eu nulla tellus vel ...
                    </p>
                    <Link href={`blog/blogDetails`} passHref>
                      <p className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90">
                        Explore
                      </p>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
