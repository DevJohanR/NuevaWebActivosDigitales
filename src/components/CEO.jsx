import React from 'react';
import styles from './CEO.module.css';
import ceoImage from '../assets/Norman.png'; // Asegúrate de que esta ruta es correcta
import { FaUsers, FaThumbsUp, FaTiktok } from 'react-icons/fa';

const CEO = () => {
  return (
    <div className={styles.containerCEO}>
      <div className={styles.ceoContent}>
        <div className={styles.ceoText}>
          <h1 className={styles.title}>CEO & Fundador</h1>
          <p className={styles.paragraph}>
            Detrás del Éxito: Un Vistazo al Mundo Empresarial donde la influencia en las redes sociales se combina con el liderazgo. Con una base de seguidores que supera los 100,000, Norman ha consolidado su posición como un referente en las plataformas digitales. Pero su influencia va más allá: como exitoso empresario, Norman Luna dirige una próspera empresa que refleja su visión y creatividad.
          </p>
        </div>
        <div className={styles.ceoImage}>
          <img src={ceoImage} alt="CEO" className={styles.image} />
        </div>
      </div>
      <div className={styles.ceoStats}>
        <div className={styles.stat}>
          <FaUsers className={styles.icon} />
          <h2 className={styles.statTitle}>10K</h2>
          <p className={styles.statSubtitle}>Seguidores</p>
          <p className={styles.statText}>Más de 10,000 seguidores en landing page verificada de Facebook</p>
        </div>
        <div className={styles.stat}>
          <FaThumbsUp className={styles.icon} />
          <h2 className={styles.statTitle}>10K</h2>
          <p className={styles.statSubtitle}>Me gusta</p>
          <p className={styles.statText}>Más de 10,000 reacciones a la página de Facebook</p>
        </div>
        <div className={styles.stat}>
          <FaTiktok className={styles.icon} />
          <h2 className={styles.statTitle}>76K</h2>
          <p className={styles.statSubtitle}>Seguidores</p>
          <p className={styles.statText}>En Tik-Tok de un nicho enfocado a la finanzas e inversiones</p>
        </div>
      </div>
    </div>
  );
};

export default CEO;
