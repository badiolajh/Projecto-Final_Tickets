import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainGeneral from "../components/MainGeneral";
import "../tecnico.css";

const TecnicoLayout = () => {
  const [opcion, setOpcion] = useState("Dashboard");
  const user = { nombre: "Jonathan", avatar: null };

  return (
    <div className="layout">
      <Header user={user} />
      <div className="layout-body">
        <Navbar onSelect={setOpcion} active={opcion} />
        <div className="main-content">
          <MainGeneral titulo={opcion}>
            {/* Aquí se insertará el contenido dinámico según la opción */}
          </MainGeneral>
        </div>
      </div>
    </div>
  );
};

export default TecnicoLayout;
