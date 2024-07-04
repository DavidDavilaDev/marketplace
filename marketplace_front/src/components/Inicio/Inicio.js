import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InicioNavbar from "./InicioNavbar";

function Inicio(){
  const [productos, setProductos] = useState([]);

  
  const [productoscargados, setProductosFiltrados] = useState([]);


  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  
  
    useEffect(() => {
        // Realizar la solicitud utilizando el token
        const fetchProductos = async () => {
          try {
            const response = await axios.get('https://backbufaloscafe.vercel.app/api/menu/menuInicio');
            setProductos(response.data);
          } catch (error) {
            console.error('Error al obtener datos de empleados:', error);
          }
        };
  
        fetchProductos();
      
    }, []);

    const productosFiltrados = productos.filter(productos => {
      const textoBusqueda = `${productos.tipo_producto}, ${productos.nombre_producto} `.toLowerCase();
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
    return(
      <div>
      <InicioNavbar />

          <div className="">
          <div className='col-md-8 offset-md-2'>
  <div className='row'>
    <div className='col-md-5'>
      <input
        className='form-control'
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
      />
    </div>
    <div className='col-md-2'>
    <h4>Filtrar por:</h4>
    </div>
    <div className='col-md-5'>
      
      <select
        className='form-control'
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      >
        <option value="">Todo</option>
        <option value="comida">Comida/Desayunos</option>
        <option value="bebida">Bebidas</option>
        <option value="fritura">Frituras</option>
        <option value="combo">Combos</option>
      </select>
    </div>
  </div>
</div>

          <div class="container-card_propia" style={{ gridTemplateColumns: '7fr 7fr 7fr 7fr', maxWidth: '100%' }}>

          {loading ? (
        <div className="loader"></div>
      ) : (

      productosFiltrados.map(productos => (
<div class="card_propia">
	<div class="contenido-card_propia">
		<h3>{productos.nombre_producto}</h3>
    <h5>${productos.precio_producto}</h5>
    <img src={`https://backbufaloscafe.vercel.app/img/${productos.ruta_foto}`}></img>
    <h5>Tiempo de espera aprox: {productos.tiempo_espera}min</h5>
    {productos.resena_producto === 'otro' ? (
  <p></p> // Aquí podrías poner el contenido que deseas mostrar si resena_producto es 'otro'
) : (
  <p>{productos.resena_producto}</p>
)}
		<a href="/login"> <i className='fas fa-cart-plus fa-lg mr-2'></i>Añadir</a>
	</div>
</div>


)))}
        {loading && <p className="loading-message">Cargando...</p>}


{/* agregar mas card*/}



</div>
           { /*   Cotaier  */}
          </div>

         
          

          
        </div>
    )
}

export default Inicio;

