import React from 'react';
import { bill } from "../assets"; // Asegúrate de que la ruta es correcta
import styles, { layout } from "../style";
import ButtonLegal from "./ButtonLegal";
import Swal from 'sweetalert2';
import sagrilaft from "../assets/sagrilaft.png";

const Billing = () => {
  // Definir la función que se ejecutará cuando se haga clic en el botón
  const handleLegalAlert = () => {
    Swal.fire({
      title: 'Compromiso SAGRILAFT',
      imageUrl: sagrilaft,
      imageWidth: window.innerWidth > 768 ? 400 : 200,
      imageAlt: 'Compromiso SAGRILAFT',
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
      <p>Es así, como la <strong>Organización ACTIVOS DIGITALES S.A.S.</strong>, mediante su MANUAL DEL SISTEMA DE AUTOCONTROL Y GESTIÓN DEL RIESGO INTEGRAL DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO Y FINANCIAMIENTO DE LA PROLIFERACIÓN DE ARMAS DE DESTRUCCIÓN MASIVA - SAGRILAFT LA/FT/FPADM, estableció medidas, procedimientos y protocolos de “PREVENCIÓN y CONTROL” encaminados a evitar que la Organización sea utilizada por sus grupos de interés para dar imagen de legalidad a dineros provenientes de actividades ilícitas o que dichos recursos financien actividades terroristas.</p>`,
      confirmButtonText: 'Entendido',
      width: '90%',
      customClass: {
        popup: 'formatted-text'
      }
    });
  };

  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Seguridad Legal en <br className="sm:block hidden" /> Cada Transacción Cripto
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Cumplimos con las normativas SAGRILAFT para asegurar la integridad y seguridad de tus transacciones criptográficas. Protegemos tu inversión con los más altos estándares de seguridad del sector.
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <ButtonLegal onClick={handleLegalAlert} />
        </div>
      </div>
    </section>
  );
};

export default Billing;
