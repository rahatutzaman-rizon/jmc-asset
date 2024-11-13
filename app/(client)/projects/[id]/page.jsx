// app/projects/[id]/page.js
import React from 'react';
import Image from 'next/image';

// This function is necessary for static site generation
export async function generateStaticParams() {
  const res = await fetch('https://asset-server.bdcare.vip/projects');
  const projects = await res.json();
  
  return projects.map((project) => ({
    id: project._id,
  }));
}

async function getProject(id) {
  const res = await fetch(`https://asset-server.bdcare.vip/projects/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }
  return res.json();
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.id);

  return (
    
    <div className="container mx-auto px-4 py-8">
    {/* Project Title */}
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 mt-24">Project Details </h1>
      <p className="text-lg text-gray-600">
        Current Status: <span className="font-bold text-primary">{project.status} {project._id}</span>
      </p>
    </div>

    {/* Project Information (Static) */}
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Project Overview</h2>
      <p className="text-gray-600 mb-6">
        This project is aimed at revolutionizing the project management system by centralizing oversight, enhancing collaboration between students and teachers, and streamlining progress tracking.
      </p>
      <ul className="text-gray-600">
        <li className="mb-2"><strong>Client:</strong> JMC Asset Management</li>
        <li className="mb-2"><strong>Start Date:</strong> January 1, 2024</li>
        <li className="mb-2"><strong>End Date:</strong> Updated Soon</li>
     
   
      </ul>
    </div>

    {/* Project Images (Dynamic) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {project.images.map((image, index) => (
        <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105">
          <Image
            src={image}
            alt={`Project image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>

    {/* Additional Project Notes (Static) */}
    <div className="mt-10 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Notes</h2>
      <p className="text-gray-600">
        The project includes various phases, from initial planning to final delivery, ensuring comprehensive tracking and management throughout its lifecycle.
      </p>
    </div>
  </div>



  );
}