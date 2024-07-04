import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Header(){


  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('user');
    if (!isLoggedIn) {
      toast.error('No has iniciado sesión');
      navigate('/');
    }
  }, []);

  const [user, setUser] = useState(null);

  const [userGoogle, setUserGoogle] = useState(null);

useEffect(() => {
// Recuperar datos de localStorage
const storedUser = localStorage.getItem('user');

// Verificar si hay datos almacenados
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  setUser(parsedUser);
}
}, []);


useEffect(() => {
  // Recuperar datos de localStorage
  const storedUserGoogle = localStorage.getItem('userGoogleData');
  
  // Verificar si hay datos almacenados
  if (storedUserGoogle) {
    const parsedUserGoogle = JSON.parse(storedUserGoogle);
    setUserGoogle(parsedUserGoogle);
  }
  }, []);


  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('user');

    // Mostrar alerta utilizando react-toastify
    toast.info('Se cerró la sesión');

    // Redireccionar al inicio de sesión u otra página
    navigate('/'); // Redirige al componente de inicio de sesión
  };
    return(
        <div>
            <nav className="main-header navbar navbar-expand navbar-dark navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></div>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        {/* Messages Dropdown Menu */}
        
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <div className="nav-link" data-toggle="dropdown" >
          <div className="user-panel"  style={{ position: 'relative', top: '-5px', cursor: 'pointer' }}>
           <div>
          <img src={userGoogle?.foto} className="img-circle elevation-2"  />
          </div>
          </div>
            <span className="badge badge-warning navbar-badge"></span>
          </div>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            
            <div className="dropdown-divider" />
            <div className="dropdown-item">
              <i className="fas fa-lightbulb mr-2" /> Puntos: 
              <span className="float-right text-sm">{user?.puntos}</span>
            </div>
            <div className="dropdown-divider" />
            <li className="nav-item">
            <button className="nav-link btn btn-block btn-danger " type="button" data-toggle="modal" data-target="#modal-default">
            <i class="nav-icon fas fa-user"></i>
            Cerrar Sesión
</button>
          </li>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link" data-widget="fullscreen"  role="button">
            <i className="fas fa-expand-arrows-alt" />
          </div>
        </li>
      </ul>
    </nav>


    <div className="modal fade" id="modal-default">
<div className="modal-dialog">
<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title text-center">¿Estas Seguro de Cerrar Sesión?</h4>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div className="modal-footer justify-content-between">
<button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
<button type="button" class="btn btn-danger" data-dismiss="modal" onClick={handleLogout}>Cerrar Sesion</button>
</div>
</div>

</div>
</div>

        </div>
    )
}

export default Header;