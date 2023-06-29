import React from 'react';
import ContentWrapper from './ContentWrapper';

const Footer = () => (
  <footer className="absolute bottom-0 w-full p-2">
    <ContentWrapper>
      <div className="flex items-center justify-end">
        <span className="text-sm text-electric-green-300">
          &copy; 2023{' '}
          <a href="https://github.com/mclement18/" className="hover:underline">
            Mathieu Clément
          </a>
        </span>
      </div>
    </ContentWrapper>
  </footer>
);

export default Footer;
