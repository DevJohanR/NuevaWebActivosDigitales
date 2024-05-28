import React, { useEffect } from 'react';
import styles from './Servicios.module.css';
import { FaRegCreditCard, FaUniversity, FaMobileAlt, FaMoneyCheckAlt, FaFileInvoiceDollar, FaGlobe } from 'react-icons/fa';

const Servicios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.containerServicios}>
      <h1 className={styles.title}>NUESTROS SERVICIOS</h1>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>PROVEEDORES DE SERVICIOS DE ACTIVOS VIRTUALES</h2>
        <p className={styles.paragraph}>Auditados y verificados por la PSAV-UIAF: 153</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaRegCreditCard className={styles.icon} /> Pago de tarjetas</h2>
        <p className={styles.paragraph}>Bancos: Davivienda, Grupo Aval, Banco Falabella, Scotiabank, Nubank</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaMoneyCheckAlt className={styles.icon} /> Consignaciones y retiros</h2>
        <p className={styles.paragraph}>A: Movii, Bancamia, RappiPay, Openpay, CivicaPay, Bancolombia, Lulobank, Tpaga, ClaroPay, Nequi, Payválida, Davivienda</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaMobileAlt className={styles.icon} /> Recargas y paquetes</h2>
        <p className={styles.paragraph}>Operadores: Tigo, Claro, Wom, Movistar, Etb, Calley Moviil, Virgia, DirecTV, Flash Mobile, Lov</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaUniversity className={styles.icon} /> Pagos de terceros</h2>
        <p className={styles.paragraph}>Grupo Aval: Banco Av Villas, Banco de Bogotá, Banco de Occidente, Banco Popular</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaFileInvoiceDollar className={styles.icon} /> Pago de IMPUESTOS, servicios públicos y pagos de planilla Pila</h2>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}><FaGlobe className={styles.icon} /> Desarrollo web</h2>
      </section>
    </div>
  );
};

export default Servicios;
