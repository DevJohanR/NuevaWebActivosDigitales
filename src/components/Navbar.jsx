import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { close, menu } from "../assets";
import logo from "../assets/logoNuevoTrans.png";
import logo2 from "../assets/logo.png";
import sagrilaft from "../assets/sagrilaft.png";
import organigrama from "../assets/organigrama.jpg"
import local from "../assets/local.jpg"
import './Navbar.css'

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  

  // Configuración de las rutas y acciones para cada enlace del menú
  const linkRoutes = {
    "Home": { path: "/", external: false },
    "Sagrilaft": { 
      path: "", 
      external: false, 
      action: () => {
        Swal.fire({
          title: 'Compromiso SAGRILAFT',
          imageUrl: sagrilaft,
          imageWidth: window.innerWidth > 768 ? 400 : 200,
          imageAlt: 'Logo de ACTIVOS DIGITALES S.A.S.',
          html: `
          <p>En la <strong>Organización ACTIVOS DIGITALES S.A.S.</strong>, estamos comprometidos con la puesta en marcha de acciones que permitan tener operaciones comerciales de venta, compra, intermediación y/o custodia de Activos Virtuales, disminuyendo los riesgos frente al Lavado de Activos y/o Financiación del Terrorismo LA/FT.</p>
          <p>Esta necesidad responde a que, en la actualidad, en nuestro país es necesario establecer algunos procedimientos, controles y reportes en las Personas naturales y/o Jurídicas que realicen actividades comerciales con Activos Virtuales (AV), para la prevención de actividades delictivas.</p>
          <p>Ante la amenaza que sobre ellos alza la delincuencia internacional en cualquiera de sus expresiones: terrorismo, lavado de activos, corrupción administrativa, etc., que obliga a que cada vez más numerosos los entes obligados a adoptar medidas de prevención, detección y control del lavado de activos.</p>
          <p>El uso de activos virtuales (AV) en la economía representa un desafío para la prevención y el combate al lavado de activos (LA) y el financiamiento del terrorismo (FT). Colombia no cuenta con una legislación que regule explícitamente los AV. Sin embargo, existen normas generales, como la Ley de Financiamiento (Ley 1943 de 2018), que otorgan beneficios fiscales a las empresas que participan en el desarrollo de valor agregado tecnológico.</p>
          <p>Por su parte, la Unidad de Información y Análisis Financiero (UIAF) emitió la Resolución 314 de 2021, del 15 de diciembre de 2021. Con esta Resolución, la UIAF implementó la obligación de reporte a los proveedores de servicios de activos virtuales. La resolución 314 se aplica a las personas naturales o jurídicas que realicen por cuenta propia o por cuenta de otra persona natural o jurídica actividades u operaciones, cualquiera que sea su cuantía, relacionadas con: 
          <ul>
            <li><strong>a)</strong> Intercambio entre AV y monedas fiduciarias e intercambio de monedas fiduciarias a activos virtuales;</li>
            <li><strong>b)</strong> Intercambio entre una o más formas de AV</li>
            <li><strong>c)</strong> Transferencias de AV;</li>
            <li><strong>d)</strong> Custodia o administración de AV o instrumentos que permitan el control de AV;</li>
            <li><strong>e)</strong> Participación y provisión de servicios financieros relacionados con la oferta o venta de un AV; por parte de un emisor;</li>
            <li><strong>f)</strong> En general, los servicios relacionados con AV.</li>
          </ul>
          </p> 
          
          <p>De este modo, la <strong>Organización ACTIVOS DIGITALES S.A.S.</strong>, establecida como PROVEEDOR DE SERVICIOS DE ACTIVOS VIRTUALES – PSAV ante la Unidad de Información y Análisis Financiero – UIAF e integrante de un sector de economía transaccional formal de nivel nacional e internacional, cuya misión es la de adherirse al compromiso de Colombia con el GAFILAT - Grupo de Acción Financiera de Latinoamérica, para mitigar los riesgos de LA/FT que se presentan en virtud de las operaciones con AV y las actividades que realizamos los PSAV, destacando la importancia de contar con mecanismos de detección, seguimiento, monitoreo y control mediante la puesta en marcha de un SISTEMA DE AUTOCONTROL Y GESTIÓN DEL RIESGO INTEGRAL DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO Y FINANCIAMIENTO DE LA PROLIFERACIÓN DE ARMAS DE DESTRUCCIÓN MASIVA - SAGRILAFT LA/FT/FPADM.</p><p>Por lo anterior y con ocasión de su naturaleza (PSAV); la <strong>Organización ACTIVOS DIGITALES S.A.S.</strong>, aunque NO está obligada a la implementación de un SISTEMA DE AUTOCONTROL Y GESTIÓN DEL RIESGO INTEGRAL DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO Y FINANCIAMIENTO DE LA PROLIFERACIÓN DE ARMAS DE DESTRUCCIÓN MASIVA - SAGRILAFT LA/FT/FPADM, ha decidido de manera voluntaria implementar dicho sistema, que le permita dar cumplimiento a lo establecido en la Resolución 314 de 2021, del 15 de diciembre de 2021 emanada por la Unidad de Información y Análisis Financiero – UIAF y la Circular_100-000016_de_24_de_diciembre_de_2020 de la Superintendencia de Sociedades.</p>
          <p>Es así, como la <strong>Organización ACTIVOS DIGITALES S.A.S.</strong>, mediante su MANUAL DEL SISTEMA DE AUTOCONTROL Y GESTIÓN DEL RIESGO INTEGRAL DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO Y FINANCIAMIENTO DE LA PROLIFERACIÓN DE ARMAS DE DESTRUCCIÓN MASIVA - SAGRILAFT LA/FT/FPADM, estableció medidas, procedimientos y protocolos de “PREVENCIÓN y CONTROL” encaminados a evitar que la Organización sea utilizada por sus grupos de interés para dar imagen de legalidad a dineros provenientes de actividades ilícitas o que dichos recursos financien actividades terroristas.</p>
          `,
          confirmButtonText: 'Entendido',
          width: '90%',
          customClass: {
            popup: 'formatted-text'
          }
        });
      }
    },
    "Organigrama": {
      path: "",
      external: false,
      action: () => {
        Swal.fire({
          title: 'Organigrama de ACTIVOS DIGITALES S.A.S.',
          text: 'Visualiza la estructura organizativa de nuestra empresa.',
          imageUrl: organigrama,
          imageWidth: window.innerWidth > 768 ? '90%' : '300px', // 90% del ancho de la pantalla en desktop
          imageAlt: 'Organigrama',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Ver en Pantalla Completa',
          cancelButtonText: 'Cerrar',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // Crear un nuevo elemento de imagen para mostrar en pantalla completa
            let img = new Image();
            img.src = organigrama;
            img.style.width = '90%'; // Ancho al 90% para evitar distorsión
            img.style.height = 'auto'; // La altura se ajusta automáticamente
            img.style.maxHeight = '100vh'; // Altura máxima de la ventana gráfica
            img.onload = () => {
              // Crear un contenedor para la imagen
              let div = document.createElement('div');
              div.style.position = 'fixed';
              div.style.left = '0';
              div.style.top = '0';
              div.style.width = '100%';
              div.style.height = '100vh';
              div.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
              div.style.zIndex = '9999';
              div.style.display = 'flex';
              div.style.justifyContent = 'center';
              div.style.alignItems = 'center';
              div.appendChild(img);
              
              // Crear un botón de cierre
              let closeButton = document.createElement('button');
              closeButton.innerText = 'X';
              closeButton.style.position = 'absolute';
              closeButton.style.top = '20px';
              closeButton.style.right = '20px';
              closeButton.style.zIndex = '10000';
              closeButton.style.background = 'none';
              closeButton.style.border = 'none';
              closeButton.style.color = 'white';
              closeButton.style.fontSize = '30px';
              closeButton.style.cursor = 'pointer';
              
              // Agregar evento para cerrar la imagen en pantalla completa
              closeButton.addEventListener('click', () => {
                document.body.removeChild(div);
              });
              
              div.appendChild(closeButton);
              
              // Agregar el contenedor al cuerpo del documento
              document.body.appendChild(div);
            };
          }
        });
      }
    },
    
    
    "Contacto": { 
      path: "https://wa.link/tsh6bx", 
      external: true
    },
    "Exchange": { path: "https://intermoneycambios.com/", external: true }
  };
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Esto hará que el desplazamiento sea suave
    });
  };

  const handleLinkClick = (title, linkInfo) => {
    setActive(title);
    if (title === "Home") {
      scrollToTop();
    } else if (linkInfo.external) {
      window.open(linkInfo.path, "_blank");
    } else if (linkInfo.action) {
      linkInfo.action();
    }
  };

  const specialLinkStyle = "border-2 border-gold-500 rounded-lg p-1";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex py-6 items-center justify-center bg-black">
    <div className="flex items-center justify-between w-full max-w-7xl px-1">
      <div className="flex items-center">
        <img src={logo2} alt="Logo 2" className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]" />
        <img src={logo} alt="Logo" className="w-[180px] h-[65px] sm:w-[220px] sm:h-[80px]" />
      </div>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {Object.entries(linkRoutes).map(([title, { path, external }], index) => (
          <li
            key={index}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === title ? "text-white" : "text-dimWhite"
            } ${index === Object.keys(linkRoutes).length - 1 ? "mr-0" : "mr-10"} ${
              title === "Exchange" ? specialLinkStyle : ""
            }`}
            onClick={() => handleLinkClick(title, linkRoutes[title])}
          >
            {external ? <a href={path} target="_blank" rel="noopener noreferrer">{title}</a> : <Link to={path}>{title}</Link>}
          </li>
        ))}
      </ul>
      <div className="sm:hidden flex justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
        <ul className="list-none flex flex-col justify-end items-start flex-1">
          {Object.entries(linkRoutes).map(([title, { path, external }], index) => (
            <li
              key={index}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === title ? "text-white" : "text-dimWhite"
              } ${index === Object.keys(linkRoutes).length - 1 ? "mb-0" : "mb-4"}`}
              onClick={() => handleLinkClick(title, linkRoutes[title])}
            >
              {external ? <a href={path} target="_blank" rel="noopener noreferrer">{title}</a> : <Link to={path}>{title}</Link>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
    
  );
};


export default Navbar;
