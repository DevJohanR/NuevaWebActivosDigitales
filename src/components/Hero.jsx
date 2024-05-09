import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import './Hero.css'
import ButtonBitppi from "./ButtonBitppi";





const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`} style={{ paddingTop: '5px' }}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        {/* Responsive text size for the main hero title */}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold 
                        text-[44px] sm:text-[52px] lg:text-[58px] xl:text-[62px] 
                        text-white 
                        leading-[50px] sm:leading-[60px] lg:leading-[68px] xl:leading-[75px]">
            ¡Donde la Tecnologia <br className="sm:block hidden" />
            <span className="text-gradient">y las Finanzas se Encuentran</span>
          </h1>
          <div className="hidden ss:flex md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        {/* Responsive text size for the subtitle */}
        <h1 className="font-poppins font-semibold 
                      text-[44px] sm:text-[52px] lg:text-[58px] xl:text-[62px] 
                      text-white 
                      leading-[50px] sm:leading-[60px] lg:leading-[68px] xl:leading-[75px] w-full">
          con la Seguridad!
        </h1>
        <p className={`${styles.paragraph} paragraph-glow max-w-[470px] mt-5 text-[16px] sm:text-[18px]`}>
          Educación, desarrollo y comercio de criptomonedas. Gracias a nuestra sede física y normativa legal, garantizamos un entorno seguro y profesional para todos nuestros usuarios.
        </p>
      <div className="ctaW">  < ButtonBitppi/></div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
      <img src={robot} alt="billing" className="w-[50%] md:w-[60%] lg:w-[80%] relative z-[5] img-zoom" />
        {/* Gradient overlays */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
