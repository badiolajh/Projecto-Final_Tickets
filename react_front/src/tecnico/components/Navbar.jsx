import React from "react";

const Navbar = ({ onSelect }) => {
  const opciones = ["Dashboard", "Incidencias", "Historial", "Redes", "Cerrar sesión"];

  return (
    <nav className="bg-[#242424] text-white w-56 h-full flex flex-col p-4">
      {opciones.map(op => (
        <button
          key={op}
          onClick={() => onSelect(op)}
          className="text-left py-2 px-3 hover:bg-[#09A109] rounded-md"
        >
          {op}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
