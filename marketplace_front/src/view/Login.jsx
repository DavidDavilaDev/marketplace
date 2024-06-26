import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from "react-bootstrap";
import { gapi } from "gapi-script";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import Modal from 'react-bootstrap/Modal';
import CrearCuenta from "./CrearCuenta";

function Login() {

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(prevState => !prevState);
  };

  const [showAlert, setShowAlert] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formDataRegistro, setFormDataRegistro] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    rol: 'cliente',
    telefono: '',
    pais: '',
    estado: '',
    municipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    cp: '',
    infoDomicilio: ''

  });

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setFormDataRegistro({
      ...formDataRegistro,
      [name]: value
    });
  };


  const [email, setEmail] = useState("");


    const sendEmail = async (e) => {
        e.preventDefault();

        const res = await fetch("https://curriculums-blond.vercel.app/api/correos/recuperacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 401 || !data) {
            console.log("error")
        } else {
            setShow(true);
            setEmail("")
            console.log("Email sent")
        }
    }



  

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://marketplace-rose-three.vercel.app/api/usuarios/', formDataRegistro);


      Swal.fire({
        icon: 'success',
        title: 'Usuario Registrado',
        showConfirmButton: false,
        timer: 2000
      }).then(function () {
        window.location.href = '/';
      });
      // Manejar la respuesta exitosa, por ejemplo, redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de éxito
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el usuario',
        showConfirmButton: false,
        timer: 2000
      })
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };


  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });


  const [formDataLogin, setFormDataLogin] = useState({
    correo: '',
    contrasena: '',
  });



  const [error, setError] = useState('');
  const [usergoogle, setUsergoogle] = useState({});
  const [registeredUsergoogle, setRegisteredUsergoogle] = useState(null);

  const user = {
    id: 'id_usuarios',
    nombre: 'nombre',
    apellidos: 'apellidos',
    correo: 'correo',
    area: 'area',
    rol: 'rol',
    token: 'token',
  };
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Borrar los datos del localStorage al cargar la página de inicio de sesión
    localStorage.clear();
  }, []);


  const key_login = "795141893034-tnnsvgc0vc3nqp2498ueqhalmp32qau7.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
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

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value
    });
  };

  useEffect(() => {
    if (formData.correo !== '' && formData.contrasena !== '') {
      loguearUsuario();
    }
  }, [formData]);


  const loguearUsuario = async (e) => {
    try {
      const response = await axios.post('https://marketplace-rose-three.vercel.app/api/login', formData);
      setRegisteredUsergoogle(response.data);
      setError('');
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        showConfirmButton: false,
        timer: 2000
      }).then(function () {
        window.location.href = '/Home';
      });

      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        setError(error.response.data.mensaje)


        Swal.fire({
          icon: 'error',
          title: 'Tal vez aun no has registrado este correo',
          showConfirmButton: false,
          timer: 3000
        });

      } else {
        setError('Error al registrar el usuario. Por favor, verifica los datos ingresados.');
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el usuario intentalo mas tarde',
          showConfirmButton: false,
          timer: 2500
        }).then(function () {
          window.location.href = '/';
        });
      }

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    try {
      const response = await axios.post('https://marketplace-rose-three.vercel.app/api/login', formDataLogin);

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        showConfirmButton: false,
        timer: 2000
      }).then(function () {
        window.location.href = '/Home';
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      // Manejar la respuesta exitosa
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        showConfirmButton: false,
        timer: 2000
      });
      // Manejar el error
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

  };


  const fallo_login = (res) => {
    console.log("FALLO EN EL ACCESO:", res.profileObj);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las credenciales son erroneas',
      showConfirmButton: false,
      timer: 2000
    })
  }

  const [fontIndex, setFontIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const fonts = ['Arial', 'Verdana', 'Courier New'];
  const colors = ['#3498db', '#e74c3c', '#2ecc71'];
  const [movementDirection, setMovementDirection] = useState(1);
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      setMovementDirection((prevDirection) => -prevDirection);
    }, 3000);

    const intervalId2 = setInterval(() => {
      setIs3D(true);
      setTimeout(() => setIs3D(false), 1000); // Cambia a 3D y vuelve a la normalidad después de 1 segundo
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  const currentFont = fonts[fontIndex];
  const currentColor = colors[colorIndex];

  return (
    <div>
      <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className={`sign-in-form ${isSignUp ? '' : 'active-form'}`} onSubmit={handleSubmit}>
            <h2 className="title">Iniciar sesion</h2>
            <div className="input-field">
            <i class="bi bi-envelope-fill"></i>
              <input type="text" name="correo"
          value={formDataLogin.correo}
          onChange={handleChangeLogin}
          required placeholder="Correo" />
            </div>
            <div className="input-field">
            <i class="bi bi-lock-fill"></i>
              <input name="contrasena"
          value={formDataLogin.contrasena}
          onChange={handleChangeLogin}
          required type="password" placeholder="Contraseña" />
            </div>
            
            <a href="#" onClick={handleShow}>¿Olvidaste tu contraseña?</a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div >
                <div >
                  <h1>Te enviaremos un correo a tu email con instrucciones para restablecer contraseña</h1>
                  <br/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ingresa tu email:</Form.Label>
                            <Form.Control type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={sendEmail}>
                            Enviar
                        </Button>
                    </Form>
                </div>

            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
            <input type="submit" value="Iniciar" className="btn solid" />
            
            <p className="social-text">O iniciar con Google</p>
            <div className="social-media">
            <Form>

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
            </div>
          </form>
          <form className={`sign-up-form ${isSignUp ? 'active-form' : ''}`}onSubmit={handleSubmitRegistro}>
            <h2 className="title">Registro</h2>
            <div className="input-field">
            <i class="bi bi-person-fill"></i>
              <input type="text"
              name="nombre" 
              value={formDataRegistro.nombre} 
              onChange={handleChangeRegistro} 
              placeholder="Nombre" 
              required 
              />
            </div>
            <div className="input-field">
            <i class="bi bi-person-fill"></i>
              <input type="text"
              
              name="apellidos" 
          value={formDataRegistro.apellidos} 
          onChange={handleChangeRegistro}
          placeholder="Apellidos"
          required 
              />
            </div>
            <div className="input-field">
            <i class="bi bi-envelope-fill"></i>
              <input
              type="email" 
              name="correo" 
              value={formDataRegistro.correo} 
              onChange={handleChangeRegistro} 
              placeholder="Correo electrónico" 
              required 
              />
            </div>
            <div className="input-field">
            <i class="bi bi-lock-fill"></i>
              <input type="password" 
              
              name="contrasena" 
          value={formDataRegistro.contrasena} 
          onChange={handleChangeRegistro} 
          placeholder="Contraseña" 
          required  
          />
            </div>
            <input type="submit" className="btn" value="Registrarme" />
            <p className="social-text">O registrate con Google</p>
            <div className="social-media">
            <CrearCuenta />
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nuevo aqui ?</h3>
            <p>
              No te preocupes puedes registrarte dando click en el siguiente boton
            </p>
            <button className="btn transparent" onClick={toggleMode}>
              Registro
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Ya eres usuario ?</h3>
            <p>
              No te preocupes da click al siguiente boton
            </p>
            <button className="btn transparent" onClick={toggleMode}>
              Iniciar Sesion
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>

      {/* Estilos en línea */}
      <style jsx>{`

      * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
      `}</style>
    </div>

    </div>
  );
}

export default Login;