import React from 'react';
import '../styles/Header.module.css'; 

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
