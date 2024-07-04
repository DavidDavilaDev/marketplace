import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Footer({ pedidos, totalPedido, setPedidos, setTotalPedido }) {
 
  const [mostrarPedidos, setMostrarPedidos] = useState(true);
  const [mostrarEnviarPedido, setMostrarEnviarPedido] = useState(false);
  const [mostrarPagarConClip, setMostrarPagarConClip] = useState(false);

  const cancelarPedido = () => {
    // Vaciar la lista de pedidos
    setPedidos([]);
    // Resetear el total del pedido a 0
    setTotalPedido(0);
    setMostrarPagarConClip(false);
    setMostrarEnviarPedido(false);
    Swal.fire({
      icon: 'info',
      title: 'Pedido cancelado con éxito',
      showConfirmButton: false,
      timer: 2000,
    });
  };


  const toggleMostrarPedidos = () => {
    setMostrarPedidos(!mostrarPedidos);
  };

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
  
  // Filtrar los datos
  const pedidosFiltrados = pedidos.map((pedido) => {
    return {
      nombre_producto: pedido.producto.nombre_producto,
      cantidad: pedido.cantidad,
      comentarios: pedido.comentarios
    };
  });
  
  const token = user?.token ;
  const nameuser = user?.nombre + user?.apellidos ;
  const fg = user?._id
  const [tipoPago, setTipoPago] = useState('') 
  const [tipoPagoSeleccionado, setTipoPagoSeleccionado] = useState('');


  const [paymentDetails, setPaymentDetails] = useState('');
  const procesarPagoYAgregarPedido = async () => {
    try {

      const datosParaEnviar = pedidosFiltrados.map(pedidodatos => {
        return {
            nombre_producto: pedidodatos.nombre_producto,
            cantidad: pedidodatos.cantidad,
            comentarios: pedidodatos.comentarios // Convertir el array de comentarios a una cadena separada por comas
        };
    });

// Ahora, puedes parsear este string JSON para obtener un array de objetos
const fechaHora = new Date().toISOString();
const pedidoData = {
  fecha_hora: fechaHora,
  pedido: JSON.stringify(pedidosFiltrados),
  estatus_pedido: 'recibido',
  total_pedido: totalPedido,
  pago: tipoPago,
  fg_usuario: fg,
  // Aquí debes obtener el tipo de pago (efectivo o tarjeta) del usuario
};
      
      const paymentDetails = {
        purchase_description: 'Bebida y alimentos',
        currency: 'MXN',
        amount: `${totalPedido}`,
        metadata: {
          me_reference_id: ` ${user?.id} $ ${JSON.stringify(datosParaEnviar)}`,
          customer_info: {
              name: `${user?.nombre} ${user?.apellidos}`,
              email: user?.correo,
              phone: '',
          }
        },
        redirect_url: {
          success: "https://bufaloscafe.wuaze.com/Menu",
          error: "https://bufaloscafe.wuaze.com/Menu",
          default: "https://bufaloscafe.wuaze.com/Menu",
       },
        override_settings: {
          payment_method: ["CARD"],
        },
      webhook_url: "https://backpacha.vercel.app/api/pedidos/WebHook"
         
        // Asegúrate de ajustar esta estructura según la información requerida por Clip
        // Otros detalles necesarios para el pago, según lo requerido por el SDK de Clip
      };
  
      const response = await fetch('https://backpacha.vercel.app/api/pedidos/agregarPedidoTarjeta', {
        method: 'POST',
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
          // Puedes incluir otros encabezados si son necesarios, como token de autenticación, etc.
        },
        body: JSON.stringify(paymentDetails)
      });
  
      if (response) {
        const responseData = await response.json();
        console.log('Pedido agregado:', responseData);
        window.open(responseData.payment_request_url)

        window.location.href= '/home';
        const paymentUrl = responseData.payment_request_url;
          while (true) {
            try {
              const statusResponse = await fetch(paymentUrl, {
                method: 'GET',
                headers:  
                'Access-Control-Allow-Origin',
                
                // Agrega aquí tu lógica de autenticación para la solicitud a la API de Clip
              });
    
              if (!statusResponse.ok) {
                throw new Error('Network response was not ok');
              }
    
              const statusData = await statusResponse.json();
              console.log('Estado del pago:', statusData.status);
    
              if (statusData.status === 'PAID') {
                console.log('El pago se ha realizado con éxito.');
                enviarPedido();
                break; // Salir del bucle una vez que el pago esté completo
              } else {
                console.log('El pago aún no se ha realizado. Verificando de nuevo en unos segundos...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5 segundos (puedes ajustar este valor)
              }
            } catch (error) {
              console.log(paymentUrl)
              console.error('Hubo un problema con la solicitud:', error);
              break; // Terminar el bucle en caso de error
            }
          }

        
  
        // Manejar la respuesta del servidor (por ejemplo, actualizar la interfaz de usuario, mostrar un mensaje de éxito, etc.)
      } else {
        console.error('Error al agregar el pedido:', response.statusText);
        console.log(paymentDetails)
        // Manejar errores del servidor (mostrar mensaje de error, etc.)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Manejar errores de red u otros errores
    }
  };

    const handlePayment = async () => {
      const fechaHora = new Date().toISOString(); // Obtener fecha y hora actual
    const pedidoData = {
      fecha_hora: fechaHora,
      pedido: JSON.stringify(pedidosFiltrados),
      estatus_pedido: 'recibido',
      total_pedido: totalPedido,
      pago: tipoPago,
      fg_usuario: fg,
      // Aquí debes obtener el tipo de pago (efectivo o tarjeta) del usuario
    };
        try {
            const response = await axios.post('https://backpacha.vercel.app/api/pedidos/pruea', paymentDetails, pedidoData);
            console.log(response.data.message);
            // Manejar la respuesta del pago (puede actualizar el estado, mostrar un mensaje, etc.)
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            // Manejar errores de pago
        }
    };

  
  const handleTipoPagoChange = (event) => {
    setTipoPago(event.target.value); // Actualizar el tipo de pago seleccionado
    setTipoPagoSeleccionado(event.target.value);

    const selectedPaymentMethod = event.target.value;
  
    // Actualizar el tipo de pago seleccionado
    setTipoPagoSeleccionado(selectedPaymentMethod);
  
    // Mostrar u ocultar los botones según el tipo de pago seleccionado
    if (selectedPaymentMethod === 'efectivo') {
      setMostrarEnviarPedido(true);
      setMostrarPagarConClip(false);
    } else if (selectedPaymentMethod === 'tarjeta') {
      setMostrarEnviarPedido(false);
      setMostrarPagarConClip(true);
    } else {
      setMostrarEnviarPedido(false);
      setMostrarPagarConClip(false);
    }
  };

  const enviarPedido = async () => {
    const pedidoData = {
      pedido: JSON.stringify(pedidosFiltrados),
      estatus_pedido: 'RECIBIDO',
      total_pedido: totalPedido,
      pago: tipoPago,
      fg_usuario: fg,
      // Aquí debes obtener el tipo de pago (efectivo o tarjeta) del usuario
    };

    if (tipoPagoSeleccionado === '' || tipoPagoSeleccionado === 'Selecciona tu tipo de pago') {
      Swal.fire({
        icon: 'info',
        title: 'Verifica tu tipo de pago',
        showConfirmButton: false,
    timer:2000,
    })
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/pedidos/agregarPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${token}`
        },
        body: JSON.stringify(pedidoData)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'se agrego tu pedido correctamente',
          showConfirmButton: false,
      timer:2000,
      }).then(function(){
        window.location.href= '/home';
     });
        console.log('Datos enviados correctamente');
        // Aquí podrías realizar alguna acción adicional si la solicitud fue exitosa
      } else {
        console.error('Error al enviar datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  


  return (
    <div>
      <footer
        className='main-footer'
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#f8f9fa',
          padding: '10px'
        }}
      >
        <div style={{ display: mostrarPedidos ? 'block' : 'none' }}>
          {pedidos.length === 0 ? (
            <p>No hay pedidos</p>
          ) : (
            <div>
              <h3>Pedidos:</h3>
              <ul>
              {pedidos.map((pedido, index) => (
  <li key={index}>
    {pedido.producto.nombre_producto} - Cantidad: {pedido.cantidad} - Comentarios: {pedido.comentarios}
  </li>
))}
                <p>Total del pedido: ${totalPedido.toFixed(2)}</p>
                <select
      className="form-control col-md-4"
      name="pago"
      value={tipoPagoSeleccionado}
      onChange={handleTipoPagoChange}
    >
      <option value="">Selecciona tu tipo de pago</option>
      <option value="efectivo">Efectivo</option>
      <option value="tarjeta">Tarjeta</option>
    </select>
    <br/>
    {mostrarPagarConClip && (<div >
            {/* Otros campos del formulario para la información de pago */}
            
            {/* Botón para realizar el pago */}
            <button className="btn" onClick={procesarPagoYAgregarPedido}> 
        <img src="https://assets-global.website-files.com/62588b32d8d6105ab7aa9721/63bf568610f3fdf437235192_Preview.svg" alt="Logo Paga con Clip" />
      </button>
    
      
      </div>
    )}
    
    {/* Botón para enviar pedido */}
    {mostrarEnviarPedido && (
      <button className="btn btn-warning" onClick={enviarPedido}>Enviar Pedido</button>
    )}
    <button className="btn btn-danger ml-2" onClick={cancelarPedido}>Cancelar Pedido</button>
              </ul>
            </div>
          )}
        </div>
        <button onClick={toggleMostrarPedidos} className="btn btn-xs btn-outline-info col-md-4 offset-md-6">
          <i className="fas fa-angle-down fa-lg"> Ocultar/mostrar pedidos</i>
        </button>
      </footer>
    </div>
  );
}

export default Footer;
