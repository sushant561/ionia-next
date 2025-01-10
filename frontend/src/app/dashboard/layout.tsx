// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext'; // Import the AuthProvider
import '@/styles/globals.css'; // Your global styles

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <html lang="en">
        <head>
          {/* You can add additional head content here */}
        </head>
        <body>
          <Navbar /> {/* The Navbar can be placed here */}
          <main>{children}</main> {/* Main content will go here */}
          <Footer /> {/* The Footer can be placed here */}
        </body>
      </html>
    </AuthProvider>
  );
}
