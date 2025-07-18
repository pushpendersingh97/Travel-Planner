import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MyProvider } from './provider/MyProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Travel Planner',
  description: 'Plan your travel with live weather and city insights.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MyProvider>{children}</MyProvider>
      </body>
    </html>
  );
}
