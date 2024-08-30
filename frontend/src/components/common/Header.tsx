import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">DDialog</Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;