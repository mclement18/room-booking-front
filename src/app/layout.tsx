import NavBar from '@/components/NavBar';
import './globals.scss';
import { VT323 } from 'next/font/google';
import localFont from 'next/font/local';
import ContentWrapper from '@/components/ContentWrapper';
import Footer from '@/components/Footer';
import AlertProvider from '@/components/AlertProvider';

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
      <body
        className={`${vt323.variable} ${racespace.variable} min-h-screen-d relative bg-black bg-gradient-to-b from-transparent from-50% to-electric-green-900 text-electric-green-100 font-mono`}
      >
        <NavBar />
        <div className="pb-9">
          <AlertProvider>
            <ContentWrapper>{children}</ContentWrapper>
          </AlertProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
