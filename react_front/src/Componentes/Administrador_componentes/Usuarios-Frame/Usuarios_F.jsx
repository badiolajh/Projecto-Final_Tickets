import { useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import UserModal from "../UserModal/UserModal";
import UserEdit from "../UserEdit/UserEdit";

const rolesMap = {
  1: "Administrador",
  2: "Tecnico",
  3: "Empleado"
};

function Usuarios_Frame({ user }) {
const [usuarios, setUsuarios] = useState([]);
const [cargando, setCargando] = useState(true);

const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
const [busqueda, setBusqueda] = useState("");
const [filtroRol, setFiltroRol] = useState("Todos");

const [isModalOpen, setIsModalOpen] = useState(false);
const [EditUserOpen, ModalEditUsuarioOpen] = useState(false);
const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

const [searchParams, setSearchParams] = useSearchParams();
const paginaActual = parseInt(searchParams.get("page")) || 1;

const obtenerUsuarios = async () => {
    try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

        const response = await axios.get(`${apiUrl}/usuarios`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = response.data;
        setUsuarios(data.data || data);
    } catch (error) {
        console.error("Hubo un error al cargar los usuarios:", error.response?.data || error.message);
    } finally {
        setCargando(false);
    }
};

useEffect(() => {
    obtenerUsuarios();
}, []);


//Funcion para eliminar usaurio
const handleEliminar = async (id) => {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

          await axios.delete(`${apiUrl}/usuarios/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Usuario eliminado correctamente',
            showConfirmButton: false,
            timer: 2000
          });

          // Recargamos la lista de usuarios para reflejar el cambio
          obtenerUsuarios();
        } catch (error) {
          console.error("Error al eliminar usuario:", error.response?.data || error.message);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: error.response?.data?.message || "No se pudo eliminar el usuario.",
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    };

const usuariosFiltrados = usuarios.filter((u) => {
const nombre = u.nombre_completo || "";
const correo = u.correo_electronico || "";
const rolUser = rolesMap[u.id_rol] || "";

const coincideBusqueda =
  nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  correo.toLowerCase().includes(busqueda.toLowerCase());
const coincideRol =
  filtroRol === "Todos" || rolUser.toLowerCase() === filtroRol.toLowerCase();
return coincideBusqueda && coincideRol;
});

const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina) || 1;

const cambiarPagina = (nuevaPagina) => {
  setSearchParams({ page: nuevaPagina });
};

const indiceUltimo = paginaActual * registrosPorPagina;
const indicePrimero = indiceUltimo - registrosPorPagina;
const usuariosPagina = usuariosFiltrados.slice(indicePrimero, indiceUltimo);

  return (
    <div className="contenedor-Opciones">
          <h1 className="Bienvenida">Bienvenid@ <span>{user ? user.username : "Invitad@"}</span></h1>

          <div className="barra-controles-admin">
            <label className="Buscar-admin">
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
                    {cargando ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>Cargando usuarios...</td>
                      </tr>
                    ) : usuariosPagina.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>No se encontraron usuarios.</td>
                      </tr>
                    ) : (
                      usuariosPagina.map((u) => (
                        <tr key={u.id_usuario}>
                          <td>{u.nombre_completo}</td>
                          <td>{u.correo_electronico}</td>
                          <td className="columna-admin">{rolesMap[u.id_rol] || "Desconocido"}</td>
                          <td className="acciones-boton">
                            <button className="btn-editar" onClick={() => {
                              setUsuarioSeleccionadoId(u.id_usuario);
                              ModalEditUsuarioOpen(true);
                            }}><FiEdit /> Editar</button>
                            <button className="btn-eliminar" onClick={() => handleEliminar(u.id_usuario)}><FaRegTrashAlt /> Eliminar</button>
                          </td>
                        </tr>
                      ))
                    )}
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
      <UserEdit
        isOpen={EditUserOpen}
        onClose={() => ModalEditUsuarioOpen(false)}
        usuarioId={usuarioSeleccionadoId}
        onUsuarioActualizado={obtenerUsuarios}
        title="Editar de usuario"
      />
        </div>
  )
}

export default Usuarios_Frame;
