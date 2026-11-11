import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.scss';

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hairstyler',
  description: 'Фены и стайлеры',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={onest.className}>{children}</body>
    </html>
  );
}