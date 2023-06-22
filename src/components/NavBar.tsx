'use client';
import React from 'react';
import ContentWrapper from './ContentWrapper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="p-3 w-full border-b bg-black border-b-electric-green-700 sticky top-0 z-50">
      <ContentWrapper>
        <div className="flex items-center">
          <span
            className="
              font-title italic text-4xl
              relative inline-block text-transparent
              bg-clip-text bg-gradient-to-b from-electric-green-100 from-30%
              via-electric-green-400 to-electric-green-100 to-70%
              before:bg-[-200px] before:animate-flare before:bg-gradient-flare
              before:bg-no-repeat
              before:bg-clip-text before:text-transparent before:block
              before:absolute before:content-['Emilie_Room_Booking_App']
            "
          >
            <span
              className="
                before:animate-sparkle-left before:bg-white before:rounded-full
                before:shadow-sparkle before:content-[''] before:block
                before:opacity-0 before:absolute
                before:h-[5px] before:w-[5px] before:left-0 before:top-[0.78em]
                after:animate-sparkle-right after:bg-white after:rounded-full
                after:shadow-sparkle after:content-[''] after:block
                after:opacity-0 after:absolute
                after:h-[6px] after:w-[6px] after:right-[1px] after:top-[0.1em]
              "
            >
              Emilie Room Booking App
            </span>
          </span>
          <nav className="ml-auto flex items-center">
            <Link href="/events">
              <span
                className={`text-2xl hover:text-electric-green-400 mr-3 ${
                  pathname === '/events' ? 'underline' : ''
                }`}
              >
                Events
              </span>
            </Link>
            <Link href="/rooms">
              <span
                className={`text-2xl hover:text-electric-green-400 ${
                  pathname === '/rooms' ? 'underline' : ''
                }`}
              >
                Rooms
              </span>
            </Link>
          </nav>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default NavBar;
