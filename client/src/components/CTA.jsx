import styles from "../style";
import Button from "./Button";

const handleButtonClick = () => {
  window.open("https://bitppi.com", "_blank");
};


const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Empieza con Activos Digitales</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
     Ofrecemos las herramientas y el soporte necesario para que inicies tu viaje en el mundo de los activos.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
    <Button styles="mt-10" onClick={handleButtonClick} />
    </div>
  </section>
);

export default CTA;
