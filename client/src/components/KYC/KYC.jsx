import React from 'react'
import { Link } from 'react-router-dom';
import styles from './KYC.module.css';

const KYC = () => {
  return (
    <div className={styles.containerKYC}>
      <h1>Elige el tipo de KyC que realizaras</h1>

      <div className={styles.rutaKYC}><Link to = "/personas">
    <button>Personas</button>
    </Link>

    <hr />
    <Link to = "/juridicos">
    <button>Juridicos</button>
    </Link>
     </div>

     
    </div>
  )
}

export default KYC