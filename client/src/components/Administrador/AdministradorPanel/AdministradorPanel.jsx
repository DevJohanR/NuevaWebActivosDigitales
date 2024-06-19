import React, { useState } from 'react';
import styles from './AdministradorPanel.module.css';
import Personas from '../Personas/Personas';
import Juridicos from '../Juridicos/Juridicos';

const AdministradorPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.AdministradorPanel}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchBar}
      />
      <div className={styles.resultsContainer}>
        <Personas searchTerm={searchTerm} />
        <Juridicos searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default AdministradorPanel;
