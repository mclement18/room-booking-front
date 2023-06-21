import './globals.css';
import { VT323 } from 'next/font/google';
import localFont from 'next/font/local';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

const racespace = localFont({
  variable: '--font-racespace',
  src: [
    {
      path: './RACESPACEREGULAR.otf',
      style: 'normal',
    },
    {
      path: './RACESPACESTRIPE.otf',
      style: 'italic',
    },
  ],
});

export const metadata = {
  title: "Emilie's Room Booking App",
  description: 'An app to book room (or toilet) only for Emilie Jacquemod',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} ${racespace.variable}`}>
        {children}
      </body>
    </html>
  );
}
