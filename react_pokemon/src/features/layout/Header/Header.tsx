import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants';
import logo from '../../.././assets/img/pokemon_logo.png';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <img className={styles.header_logo} src={logo} alt="" />
          <div className={styles.header_quote}></div>
        </div>
        <div className={styles.header_navigation}>
          <Link to={ROUTES.POKEMONS}>Pokemons</Link>
          <Link to={ROUTES.POKEDEX}>Pokedex</Link>
        </div>
      </div>
    </div>
  );
};
