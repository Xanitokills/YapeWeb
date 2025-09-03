import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './../app/globals.css';

export const metadata: Metadata = {
  title: 'PWS Dashboard',
  description: 'Welcome to the PWS Dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">{children}</body>
    </html>
  );
}