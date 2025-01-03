import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unified Payment System',
  description: 'Unified Payment System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
