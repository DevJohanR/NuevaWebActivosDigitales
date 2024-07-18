import React, { useState } from 'react';
import Personas from '../Personas/Personas';
import Juridicos from '../Juridicos/Juridicos';
import Auditoria from '../Auditoria/Auditoria'; 
import styles from './AdministradorPanel.module.css';

const AdministradorPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedJuridico, setSelectedJuridico] = useState(null);
    const [auditoriaUpdate, setAuditoriaUpdate] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAuditoriaUpdate = () => {
        setAuditoriaUpdate(prev => !prev); // Toggle state to trigger re-render in Auditoria
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
                <Personas searchTerm={searchTerm} setSelectedUser={setSelectedUser} onAuditar={handleAuditoriaUpdate} />
                <Juridicos searchTerm={searchTerm} setSelectedJuridico={setSelectedJuridico} onAuditar={handleAuditoriaUpdate} />
            </div>
            
            <Auditoria selectedUser={selectedUser} selectedJuridico={selectedJuridico} auditoriaUpdate={auditoriaUpdate} />
        </div>
    );
}

export default AdministradorPanel;
