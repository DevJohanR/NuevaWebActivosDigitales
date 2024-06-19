import React from 'react'
import { Link } from 'react-router-dom';
import styles from './KYC.module.css';
import { SiAuthelia } from "react-icons/si";


const KYC = () => {
  return (
    <div className={styles.containerKYC}>
      <Link to = "/login">
      <SiAuthelia style={{ color: 'white', fontSize: '48px', marginBottom: '20px' }} />
      </Link>
      <h1>Elige el tipo de KyC que realizaras</h1>

      <div className={styles.rutaKYC}><Link to = "/personas">
    <button>Personas</button>
    </Link>

    <hr />
    <Link to = "/juridicos">
    <button>Juridicos</button>
    </Link>
    <hr />

 
     </div>

     
    </div>
  )
}

export default KYC