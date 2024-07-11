import React from 'react';
import { useEffect, useState } from 'react';
import Header from './navbar/Header';
import SideNav from './navbar/SideNav';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function Home() {

  const [user, setUser] = useState(null);


  const [datosPedidos, setDatosPedidos] = useState([]);

  const [productoscargados, setProductosFiltrados] = useState([]);

  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');



  useEffect(() => {
    // Recuperar datos de localStorage
    const storedUser = localStorage.getItem('user');

    // Verificar si hay datos almacenados
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);



  const token = user?.token;
  const id = user?._id;

  

  useEffect(() => {
    if (token) {
      // Realizar la solicitud utilizando el token

      const fetchProductos = async () => {
        try {
          const response = await axios.get(`https://marketplace-rose-three.vercel.app/api/pedidos/${id}`, {
            headers: {
              'x-access-token': `${token}`
            }
          });
          setDatosPedidos(response.data);
        } catch (error) {
          console.error('Error al obtener datos de empleados:', error);
        }
      };
      fetchProductos();
    }
  }, [token]);

  const productosFiltrados = datosPedidos.filter(datosPedidos => {
    const textoBusqueda = `${datosPedidos.tipo_producto}, ${datosPedidos.nombre_producto} `.toLowerCase();
    return textoBusqueda.includes(busqueda.toLowerCase());
  });

  useEffect(() => {
    // Simulación de carga de datos (reemplaza esto con tu lógica de carga de datos)
    setTimeout(() => {
      const datosCargados = [/* Aquí se cargarían los datos */];
      setProductosFiltrados(datosCargados);
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
            <h1 className="m-0 mb-4">Pedidos</h1>
          </div>
          <div class="container d-flex justify-content-center align-items-center">
    
            <table className='table table-responsive table-hover'>
              <thead>
                <tr>
                  <th scope="col">Pedido</th>
                  <th scope="col">Total Pedido</th>
                  <th scope="col">Tipo de Pago</th>
                  <th scope="col">Estatus Pedido</th>
                  <th scope='col'>Fecha y hora</th>
                  <th scope='col'>Opciones</th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <div>
                  <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="secondary" />
                  <Spinner animation="grow" variant="success" />
                  <Spinner animation="grow" variant="danger" />
                  <Spinner animation="grow" variant="warning" />
                  <Spinner animation="grow" variant="info" />
                  <Spinner animation="grow" variant="dark" />
                  <p className="loading-message">Cargando...</p>
                </div>
              ) :
                (productosFiltrados.map((datosPedidos, index) => (
                  <tr key={index}>
                    {JSON.parse(datosPedidos.pedido).map((pedido, index) => (
                      <tr key={index}>
                        <td>{pedido.nombre_producto}</td>
                        <td>{pedido.cantidad}</td>
                        <td>{pedido.comentarios}</td>
                      </tr>
                    ))}
                    <td>${datosPedidos.total_pedido}</td>
                    <td>{datosPedidos.pago}</td>
                    <td> <select className='form-control' >
                      <option>{datosPedidos.estatus_pedido}</option>
                      <option className="bg-info" >Proceso</option>
                      <option className="bg-success">Entregado</option>
                    </select></td>



                    <td>
  {(() => {
    // Parsea la fecha y hora
    const parsedDateTime = new Date(datosPedidos.fecha_hora);

    // Obtiene el día, mes y año
    const day = parsedDateTime.getUTCDate();
    const monthIndex = parsedDateTime.getUTCMonth();
    const year = parsedDateTime.getUTCFullYear();

    // Nombres de los meses
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    // Obtiene la hora, los minutos y los segundos
    const hours = parsedDateTime.getUTCHours();
    const minutes = parsedDateTime.getUTCMinutes();
    const seconds = parsedDateTime.getUTCSeconds();

    // Agrega un cero delante si los minutos son menores a 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Agrega un cero delante si los segundos son menores a 10
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Formatea la hora en formato de 24 horas
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    // Formatea la fecha y hora en el formato deseado
    const formattedDateTime = `${day} de ${meses[monthIndex]} del ${year} a las ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDateTime;
  })()}
</td>




                    <td><button className='btn btn-outline-danger'><i className='fas fa-trash'></i> Cancelar pedido</button></td>
                  </tr>
                )))}
              </tbody>
            </table>


            { /* Cotenido */}
          </div>

          {/* Alerta */}
        </div>
      </div>
    </div>
  );
}

export default Home;