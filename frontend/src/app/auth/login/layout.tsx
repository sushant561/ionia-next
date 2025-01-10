// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext'; // Import your AuthProvider
import '@/styles/globals.css'; // Your styles or other global imports
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider> {/* Wrap only the authentication logic in the AuthProvider */}
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
