"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '../styles/globals.css';
import { useEffect } from 'react';

export default function Home() {
  // useEffect(() => {
  //   // Set the page title
  //   window.location.reload();
  // }, []);

  const examTypes = [
    {
      title: 'JEE Mains',
      description: 'Comprehensive practice for JEE Main examination',
      href: '/exam/jee-mains',
      color: 'bg-green-500',
    },
    {
      title: 'JEE Advanced',
      description: 'Advanced level preparation for IIT entrance',
      href: '/exam/jee-advanced',
      color: 'bg-green-500',
    },
    {
      title: 'CUET',
      description: 'Common University Entrance Test preparation',
      href: '/exam/cuet',
      color: 'bg-green-500',
    },
    {
      title: 'CBSE',
      description: 'Central Board of Secondary Education',
      href: '/exam/cbse',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mytxtdim mygray text-center mb-16 bg-gradient-to-r from-green-600 via-#dcffdc-600 to-green-600 p-12 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold text-black mb-6">
          Ace Your Entrance Exams
        </h1>
        <p className="mytxtdim text-xl text-black-100 mb-8 max-w-3xl mx-auto">
          Practice with our comprehensive test series for JEE Mains, Advanced, and CUET. Boost your preparation with personalized insights and mock tests.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/register"
            className="mygreen bg-blue-600 text-black px-8 py-3 rounded-lg hover:bg-green-700 hover:text-white transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Exam Types Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {examTypes.map((exam) => (
          <Link
            key={exam.title}
            href={exam.href}
            className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <div style={{ background: "linear-gradient(to bottom, #22c55e,rgb(15, 100, 46))" }} className={`${exam.color} p-8 text-white h-full shadow-xl hover:shadow-2xl rounded-lg`}>
              <h3 className="text-3xl font-bold mb-4">{exam.title}</h3>
              <p className="mb-6 text-lg">{exam.description}</p>
              <ArrowRight className="absolute bottom-4 right-4 transform group-hover:translate-x-2 transition-transform text-3xl" />
            </div>
          </Link>
        ))}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8 bg-gray-50 rounded-lg shadow-md">
        {[
          {
            title: 'Chapter-wise Practice',
            description: 'Practice questions organized by chapters and topics',
          },
          {
            title: 'Mock Tests',
            description: 'Full-length tests simulating actual exam environment',
          },
          {
            title: 'Detailed Analysis',
            description: 'Get comprehensive performance reports and insights',
          },
          {
            title: 'Custom Tests',
            description: 'Create personalized tests based on your needs',
          },
          {
            title: 'Performance Tracking',
            description: 'Track your progress with detailed analytics',
          },
          {
            title: 'Expert Support',
            description: '24/7 access to detailed solutions and explanations',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-lg border border-gray-300 bg-white hover:border-green-500 transition-colors transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className=" mygray text-center py-16 bg-blue-600 text-white rounded-lg shadow-lg mt-16">
        <h2 className="text-3xl font-semibold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Take the first step toward acing your exams with our platform. Choose your test, start practicing, and track your progress. Join us now!
        </p>
        <Link
          href="/register"
          className="mygreen bg-yellow-500 text-black-800 px-8 py-3 rounded-lg hover:bg-green-700 hover:text-white transition duration-300 shadow-lg transform hover:scale-105"
        >
          Start Now
        </Link>
      </section>
    </div>
  );
}
