// File: src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oppose Arkansas SB307 | Contact Your Representatives',
  description: 'Take action against Arkansas Senate Bill 307, which could increase your utility bills. Find your representatives and send them an email expressing your opposition.',
  keywords: 'Arkansas, SB307, opposition, civic engagement, contact representatives, utility bill increase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}