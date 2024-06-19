import React from 'react';
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import { FaGem, FaDollarSign, FaRegHandshake, FaMoneyBillWave } from 'react-icons/fa';
import './Business.css';

const iconMapping = {
  "Oro Digital": <FaGem style={{ color: 'gold', fontSize: '32px' }} />,
  "Dólar Virtual": <FaDollarSign style={{ color: 'green', fontSize: '32px' }} />,
  "Contratos Inteligentes": <FaRegHandshake style={{ color: 'blue', fontSize: '32px' }} />,
  "Moneda Estable Digital": <FaMoneyBillWave style={{ color: 'green', fontSize: '32px' }} />
};

const FeatureCard = ({ title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} overflow-hidden relative gradient-border`} style={{ background: '#1c1c1e', border: '2px solid #2c2c2e' }}>
      {iconMapping[title]}
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const handleButtonClick = () => {
  window.open("https://bitppi.com", "_blank");
};

const Business = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Crea tu portafolio<br className="sm:block hidden" /> de activos virtuales
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Construir un portafolio de activos virtuales te permite diversificar tus inversiones, aprovechar las tendencias del mercado y maximizar tus rendimientos potenciales. Desde seleccionar los activos adecuados hasta entender las fluctuaciones del mercado, te guiaremos en cada paso del camino. Empieza ahora y transforma tu acercamiento a la inversión personal.
      </p>
      <Button styles="mt-10" onClick={handleButtonClick} />
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
