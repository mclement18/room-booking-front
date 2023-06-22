import { PropsWithChildren } from 'react';

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
    {children}
  </div>
);

export default ContentWrapper;
