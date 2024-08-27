import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">DDialog</Link>
        </div>
      </header>
      <main className="container mx-auto mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;