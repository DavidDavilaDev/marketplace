import React from 'react';
import Navbar from './Navbar';

function Usuarios() {

  return (
    <div align="center">
        <Navbar />
        <div class="content-wrapper">
    <div className="content">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
          </div>{/* /.col */}
          <div className="col-sm-6">
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <div align="center">
    <h1 className="m-0">Usuarios</h1>
    </div>
    {/* /.content */}
  </div>
      </div>
      </div>
  );
}

export default Usuarios;