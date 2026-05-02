// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react"; 
import { NavBar } from "./components/navPanel/NavBar";
import { Banner } from "./components/hero/Banner";
import { Skills } from "./components/skills/Habilidades";
import { Projects } from "./components/projectGallery/Projectos";
import { Contact } from "./components/messageHub/Contacto";
import { Footer } from "./components/footerHub/Footer";
import { BottomNav } from "./components/navPanel/BottomNav";
import { FondoTrueno } from "./components/fxHub/trueno";
import { Asistente } from "./components/chat/asistente";
import { WaterWrapper } from "./components/fxHub/WaterWrapper";

export const App = () => {
  useEffect(() => {
    console.log(`%c
       _____
    ___|[]|_n__n_I_c____________
   |___||__|###|____}===========>
    O-O--O-O+++--O-O
   ******************************************
   *                                        *
   *           Bienvenido a bordo?          *
   *                                        *
   *            Trabajemos juntos?          *
   *                                        *
   *        ¡Iniciando motor backend...     *
   *           Rutas API listas             *
   *        Base de datos conectada,        *
   *    Modelos de IA automático cargados   *
   *                                        *
   *        https://bit.ly/devwrmaxx        *
   *                                        *
   ******************************************
  `,
      "color: #ffffffff; font-family: monospace; font-size: 13px; line-height: 1.1;"
    );
  }, []);

return (
    <Router>
      <div className="App">
        <NavBar />
        <WaterWrapper>
          <Banner />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </WaterWrapper>
        <BottomNav />
        <FondoTrueno />
        <Asistente />
      </div>
    </Router>
  );
};