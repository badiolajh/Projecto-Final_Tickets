import { FaEye } from "react-icons/fa";
import './DashBoardAdmin.css';

const DashBoardAdmin = ({ user }) => {

  const usuariosPagina = [
      { id: 1, firstName: 'Andres', tipo: 'Tipo:Sistemas' },
      { id: 2, firstName: 'Jose', tipo: 'Tipo:Hardware' },
      { id: 3, firstName: 'Juan', tipo: 'Tipo:Redes' },
      { id: 4, firstName: 'Antonio', tipo: 'Tipo:Sistemas' },
      { id: 5, firstName: 'Maria', tipo: 'Tipo:Hardware' },
      { id: 6, firstName: 'Luis', tipo: 'Tipo:Sistemas' },
      { id: 7, firstName: 'Maria', tipo: 'Tipo:Hardware' },
      { id: 8, firstName: 'Luis', tipo: 'Tipo:Redes' },
    ];

  return (
    <div className="contenedor-principal">

      {/* Parte  de arriba */}
      <div className="texto-resumen">
        <h1 className="Bienvenida">Tu resumen <span>{user ? user.username : "Invitad@"}</span></h1>
      </div>
      <div className="contendor-arriba">


        {/* Tarjeta de datos*/}
        <div className='tarjeta-datos'>

          <div className='item-datos'>
            <span className='numero'>23</span>
            <span className='etiqueta'>solicitados</span>
          </div>

          <div className='item-datos'>
            <span className='numero'>3</span>
            <span className='etiqueta'>sin asignar</span>
          </div>

          <div className='item-datos'>
            <span className='numero'>12</span>
            <span className='etiqueta'>en proceso</span>
          </div>

          <div className='item-datos'>
            <span className='numero'>34</span>
            <span className='etiqueta'>resueltos</span>
          </div>
        </div>
      </div>


      {/* Parte de abajo */}
      <div className='contenedor-abajo'>

        {/* Contenedor de Datos de Distribucion*/}
        <div className='contenedor-izquierda'>
          <h2 className='titulo-seccion'>Distribucion</h2>

          <div className="contenedor-metricas">
            <div className='fila-distribucion'>
              <span className='eqtiueta-dist'>Redes :</span>
              <span className='valor-distribucion'>%20</span>
            </div>
            <div className='fila-distribucion'>
              <span className='eqtiueta-dist'>Sistemas :</span>
              <span className='valor-distribucion'>%30</span>
            </div>
            <div className='fila-distribucion'>
              <span className='eqtiueta-dist'>Hardware :</span>
              <span className='valor-distribucion'>%50</ span>
            </div>
          </div>


        </div>

          {/* Contenedor derecha*/}
          <div className='contendor-derecha'>
          <h2 className='titulo-seccion'>Tickets solicitados pendientes</h2>
          <div className="contenedor-tabla-scroll">
            <table className='tabla-solicitudes-pendientes'>

              <tbody>
                          {usuariosPagina.map((u) => (
                            <tr key={u.id}>
                              <td >{u.firstName}</td>
                              <td >{u.tipo}</td>
                              <td className="acciones-boton" style={{ padding: '12px', textAlign: 'right' }}>
                                <button
                                  className="btn-ver"
                                  onClick={() => console.log('Ver ticket:', u.id)}
                                >
                                  <FaEye /> Ver
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
            </table>
          </div>
          </div>
      </div>

    </div>
  );
};

export default DashBoardAdmin;
