import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center my-8">
      <div className="w-96 justify-center border boder-cyan-50 shadow-md p-6">{children}</div>
    </div>
  );
};

export default Layout;
