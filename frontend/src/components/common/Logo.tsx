import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/logo.png';  // Certifique-se de ter esta imagem em seus assets

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center justify-center p-4">
      <img src={logoImage} alt="DDialog Logo" className="w-8 h-8" />
    </Link>
  );
};

export default Logo;