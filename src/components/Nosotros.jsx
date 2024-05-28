import React from 'react';
import styles from './Nosotros.module.css';
import { FaEye, FaBullseye } from 'react-icons/fa';

const Nosotros = () => {
  return (
    <div className={styles.containerNosotros}>
      <h1 className={styles.title}>¿Quienes Somos?</h1>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaEye className={styles.icon} /> Visión</h2>
        <p className={styles.text}>Ser el líder global en educación, comercio y análisis del mercado de criptomonedas, empoderando a las personas a tomar decisiones informadas y navegar con éxito en el ecosistema de activos digitales. Eliminar las barreras de entrada y hacer que la educación sobre criptomonedas sea accesible para todos, independientemente de su nivel de experiencia o antecedentes.</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaBullseye className={styles.icon} /> Misión</h2>
        <p className={styles.text}>Convertirse en la fuente de referencia para la educación, el comercio y el análisis de criptomonedas. Empoderar a millones de personas a tomar el control de su futuro financiero.</p>
      </section>
    </div>
  );
};

export default Nosotros;
