import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, Tag, ArrowRight, Linkedin, Twitter, Facebook } from 'lucide-react';

const BASE_URL = 'https://asset-server.bdcare.vip';

// Fetch all blog posts
async function getAllBlogPosts() {
  const res = await fetch(`${BASE_URL}/blog`);
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

// Fetch blog data by ID
async function getBlogData(id) {
  const res = await fetch(`${BASE_URL}/blog/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch blog data');
  }
  return res.json();
}

// Fetch related blog posts
async function getRelatedPosts(id) {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post._id !== id);
}

// Generate static params for blog pages
export async function generateStaticParams() {
  const blogs = await getAllBlogPosts();

  return blogs.map((blog) => ({
    id: blog._id.toString(),
  }));
}

// Fetch blog data at build time
export async function generateMetadata({ params }) {
  const blog = await getBlogData(params.id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

// Blog Detail page component
export default async function BlogDetail({ params }) {
  const { id } = params;

  const blog = await getBlogData(id);
  const relatedPosts = await getRelatedPosts(id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold text-gray-800">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      <main className="container mx-auto px-4 py-12">
        <article className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-[60vh]">
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title}
              fill
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
                <div className="flex flex-wrap items-center text-xl font-bold text-white">
                  <span className="flex items-center mr-6 mb-2">
                    <User className="mr-2" />
                    {blog.author}
                  </span>
                  <span className="flex items-center mr-6 mb-2">
                    <Calendar className="mr-2" />
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center mb-2">
                    <Tag className="mr-2" />
                    {blog.tags.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="prose max-w-none">
              <p className="text-xl text-primary mb-8 leading-relaxed">{blog.description}</p>
              <div
                className="text-primary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Additional Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blog.extraImages.map((img, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                    <Image
                      src={img.url}
                      alt={img.altText}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <p className="p-4 text-sm text-gray-700">{img.altText}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 border-t pt-8">
              <h4 className="text-xl font-semibold mb-4 text-primary">Share this article</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 transition duration-300">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-blue-800 hover:text-blue-900 transition duration-300">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link href={`/blogs/${post._id}`} key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <Image
                  src={post.thumbnailUrl}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.summary}</p>
                  <span className="text-primary font-medium flex items-center">
                    Read more <ArrowRight className="ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
