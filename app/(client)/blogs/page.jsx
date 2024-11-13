"use client"

import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://asset-server.bdcare.vip/blog')
        setBlogs(res.data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-16">
        <Skeleton count={1} height={400} className="mb-10" />
        <Skeleton count={3} height={250} className="mb-6" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 mt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-6 rounded-lg mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Welcome to Our Blog
        </h1>
        <p className="text-lg mb-6">
          Stay updated with the latest news and insights from our team. Explore our featured posts and discover more about what we do.
        </p>
        <Link href="/blogs" className="bg-white text-primary font-semibold py-3 px-6 rounded-full inline-flex items-center hover:bg-gray-100 transition">
          Explore All Blogs
     
        </Link>
      </section>

      {/* Featured Blog Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">Featured Blog</h2>
        {blogs.length > 0 && (
          <div className="bg-white border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <Image
              src={blogs[0].thumbnailUrl}
              alt={blogs[0].title}
              className="w-full h-72 object-cover"
              height={400}
              width={600}
            />
            <div className="p-6">
              <h3 className="text-3xl font-semibold text-primary-dark mb-4">
                {blogs[0].title}
              </h3>
              <p className="text-gray-600 mb-4">{blogs[0].summary}</p>
              <Link
                href={`/blogs/${blogs[0]._id}`}
                className="text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Read More 
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Blog Posts Grid */}
      <h2 className="text-4xl font-bold text-primary mb-12 text-center">All Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-lg"
              height={200}
              width={300}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-primary-dark">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">{blog.summary}</p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="text-primary font-medium flex items-center gap-1 hover:underline"
                >
                  <span>Read more</span> 
                </Link>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                {new Date(blog.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* External Information Section */}
      <section className="bg-gray-100 p-8 rounded-lg mt-12">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">More About Us</h2>
        <p className="text-lg mb-4 text-center">
          We are passionate about sharing our knowledge and experiences. For more information on our services and the latest updates, visit our <a href="https://externalwebsite.com" className="text-primary font-medium hover:underline">website</a> or follow us on <a href="https://twitter.com/yourhandle" className="text-primary font-medium hover:underline">Twitter</a>.
        </p>
        <div className="text-center">
          <Link href="/contact" className="bg-primary text-white font-semibold py-3 px-6 rounded-full inline-flex items-center hover:bg-primary-dark transition">
            Contact Us
           
          </Link>
        </div>
      </section>
    </div>
  )
}
