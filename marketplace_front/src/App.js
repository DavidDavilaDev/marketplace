import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { setupIonicReact } from '@ionic/react';
import Login from './view/Login';
import Home from './view/Home';
function App() {
  setupIonicReact();
  return (
    <>
     <Routes>
        <Route
         path="/" element={<Login />}
         />
         <Route path='/Home' element={<Home/>}/>
        </Routes>
    </>
  );
}

export default App;
