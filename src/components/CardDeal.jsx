import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const handleButtonClick = () => {
  window.open("https://bitppi.com", "_blank");
};


const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Activos Digitales <br className="sm:block hidden" /> Para Comerciantes
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Con Bitppi, nuestra revolucionaria pasarela de pago, convertimos tus criptomonedas en pesos de forma segura y eficiente, facilitando la manera de comprar para tus clientes al permitirles comprar
      tus productos con un medio de pago alternativo.
      </p>

      <Button styles="mt-10" onClick={handleButtonClick} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[85%] h-[85%]" />
    </div>
  </section>
);

export default CardDeal;
