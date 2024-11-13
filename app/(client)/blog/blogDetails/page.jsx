// components/BlogPost.tsx
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Instagram, X, ArrowLeft } from 'lucide-react';
import banner from '../../../Asset/blogs/bg.png';

export default function BlogPost() {
  return (
    <div className="relative flex justify-center mt-8">
      {/* Left Sidebar with social media icons */}
      {/* <div className=" flex flex-col space-y-6 ml-64 mt-64 sticky">
        <X className="w-6 h-6 text-gray-600" />
        <Twitter className="w-6 h-6 text-gray-600" />
        <Facebook className="w-6 h-6 text-gray-600" />
        <Instagram className="w-6 h-6 text-gray-600" />
      </div> */}

      {/* Main blog content */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative mt-12">
        {/* Top Image */}
        <div className="relative h-64">
          <Image
            src={banner}
            // Replace with actual top image path
            alt="Top Blog Image"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center px-4">
              UX/UI Design Trends Going Into 2024
            </h1>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-6 space-y-6">
          {/* Article Title Section */}
          <div className="flex items-center space-x-4 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-primary font-semibold">But they do not know who is chosen.</span>
          </div>

          {/* Blog Text */}
          <p className="text-primary">
            He hates the pleasures of those who are great because You owe it to him,
            except for the pain of refusing. Because he is averse to pain, but he
            wants to take the pain that they provide. That is to ask who and how and
            the fault times a. To be labored or physically bound to endure.
          </p>

          <h2 className="text-xl font-semibold text-primary">
            He will not criticize everyone to whom you are indebted here.
          </h2>

          <p className="text-primary">
            He wants things to be resolved. Others who do not suffer pain at the
            same time and do similar pleasures. Things are easy and there is no need
            for pain. Further, as blinded by the greed of the corrupt accusers. They are
            from free parentage. The pleasure of distinguishing the smallest things
            from time to time.
          </p>

          <p className="text-primary">
            There is nothing but the necessities of the times that the smallest things
            of the mind provide. Nor does anyone want to bear the difference of
            mind. Because they just leave it big and dark. He may be held, but he
            flees, but let him seek the smallest thing. Whether he seeks the pleasure
            of life or the pain, and because he obtains it.
          </p>

          <h2 className="text-xl font-semibold text-primary">
            As the pains of the body which result in bearing nothing in the manner of the accusers.
          </h2>

          <p className="text-primary">
            There is nothing but the necessities of the times that the smallest things
            of the mind provide. Nor does anyone want to bear the difference of
            mind. Because they just leave it big and dark. He may be held, but he
            flees, but let him seek the smallest thing. Whether he seeks the pleasure
            of life or the pain, and because he obtains it.
          </p>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-6 border-t">
            <p className="text-sm text-primary">Written By: Admin</p>
            <div className="flex space-x-2">
              <Twitter className="w-5 h-5 text-gray-600" />
              <Linkedin className="w-5 h-5 text-gray-600" />
              <Facebook className="w-5 h-5 text-gray-600" />
              <Instagram className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
