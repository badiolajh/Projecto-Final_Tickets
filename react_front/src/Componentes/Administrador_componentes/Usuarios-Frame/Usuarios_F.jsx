import { useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";

import UserModal from "../UserModal/UserModal";

function Usuarios_Frame({ user }) {
  // Datos locales, aun no se implementa la API
    const [usuarios] = useState([
      { id: 1, firstName: "Jonathan", lastName: "", email: "Jon123@correo.com", role: "Administrador" },
      { id: 2, firstName: "Adrian", lastName: "", email: "Adrian123@correo.com", role: "Empleado" },
      { id: 3, firstName: "Carlos", lastName: "", email: "C@r10s@correo.com", role: "Tecnico" },
      { id: 4, firstName: "Andres", lastName: "", email: "And7e2@correo.com", role: "Empleado" },
      { id: 5, firstName: "Abril", lastName: "", email: "Abr8211@correo.com", role: "Empleado" },
      { id: 6, firstName: "Maria", lastName: "", email: "M@r1a@correo.com", role: "Empleado" },
    ]);

    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("Todos");

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializa useSearchParams
    const [searchParams, setSearchParams] = useSearchParams();

    // Lee la página desde la URL (o default a 1)
    const paginaActual = parseInt(searchParams.get("page")) || 1;

    const usuariosFiltrados = usuarios.filter((u) => {
      const coincideBusqueda =
        u.firstName.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email.toLowerCase().includes(busqueda.toLowerCase());
      const coincideRol =
        filtroRol === "Todos" || (u.role || "user") === filtroRol.toLowerCase();
      return coincideBusqueda && coincideRol;
    });

    const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina) || 1;

    // Función para cambiar página y actualizar URL
    const cambiarPagina = (nuevaPagina) => {
      setSearchParams({ page: nuevaPagina });
    };

    const indiceUltimo = paginaActual * registrosPorPagina;
    const indicePrimero = indiceUltimo - registrosPorPagina;
    const usuariosPagina = usuariosFiltrados.slice(indicePrimero, indiceUltimo);


  return (
    <div className="contenedor-Opciones">
          <h1 className="Bienvenida">Bienvenid@ <span>{user ? user.username : "Invitad@"}</span></h1>

          <div className="barra-controles">
            <label className="Buscar">
              Buscar
              <input
                type="text"
                placeholder="Escribe aquí..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  cambiarPagina(1);
                }}
              />
            </label>

            <select
              className="select-estado"
              value={filtroRol}
              onChange={(e) => {
                setFiltroRol(e.target.value);
                cambiarPagina(1);
              }}
            >
              <option value="Todos">Todos</option>
              <option value="Administrador">Admin</option>
              <option value="Tecnico">Tecnico</option>
              <option value="Empleado">Empleado</option>
            </select>

            <button className="Boton-Verde" onClick={() => setIsModalOpen(true)}>
                  Agregar Usuario
                </button>
          </div>

          <div className="tarjeta-cabecera">
            <table className="Tabla-Header">
              <thead>
                <tr>
                  <th>Nombre</th><th>Correo</th><th>Rol</th><th className="acciones">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="tarjeta-cuerpo">
            <table className="Tabla-Datos">
                  <tbody>

                    {usuariosPagina.map((u) => (
                      <tr key={u.id}>
                        <td>{u.firstName} {u.lastName}</td>
                        <td>{u.email}</td>
                        <td>{u.role || "user"}</td>
                        <td className="acciones-boton">
                          <button className="btn-editar"><FiEdit /> Editar</button>
                          <button className="btn-eliminar"><FaRegTrashAlt /> Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                    <div className="pie-tabla">
                      <div className="tabla-paginas">
                                <button
                                  disabled={paginaActual === 1}
                                  onClick={() => cambiarPagina(paginaActual - 1)}
                                >&lt;</button>

                                <span> Pág {paginaActual} de {totalPaginas} </span>

                                <button
                                  disabled={paginaActual === totalPaginas}
                                  onClick={() => cambiarPagina(paginaActual + 1)}
                                >&gt;</button>
                              </div>

                              <label>Mostrar:
                                <select
                                  value={registrosPorPagina}
                                  onChange={(e) => {
                                    setRegistrosPorPagina(Number(e.target.value));
                                    cambiarPagina(1);
                                  }}
                                >
                                  <option value={5}>5</option>
                                  <option value={7}>7</option>
                                  <option value={10}>10</option>
                                </select> Registros
                              </label>
                            </div>
      </div>
      <UserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Registro de usuario"
          />
        </div>
  )
}

export default Usuarios_Frame;
