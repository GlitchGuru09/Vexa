import React from 'react';
import VexaLogo from '../images/vexalogo.png';

const Header = () => {
  return (
    <header className="flex items-center p-2 bg-transparent">
      <img src={VexaLogo} alt="Vexa Logo" className="w-24 h-24" />
    </header>
  );
};

export default Header;
