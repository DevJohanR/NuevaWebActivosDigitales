import React, { useState } from 'react';
import Personas from '../Personas/Personas';
import Juridicos from '../Juridicos/Juridicos';
import Auditoria from '../Auditoria/Auditoria'; 
import styles from './AdministradorPanel.module.css';

const AdministradorPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedJuridico, setSelectedJuridico] = useState(null);


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
                <Personas searchTerm={searchTerm} setSelectedUser={setSelectedUser} />
                <Juridicos searchTerm={searchTerm} setSelectedJuridico={setSelectedJuridico} />
            </div>
            <Auditoria selectedUser={selectedUser} selectedJuridico={selectedJuridico} />
        </div>
    );
}

export default AdministradorPanel;
