import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">iONIA</h3>
            <p className="text-gray-400">
              Your ultimate preparation platform for competitive exams
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-gray-400 hover:text-white">
                  Practice Tests
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Exams</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tests/jee-mains" className="text-gray-400 hover:text-white">
                  JEE Mains
                </Link>
              </li>
              <li>
                <Link href="/tests/jee-advanced" className="text-gray-400 hover:text-white">
                  JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/tests/cuet" className="text-gray-400 hover:text-white">
                  CUET
                </Link>
              </li>
              <li>
                <Link href="/tests/cbse" className="text-gray-400 hover:text-white">
                  CBSE
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} iONIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}