import React from "react";

const ButtonBitppi = ({ styles }) => {
  // Función que maneja el clic en el botón
  const handleClick = () => {
    window.open("https://wa.link/tsh6bx", "_blank");
  };

  return (
    <button 
      type="button" 
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      onClick={handleClick}  // Agregando el manejador de eventos onClick
    >
      WhatsApp
    </button>
  );
};

export default ButtonBitppi;
