import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const noto = Noto_Sans_Thai({ subsets: ['thai'] });

export const metadata: Metadata = {
  title: 'What if - SMSU',
  description: "Who you are if you aren't a medical student?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <div className="bg-gradient-to-br from-wi-blue/50 via-wi-pink/50 to-wi-lemon/50">
          {children}
        </div>
      </body>
    </html>
  );
}
