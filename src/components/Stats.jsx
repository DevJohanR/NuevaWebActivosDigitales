import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stats } from "../constants";
import styles from "../style";

const Stats = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      {stats.map((stat) => (
        <div 
          key={stat.id} 
          className={`flex-1 flex justify-start items-center flex-row m-3 cursor-pointer`}
          onClick={() => handleNavigation(`/${stat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '')}`)}
        >
          <motion.h4 
            className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white"
            variants={textVariant}
            initial="hidden"
            animate="visible"
          >
            {stat.value}
          </motion.h4>
          <motion.p 
            className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3"
            variants={textVariant}
            initial="hidden"
            animate="visible"
          >
            {stat.title}
          </motion.p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
