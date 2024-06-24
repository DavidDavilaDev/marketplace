const mongoose = require("mongoose");

const usuariosSchema= new mongoose.Schema({
      nombre:{
        type:String
      },
      apellidos:{
        type:String,
      },
      correo:{
        type:String
      },
      contrasena:{
        type:String
      },
      rol:{
        type:String
      },
      telefono:{
        type:String
      },
      pais:{
        type:String
      },
      estado:{
        type:String
      },
      municipio:{
        type:String
      },
      colonia:{
        type:String
      },
      calle:{
        type:String
      },
      numeroExterior:{
        type:String
      },
      numeroInterior:{
        type:String
      },
      cp:{
        type:String
      },
      infoDomicilio:{
        type:String
      }
});

module.exports = mongoose.model("usuarios", usuariosSchema);