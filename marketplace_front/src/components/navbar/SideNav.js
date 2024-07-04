import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

function SideNav (){

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

    return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <span className="brand-text">
                <button className="btn btn-block btn-lg text-left text-white d-lg-none" data-widget="pushmenu" role="button">
                <i className="fas fa-bars" /> Cerrar Menú 
                </button>
            </span>

            {/* Estilos CSS para controlar la visibilidad del botón */}
            <style>
                {`
                    @media (min-width: 992px) {
                        .d-lg-none {
                            display: none !important;
                        }
                    }
                `}
            </style>
            <a className="brand-link ">
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
  <img 
    src="dist/img/artesanal.jpg" 
    className="d-flex flex-column align-items-center" 
    style={{ 
      marginLeft: '15%', 
      width: '60%',
      height: '60%', 
      borderRadius: '60%', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      border: '2px solid #ddd' 
    }} 
  />
</div>

              <div>
                <span className="brand-text font-weight-light ml-2 mt-4">Marketplace Artesanal</span>
              </div>
            </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div>
          <img src={userGoogle?.foto} className="img-circle elevation-2" />
          </div>
          <div className="info">
            <a className="d-block">{user?.nombre} {user?.apellidos}</a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
  <NavLink to="/home" className="nav-link">
    <i className="nav-icon fas fa-tachometer-alt" />
    <p>
      Dashboard
    </p>
  </NavLink>
</li>
<li className="nav-item">
  <NavLink to="/Menu" className="nav-link">
    <i className="nav-icon fas fa-edit" />
    <p>
      Menu
    </p>
  </NavLink>
</li>
{user && user.rol === 'admin' && (
<li className="nav-item">
  <NavLink to="/empleados" className="nav-link">
    <i className="nav-icon fas fa-users" />
    <p>
      Empleados
    </p>
  </NavLink>
</li>
)}
            
            
                
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
    )
}

export default SideNav;