import { FaEye } from "react-icons/fa";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import Tick_Finalizado from "../Ver-ticket-finalizado/Ver-finalizado";


function Historial_Frame() {
  // Datos locales, aun no se implementa la API
    const [usuarios] = useState([
      { id: 1, firstName: "Andres", lastName: "", type: "Sistemas", date: "26/07/26" },
      { id: 2, firstName: "Adrian", lastName: "", type: "Redes", date: "18/07/26" },
      { id: 3, firstName: "Jorge", lastName: "", type: "Hardware", date: "16/07/26" },
      { id: 4, firstName: "Jose", lastName: "", type: "Sistemas", date: "08/07/26" },
      { id: 5, firstName: "Abril", lastName: "", type: "Hardware", date: "02/07/26" },
      { id: 6, firstName: "Maria", lastName: "", type: "Redes", date: "28/06/26" },
    ]);

    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("Todos");

  const [Verpendiente, ModaleVerFinalizado]  = useState(false);

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
          <h1 className="tickets-pendientes">Todos tus tickets finalizados!</h1>

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
            </label>

          </div>

          <div className="tarjeta-cabecera">
            <table className="Tabla-Header">
              <thead>
                <tr>
                  <th>Empleado</th><th>Tipo</th><th>Fecha</th><th className="acciones">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="tarjeta-cuerpo">
            <table className="Tabla-Datos">
                  <tbody>

                    {usuariosPagina.map((u) => (
                      <tr key={u.id}>
                        <td>{u.firstName}</td>
                        <td>{u.type}</td>
                        <td className="columna-admin">{u.date}</td>
                        <td className="acciones-boton">
                          <button className="btn-ver-incid" onClick={() => ModaleVerFinalizado(true)}><FaEye /> Ver</button>
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
      {/* Modal de editar Usuario*/}
      <Tick_Finalizado
      isOpen={Verpendiente}
      onClose={() => ModaleVerFinalizado(false)}
      title="Ver Ticket Pendiente"
      />
        </div>
  )
}

export default Historial_Frame;
