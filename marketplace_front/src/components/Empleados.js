import React, { useState, useEffect } from 'react';
import Header from './navbar/Header';
import SideNav from './navbar/SideNav';
import axios from 'axios';


function Empleados() {

  const [loading, setLoading] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const [empleadoscargados, setEmpleadosFiltrados] = useState([]);


  const [user, setUser] = useState(null);

useEffect(() => {
// Recuperar datos de localStorage
const storedUser = localStorage.getItem('user');

// Verificar si hay datos almacenados
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  setUser(parsedUser);
}
}, []);

const token = user?.token ;

  useEffect(() => {
    if (token) {
      // Realizar la solicitud utilizando el token
      const fetchEmpleados = async () => {
        try {
          const response = await axios.get('https://marketplace-rose-three.vercel.app/api/usuarios', {
            headers: {
              'x-access-token': `${token}`
            }
          });
          setEmpleados(response.data);
        } catch (error) {
          console.error('Error al obtener datos de empleados:', error);
        }
      };

      fetchEmpleados();
    }
  }, [token]);
  

  const empleadosFiltrados = empleados.filter(empleado => {
    const textoBusqueda = `${empleado.nombre} `.toLowerCase();
    return textoBusqueda.includes(busqueda.toLowerCase());
  });

  useEffect(() => {
    // Simulación de carga de datos (reemplaza esto con tu lógica de carga de datos)
    setTimeout(() => {
      const datosCargados = [/* Aquí se cargarían los datos */];
      setEmpleadosFiltrados(datosCargados);
      setLoading(false); // Cambia el estado a false cuando los datos se cargan
    }, 2000); // Simulando una carga de 2 segundos (puedes ajustar este tiempo)
  
    // Este efecto se ejecuta solo una vez al montar el componente
  }, []);



  return (
    <div className='wrapper'>
      <Header />
      <SideNav />
      <div className="content-wrapper">
        <div className="content">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6"></div>
                <div className="col-sm-6"></div>
              </div>
            </div>
          </div>
          <div align="center">
            <h1 className="m-0">Empleados</h1>
          </div>

          <div class="">
  <div class="card card-solid">
    <div class="card-body pb-0">
      <div class="row">

      {loading ? (
        <div className="loader"></div>
      ) : (

      empleadosFiltrados.map(empleados => (
        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
          <div class="card bg-light d-flex flex-fill">
            <div class="card-header text-muted border-bottom-0">
              Digital Strategist
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-7">
                  <h2 class="lead"><b>{empleados.nombre} {empleados.apellidos}</b></h2>
                  <p class="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
                  <ul class="ml-4 mb-0 fa-ul text-muted">
                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address: Demo Street 123, Demo City 04312, NJ</li>
                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #: + 800 - 12 12 23 52</li>
                  </ul>
                </div>
                <div class="col-5 text-center">
                  <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" class="img-circle img-fluid" />
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="text-right">
                <a href="#" class="btn btn-sm bg-teal">
                  <i class="fas fa-comments"></i>
                </a>
                <a href="#" class="btn btn-sm btn-primary">
                  <i class="fas fa-user"></i> View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

)))}
        {loading && <p className="loading-message">Cargando...</p>}
         {/* Iicia seguda tarjeta   */}

        {/* Fi seguda tarjeta   */}
      </div>
    </div>
  </div>
</div>

          { /* Coteido */}

          {/* Alerta */}
        </div>
      </div>
    </div>
  );
}

export default Empleados;
