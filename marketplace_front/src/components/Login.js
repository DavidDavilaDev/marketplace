import React, {useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from "react-bootstrap";
import InicioNavbar from "./Inicio/InicioNavbar";
import { gapi } from "gapi-script";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import Modal from 'react-bootstrap/Modal';
import CrearCuenta from "./Inicio/CrearCuenta";
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

function Login() {

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });
  const [error, setError] = useState('');
  const [usergoogle, setUsergoogle] = useState({});
  const [registeredUsergoogle, setRegisteredUsergoogle] = useState(null);

  const  user = {
    id: 'id_usuarios',
    nombre: 'nombre',
    apellidos: 'apellidos',
    correo: 'correo',
    area: 'area',
    rol: 'rol',
    token: 'token',
    puntos: 'puntos'
  };
    const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Borrar los datos del localStorage al cargar la página de inicio de sesión
    localStorage.clear();
  }, []);


  const key_login = "314717942276-75io8da3tga5ujkbbjn60k4okk6lnrm9.apps.googleusercontent.com";

  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId: key_login,
      });
    }
    gapi.load("client:auth2", start)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (formData.correo !== '' && formData.contrasena !== '' ) {
      loguearUsuario();
    }
  }, [formData]);


  const loguearUsuario = async (e) => {
    try {
      const response = await axios.post('https://backpacha.vercel.app/api/login', formData);
      setRegisteredUsergoogle(response.data);
      setError('');
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        showConfirmButton: false,
        timer: 2000
      }).then(function(){
        window.location.href='/home';
    });

    localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        setError(error.response.data.mensaje)
        
        
        Swal.fire({
          icon: 'error',
          title: 'Tal vez aun no has registrado este correo',
          text: (error.response.data.mensaje) ,
          text: 'Se abrira una ventana para que te registres',
          showConfirmButton: false,
          timer: 3000
        }).then(function(){
        handleShow();
      });
        
      } else {
        setError('Error al registrar el usuario. Por favor, verifica los datos ingresados.');
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesion intenta registrarte',
          showConfirmButton: false,
          timer: 2500
        }).then(function(){
          handleShow();
      });
      }
      
    }
  };

  const logeado_exito = (respuesta_exitosa) => {
    setUsergoogle(respuesta_exitosa.profileObj);
    setFormData({
      ...formData,
      nombre: respuesta_exitosa.profileObj.givenName,
      apellidos: respuesta_exitosa.profileObj.familyName,
      correo: respuesta_exitosa.profileObj.email,
      contrasena: respuesta_exitosa.profileObj.googleId,
    });
  
    // Guardar datos en localStorage
    const userGoogleData = {
      nombre: respuesta_exitosa.profileObj.givenName,
      apellidos: respuesta_exitosa.profileObj.familyName,
      correo: respuesta_exitosa.profileObj.email,
      foto: respuesta_exitosa.profileObj.imageUrl,
    };
    localStorage.setItem('userGoogleData', JSON.stringify(userGoogleData));
  };


  useEffect(() => {
    const storedUserGoogleData = localStorage.getItem('userGoogleData');
    if (storedUserGoogleData) {
      setUsergoogle(JSON.parse(storedUserGoogleData));
    }
  }, []);

  const fallo_login = (res) => 
      {
          console.log("FALLO EN EL ACCESO:",res.profileObj);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las credenciales son erroneas',
            showConfirmButton: false,
            timer: 2000
          })
      }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backbufaloscafe.vercel.app/api/usuarios/login', {
        correo,
        contrasena,
      });

      if (response.status === 200) {
        console.log(response.data); // Mostrar respuesta en la consola

        const roles = response.data.roles;
        // Redireccionar a otra página
        localStorage.setItem('user', JSON.stringify(response.data));
        // Mostrar alerta utilizando react-toastify
        toast.success('Inicio de sesión exitoso', {
          autoClose: 1000,
          onClose: () => {
            // Redireccionar a otra página después de la duración especificada
            navigate('/home');
          },
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error en el inicio de sesión', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div>
      <InicioNavbar show={show} handleShow={handleShow} handleClose={handleClose}  />
        <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
        </div>
        <div className="card">
          <div className="card-body login-card-body">
          <p className="login-box-msg"><img className="login-box-msg" src="dist/img/pacha.jpg" alt="VIDASLOGO" style={{height:'100%', width:'100%'}} /></p>
          
            
        <Form>
      



      <div className="d-flex justify-content-center mb-3"><h3>Ingresar con:</h3> </div>

      <div className="d-flex justify-content-center">
      <GoogleLogin
          clientId={key_login}
          onSuccess={logeado_exito}
          onFailure={fallo_login}
          buttonText="INGRESAR"
          cookiePolicy={'single_host_origin'}
        />

</div>
        <div className={usergoogle ? 'profile' : 'hidden'}>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            hidden
            
          />
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
            hidden
          />
          {/* Otros campos del formulario */}
        </div>
      <ToastContainer />
    </Form>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CrearCuenta />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;