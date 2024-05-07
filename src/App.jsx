// Importa los estilos y los componentes necesarios
import styles from "./style";
import { Routes, Route } from 'react-router-dom';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import PanelPages from "./Pages/PanelPages";

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
              <Footer />
            </div>
          </div>
        </>
      } />

      {/* Ruta para el panel que muestra el componente PanelPages */}
      <Route path="/panel" element={<PanelPages />} />
    </Routes>
  </div>
);

export default App;
