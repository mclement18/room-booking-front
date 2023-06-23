import { PropsWithChildren } from 'react';

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className="mx-auto p-2 md:p-0 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl">
    {children}
  </div>
);

export default ContentWrapper;
