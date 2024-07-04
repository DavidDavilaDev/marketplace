import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    const navigate = useNavigate();

    const location = useLocation();




    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem('user');
        if (!isLoggedIn) {
          toast.error('No has iniciado sesión');
          navigate('/');
        }
      }, []);

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

  const handleBandas = () => {

    navigate('/bandas');

  }


    const handleLogout = () => {
        // Eliminar los datos del localStorage
        localStorage.removeItem('user');
    
        // Mostrar alerta utilizando react-toastify
        toast.info('Se cerró la sesión');
    
        // Redireccionar al inicio de sesión u otra página
        navigate('/'); // Redirige al componente de inicio de sesión
      };

      const handleHome = () => {
        navigate('/home');
      }

      

      const isLinkActive = (path) => {
        return location.pathname === path;
      };


  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };
    return (

      <div className="hold-transition sidebar-mini layout-fixed">
  <div className="wrapper">
    {/* Preloader */}
    <div className="preloader flex-column justify-content-center align-items-center">
      <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
    </div>
    {/* Navbar */}
    
    {/* /.navbar */}
    {/* Main Sidebar Container */}
    
    {/* Content Wrapper. Contains page content */}
   
    {/* /.content-wrapper */}
    
    {/* /.control-sidebar */}
  </div>
  {/* ./wrapper */}
  {/* jQuery */}
</div>


      );
    }
    
    export default Navbar;