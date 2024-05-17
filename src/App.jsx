// Importa los estilos y los componentes necesarios
import styles from "./style";
import { Routes, Route } from 'react-router-dom';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import PreguntasFrecuentesPersonalizadas from "./components/PreguntasFrecuentesPersonalizadas";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import mariaFoto from "./assets/mariaFoto.jpg"

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
              <Clients />
              <CTA />
            </div>
          </div>
        </>
      } />

      {/* Añadir más rutas aquí */}
      <Route path="/preguntas" element={<PreguntasFrecuentesPersonalizadas/>} />
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
