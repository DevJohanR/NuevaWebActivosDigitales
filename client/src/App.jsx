import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import PreguntasFrecuentesPersonalizadas from "./components/PreguntasFrecuentesPersonalizadas";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import mariaFoto from "./assets/mariaFoto.jpg";
import Aliados from "./components/Aliados";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import CEO from "./components/CEO";
import FormJuridicos from "./components/FormJuridicos/FormJuridicos";
import FormPersonas from "./components/FormPersonas/FormPersonas";
import KYC from "./components/KYC/KYC";
import AdministradorPanel from "./components/Administrador/AdministradorPanel/AdministradorPanel";
import Login from "./components/Login/Login";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <Routes>
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
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/ceo-fundador" element={<CEO />} />
        <Route path="/preguntas" element={<PreguntasFrecuentesPersonalizadas />} />
        <Route path="/aliados" element={<Aliados />} />
        <Route path="/juridicos" element={<FormJuridicos />} />
        <Route path="/personas" element={<FormPersonas />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/administrador"
          element={<ProtectedRoute component={AdministradorPanel} isAuthenticated={isAuthenticated} />}
        />
      </Routes>

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
};

export default App;
