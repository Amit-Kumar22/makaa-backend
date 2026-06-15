import '@/styles/globals.css';
import type { Metadata } from 'next';
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: 'Makka - Premium Maize Supplier',
  description: 'Premium Quality Maize for Feed, Food Processing & Industrial Applications',
  keywords: 'maize, corn, feed, agricultural, premium quality',
  openGraph: {
    title: 'Makka - Premium Maize Supplier',
    description: 'Premium Quality Maize for Feed, Food Processing & Industrial Applications',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-dark-900">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
