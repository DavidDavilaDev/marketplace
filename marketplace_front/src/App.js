import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { setupIonicReact } from '@ionic/react';
import Login from './view/Login';
import Home from './components/Home';
import Menu from './components/Menu';
import Empleados from './components/Empleados';
import Usuarios from './components/Usuarios';
import CrearCuenta from './components/Inicio/CrearCuenta';
import Example from './components/forms/prueba';
function App() {
  setupIonicReact();
  return (
    <>
     <Routes>
        <Route
         path="/" element={<Login />}
         />
         <Route
          path="home" element={<Home/>}
        />
        <Route
          path="Menu" element={<Menu/>}
        />
        <Route
          path="empleados" element={<Empleados/>}
        />
        <Route
          path="usuarios" element={<Usuarios/>}
        />
        <Route
          path="Registro" element={<CrearCuenta/>}
        />
        <Route path='prueba' element={<Example />} />
        </Routes>
    </>
  );
}

export default App;
