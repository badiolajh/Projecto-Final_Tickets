import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainGeneral from "../components/MainGeneral";

const TecnicoLayout = () => {
  const [opcion, setOpcion] = useState("Dashboard");
  const user = { nombre: "Jonathan", avatar: null };

  return (
    <div className="h-screen flex flex-col">
      <Header user={user} />
      <div className="flex flex-1">
        <Navbar onSelect={setOpcion} />
        <MainGeneral titulo={opcion}>
          {/* Aquí se insertará el contenido dinámico según la opción */}
        </MainGeneral>
      </div>
    </div>
  );
};

export default TecnicoLayout;
