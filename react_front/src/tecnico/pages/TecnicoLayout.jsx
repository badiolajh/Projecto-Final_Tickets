import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainGeneral from "../components/MainGeneral";
import "../tecnico.css"; // Importa los estilos globales

const TecnicoLayout = () => {
  const [opcion, setOpcion] = useState("Dashboard");
  const user = { nombre: "Jonathan", avatar: null };

  return (
    <div className="layout">
      {/* Header siempre visible */}
      <Header user={user} />

      {/* Grid principal: navbar + main */}
      <div className="layout-body">
        <Navbar onSelect={setOpcion} />
        <MainGeneral titulo={opcion}>
          {/* Aquí se insertará el contenido dinámico según la opción */}
        </MainGeneral>
      </div>
    </div>
  );
};

export default TecnicoLayout;
