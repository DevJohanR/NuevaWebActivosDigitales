import React from 'react';
import Swal from 'sweetalert2';
import styles from "../style";
import logo from "../assets/logoNuevoTrans.png";
import { footerLinks, socialMedia } from "../constants";

const alertMessages = {
  "Ayuda y Soporte": "Si necesitas asistencia o tienes alguna pregunta, no dudes en contactarnos. Estamos aquí para ayudarte en todo momento.",
  "Seguridad Garantizada": "Nuestra plataforma está diseñada con altos estándares de seguridad. Tus activos digitales están protegidos mediante medidas avanzadas de encriptación y autenticación.",
  "Sobre Nosotros": "Somos una empresa dedicada al mundo de los activos digitales. Nuestro equipo está formado por expertos en finanzas digitales y estamos comprometidos con brindarte la mejor experiencia.",
  "Cómo Funciona": "Te explicamos paso a paso cómo operar en nuestra plataforma. Desde la creación de tu cuenta hasta la compra y venta de activos digitales, te acompañamos en todo el proceso.",
  "Compromiso Seguro": "Cumplimos con las regulaciones de prevención de lavado de activos y financiación del terrorismo (SARLAFT). Puedes confiar en que tus transacciones están respaldadas por un entorno seguro."
};


// Función para mostrar SweetAlerts
const showAlert = (name) => {
  const text = alertMessages[name] || "Información no disponible."; // Mensaje por defecto si no se encuentra el nombre
  Swal.fire({
    title: name,
    text,
    icon: 'info',
    confirmButtonText: 'Cerrar'
  });
};

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="logo de la empresa"
          className="w-[266px] h-[72.14px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          Conectando el presente con el futuro financiero. Tu puente hacia la innovación en activos digitales.
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className="flex flex-col ss:my-0 my-4 min-w-[150px]">
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.title === "Preguntas Frecuentes" ? (
                footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                    onClick={() => showAlert(link.name, 'Aquí va el texto que deseas mostrar.')}
                  >
                    {link.name}
                  </li>
                ))
              ) : (
                footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {/* Se mantiene la funcionalidad de enlace externo si existe un link */}
                    {link.link ? (
                      <a href={link.link} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                    ) : (
                      link.name
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2025 Activos Digitales. Todos los Derechos Reservados.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
