import React from "react";

// Añadir el prop onClick para manejar eventos de clic
const Button = ({ styles, onClick, children = 'Ir a Bitppi' }) => (
  <button 
    type="button" 
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    onClick={onClick}  // Utiliza onClick para permitir la interacción
  >
    {children}
  </button>
);

export default Button;
