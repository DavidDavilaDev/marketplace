import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './navbar/Header';
import SideNav from './navbar/SideNav';
import Footer from './navbar/Footer';
import './estilos.css'
import ProductForm from './forms/Agregarmenu';
import EditarProducto from './forms/EditarProducto';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';


function Menu() {

  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [comentarios, setComentarios] = useState('');
  const [totalPedido, setTotalPedido] = useState(0);



  const [productoscargados, setProductosFiltrados] = useState([]);


  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

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

  const token = user?.token;

  useEffect(() => {
    if (token) {
      // Realizar la solicitud utilizando el token
      const fetchProductos = async () => {
        try {
          const response = await axios.get('https://marketplace-rose-three.vercel.app/api/productos', {
            headers: {
              'x-access-token': `${token}`
            }
          });
          setProductos(response.data);
        } catch (error) {
          console.error('Error al obtener datos de empleados:', error);
        }
      };

      fetchProductos();
    }
  }, [token]);

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

      if (selectedProduct && selectedProduct.id === 16) {
        console.log("ID 16 detected"); // Verifica si se cumple la condición
        setCantidad(3);
        setComentarios(Array(3).fill(''));
      }
    }, 2000); // Simulando una carga de 2 segundos (puedes ajustar este tiempo)

    // Este efecto se ejecuta solo una vez al montar el componente
  }, []);

  const handleGuisosChange = (e, index) => {
    const updatedComentarios = [...comentarios];
    updatedComentarios[index] = e.target.value;
    setComentarios(updatedComentarios);
  };

  const agregarAlPedido = () => {
    if (selectedProduct) {
      const nuevoPedido = {
        producto: selectedProduct,
        cantidad: cantidad,
        comentarios: comentarios,
      };

      if (selectedProduct.tipo_producto === 'comida' & selectedProduct.resena_producto === 'Deshebrada, Prensado, Picadillo rojo/verde, Discada, Frijoles c/queso, Rajas c/queso, Bistek') {
        if (comentarios === '' || comentarios === '') {
          Swal.fire({
            icon: 'info',
            title: 'Verifica todos los campos',
            showConfirmButton: false,
            timer: 2000,
          })
          return;
        }
      }

      setPedidos([...pedidos, nuevoPedido]);

      // Actualizar el total del pedido al agregar un nuevo producto
      const precioProducto = selectedProduct.precio_producto;
      const totalProducto = precioProducto * cantidad;
      setTotalPedido(totalPedido + totalProducto);




      // Limpiar los campos después de agregar al pedido
      setSelectedProduct(null);
      setCantidad(1);
      setComentarios('');
    }



    // Cerrar la ventana modal después de agregar el pedido
    document.getElementById('agregarProductoModal');
  };

  const seleccionarProducto = (producto) => {
    setSelectedProduct(producto);
    // Abrir la ventana modal
    document.getElementById('agregarProductoModal');
  };

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
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <h1 className="text-center ">Menu</h1>
            <div className="row">

              <div className="col-md-8 offset-md-2">
              </div>
            </div>
          </div>
          {user && user.rol === 'admin' && (
            <div className='text-right'>
              <button type="button" class="btn btn-outline-success " data-toggle="modal" data-target="#modal-menu">
                Agregar producto al Menu
              </button>
              {' '}


            </div>
          )}
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
          <div className="container">
            <div class="container-card_propia">

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
              ) : (

                productosFiltrados.map((productos, index) => (
                  <div class="card_propia">
                    <div key={index} class="contenido-card_propia">
                      <h3>{productos.nombre_producto}</h3>
                      <h5>{productos.precio_producto}</h5>
                      <img src={`https://marketplace-rose-three.vercel.app/img/${productos.ruta_foto}`}></img>
                      {productos.tiempo_espera === 0 ? (
                        <h5>Tiempo de espera aprox: de inmediato</h5>
                      ) : (
                        <h5>Tiempo de espera aprox: {productos.tiempo_espera}min</h5>
                      )}
                      {productos.resena_producto === 'otro' ? (
                        <p></p> // Aquí podrías poner el contenido que deseas mostrar si resena_producto es 'otro'
                      ) : (
                        <p>{productos.resena_producto}</p>
                      )}
                      {user && user.rol === 'cliente' && (
                        <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#agregarProductoModal" onClick={() => seleccionarProducto(productos)}>
                          <i className='fas fa-cart-plus fa-lg mr-2'></i>Añadir
                        </button>
                      )}
                      {user && user.rol === 'admin' && (
                        <button type="button" class="btn btn-outline-info " data-toggle="modal" data-target="#modal-editar">
                          Editar Producto
                        </button>
                      )}
                      
                    </div>
                  </div>


                )))}


              {/* agregar mas card*/}

              <h1 style={{ padding: '50px', color: 'transparent' }} >a</h1>
            </div>
            { /*   Cotaier  */}
          </div>



        </div>

      </div>








      <div class="modal lg fade" id="modal-menu">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Agregar Producto</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ProductForm />
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>

      </div>



      <div class="modal lg fade" id="modal-editar">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Agregar Producto</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <EditarProducto />
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>

      </div>





      <div className='modal' id='agregarProductoModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Agregar Producto al Pedido</h4>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
            </div>
            <div className='modal-body'>
              {selectedProduct && (
                <div>
                  <h5>{selectedProduct.nombre_producto}</h5>
                  <p>Precio: ${selectedProduct.precio_producto}</p>
                  <label>Cantidad:</label>
                  <div className="input-group">

                    <input
                      type='number'
                      value={cantidad}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCantidad(value > 0 && value <= 20 ? value : 1);
                      }}
                      className='form-control'
                      min="1"
                      max="20"
                      required
                    />
                    <div className="input-group-append">
                      {/* Botón para incrementar la cantidad */}
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setCantidad((prevCantidad) => (prevCantidad < 20 ? prevCantidad + 1 : prevCantidad))}
                      >
                        +
                      </button>
                    </div>
                    <div className="input-group-prepend">
                      {/* Botón para decrementar la cantidad */}
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  {selectedProduct.tipo_producto === 'comida' & selectedProduct.resena_producto === 'Deshebrada, Prensado, Picadillo rojo/verde, Discada, Frijoles c/queso, Rajas c/queso, Bistek' && (
                    <div>
                      <label>Guisos:</label>
                      {[...Array(parseInt(cantidad))].map((_, index) => (
                        <select
                          value={comentarios[index] || ''}
                          onChange={(e) => handleGuisosChange(e, index)}
                          placeholder='Agrega comentarios (opcional)'
                          className='form-control'
                          required>
                          <option value="">Selecciona el Guiso de tu preferencia</option>
                          <option value="Deshebrada-" >Deshebrada</option>
                          <option value="Prensado-" >Prensado</option>
                          <option value="Picadillo Rojo-" >Picadillo Rojo</option>
                          <option value="Picadillo Verde-" >Picadillo Verde</option>
                          <option value="Discada-" >Discada</option>
                          <option value="Frijoles c/queso-" >Frijoles c/queso</option>
                          <option value="Rajas c/queso-" >Rajas c/queso</option>
                          <option value="Bistek-" >Bistek</option>
                        </select>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={agregarAlPedido}>
                Agregar al Pedido
              </button>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer pedidos={pedidos} totalPedido={totalPedido} setPedidos={setPedidos} setTotalPedido={setTotalPedido} />


    </div>
  );
}

export default Menu;
