'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'JEE Mains', href: '/exam/jee-mains' },
    { name: 'JEE Advanced', href: '/exam/jee-advanced' },
    { name: 'CUET', href: '/exam/cuet' },
    { name: 'CBSE', href: '/exam/cbse' },
    { name: 'Practice', href: '/practice' },
  ];

  // Load user from token (if available)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        if (payload.username) {
          setUser({ username: payload.username });
        }
      } catch (err) {
        console.error('Failed to parse token:', err);
      }
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <nav className="fixed mb-40 top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-4xl font-bold text-green-600">iONIA<br></br><span className="logo-b">Enquire beyond horizon</span></span>
            
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition"
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
                className="mygreen text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 md:hidden"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full bg-white shadow-lg transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Close Button Inside Menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-red-600"
          >
            <X size={28} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="pt-2 pb-4 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 space-x-2 text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <User className="text-blue-600" size={20} />
              <span>{user.username}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
