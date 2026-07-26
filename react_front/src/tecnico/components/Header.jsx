import React from "react";

const Header = ({ user }) => {
  return (
    <header className="flex justify-between items-center bg-[#242424] text-white px-6 py-3">
      {/* Logo */}
      <div className="text-[#0BC20B] font-bold text-xl">SoportITO</div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        className="bg-gray-700 text-white px-3 py-1 rounded-md w-1/3"
      />

      {/* Iconos y perfil */}
      <div className="flex items-center gap-4">
        <button className="text-[#0BC20B]">💬</button>
        <span>{user?.nombre || "Técnico"}</span>
        {user?.avatar ? (
          <img src={user.avatar} alt="Perfil" className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">👤</div>
        )}
      </div>
    </header>
  );
};

export default Header;
