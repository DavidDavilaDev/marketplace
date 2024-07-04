import React from "react";
import { gapi } from "gapi-script";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import InicioNavbar from "./InicioNavbar";
import axios from "axios";

function CrearCuenta () {
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    rol: 'cliente',
    puntos: 1
  });

  const [error, setError] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);
  const [user, setUser] = useState({});

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
    if (formData.nombre !== '' && formData.apellidos !== '' && formData.correo !== '' && formData.contrasena !== '' ) {
      registrarUsuario();
    }
  }, [formData]);

  const registrarUsuario = async (e) => {
    try {
      const response = await axios.post('https://backpacha.vercel.app/api/usuarios', formData);
      setRegisteredUser(response.data);
      setError('');
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado ahora inicia sesion correctamente',
        showConfirmButton: false,
        timer: 2000
      }).then(function(){
        window.location.href='/';
    });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        setError(error.response.data.mensaje)
        
        
        Swal.fire({
          icon: 'success',
          title: (error.response.data.mensaje),
          showConfirmButton: false,
          timer: 2000
        }).then(function(){
          window.location.href='/';
      });
        
      } else {
        setError('Error al registrar el usuario. Por favor, verifica los datos ingresados.');
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el usuario intentalo mas tarde',
          showConfirmButton: false,
          timer: 2500
        }).then(function(){
          window.location.href='/Registro';
      });
      }
      
    }
  };
  
  

  const logeado_exito = (respuesta_exitosa) => {
    setUser(respuesta_exitosa.profileObj);
    setFormData({
      ...formData,
      nombre: respuesta_exitosa.profileObj.givenName,
      apellidos: respuesta_exitosa.profileObj.familyName,
      correo: respuesta_exitosa.profileObj.email,
      contrasena: respuesta_exitosa.profileObj.googleId,
    });
    
  };


    const fallo_login = (res) => 
      {
          console.log("FALLO EN EL ACCESO:",res.profileObj);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las credenciales son erroneas',
          })
      }

      const Logout=()=>{
        console.log("SESIÓN TERMINADA"); 
        setUser({});
        Swal.fire({
            icon: 'success',
            title: 'Cerraste Sesion',
          })        
        
      }  
    return(
      <div>

      <form>
        <label>Registrate con Google: </label>
        <GoogleLogin
          clientId={key_login}
          onSuccess={logeado_exito}
          onFailure={fallo_login}
          buttonText="REGISTRAR"
          cookiePolicy={'single_host_origin'}
        />
        <div className={user ? 'profile' : 'hidden'}>
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
      </form>
    </div>
    )
}

export default CrearCuenta;