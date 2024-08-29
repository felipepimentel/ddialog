import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <main className="container mx-auto mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;