// pages/index.js

import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Next.js Unique Design</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Home page</h1>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
             <a href='http://localhost:8000/login'>Login</a>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
