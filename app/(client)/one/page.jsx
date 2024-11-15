// app/page.jsx or app/page.tsx (depending on your project setup)
import React from 'react';

// This component will run on the server by default in the app directory
export default async function Home() {
  let data = [];

  try {
    const response = await fetch('https://jmc-asset-server.vercel.app/projects', {
      // Ensure the request runs on the server
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
