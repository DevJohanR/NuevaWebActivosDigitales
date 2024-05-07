import React from "react";

// Añadir el prop onClick para manejar eventos de clic
const ButtonLegal = ({ styles, onClick }) => (
  <button
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    onClick={onClick} // Agregar manejador de eventos onClick
  >
    Leer Normativa Legal
  </button>
);

export default ButtonLegal;
