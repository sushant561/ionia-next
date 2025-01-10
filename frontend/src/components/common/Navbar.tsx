'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'JEE Mains', href: '/exam/jee-mains' },
    { name: 'JEE Advanced', href: '/exam/jee-advanced' },
    { name: 'CUET', href: '/exam/cuet' },
    { name: 'Practice', href: '/practice' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        if (payload.username) {
          setUser({ username: payload.username });
        }
        console.log('Decoded Payload:', payload);
      } catch (err) {
        console.error('Failed to parse token:', err);
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">TestSeries</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <User className="text-blue-600" size={20} />
                <span>{user.username}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 space-x-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="text-blue-600" size={20} />
                  <span>{user.username}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
