// Importa los estilos y los componentes necesarios
import styles from "./style";
import { Routes, Route } from 'react-router-dom';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import PreguntasFrecuentesPersonalizadas from "./components/PreguntasFrecuentesPersonalizadas";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import mariaFoto from "./assets/mariaFoto.jpg"
import Aliados from "./components/Aliados";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import CEO from "./components/CEO";
import FormJuridicos from "./components/FormJuridicos/FormJuridicos";
import FormPersonas from "./components/FormPersonas/FormPersonas";
import KYC from "./components/KYC/KYC"
import AdministradorPanel from "./components/Administrador/AdministradorPanel/AdministradorPanel";


const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <Routes>
      {/* Ruta principal que muestra la página de inicio con todos los componentes */}
      <Route path="/" element={
        <>
          <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Hero />
            </div>
          </div>

          <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Stats />
              <Business />
              <Billing />
              <CardDeal />
              <Testimonials />
              <Aliados />
              <CTA />
            </div>
          </div>
        </>
      } />

      {/* Añadir más rutas aquí */}
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/ceo-fundador" element={<CEO />} />
      <Route path="/preguntas" element={<PreguntasFrecuentesPersonalizadas/>} />
      <Route path="/aliados" element={<Aliados/>} />
      <Route path="/juridicos" element={<FormJuridicos/>} />
      <Route path="/personas" element={<FormPersonas/>} />
      <Route path="/kyc" element={<KYC/>} />
      <Route path="/administrador" element={<AdministradorPanel/>} />
    </Routes>

    {/* Footer presente en todas las rutas */}
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>

    <FloatingWhatsApp
      phoneNumber='+573208289705'
      accountName='Maria Jaimes'
      avatar={mariaFoto}
      statusMessage='Responde inmediatamente'
      chatMessage='Hola! ¿Como puedo ayudarte?'
      notification={true}
    />
  </div>
);

export default App;
