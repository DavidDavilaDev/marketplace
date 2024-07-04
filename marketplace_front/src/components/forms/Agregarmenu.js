import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function ProductForm() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const token = user?.token;

    const [productoData, setProductoData] = useState({
        nombre_producto: '',
        precio_producto: '',
        resena_producto: '',
        tiempo_espera: '',
        tipo_producto: '',
        ruta_foto: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoData({
            ...productoData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setProductoData({
            ...productoData,
            ruta_foto: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('nombre_producto', productoData.nombre_producto);
            formData.append('precio_producto', productoData.precio_producto);
            formData.append('resena_producto', productoData.resena_producto);
            formData.append('tiempo_espera', productoData.tiempo_espera);
            formData.append('tipo_producto', productoData.tipo_producto);
            formData.append('foto_producto', productoData.ruta_foto);

            console.log('Submitting product data:', productoData);

            const response = await fetch('http://localhost:4000/api/productos', {
                method: 'POST',
                headers: {
                    'x-access-token': `${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Datos guardados:', data);
                toast.success('¡Producto agregado!', { position: toast.POSITION.TOP_RIGHT });
                window.location.reload();
            } else {
                console.error('Error al guardar los datos:', response.status);
                toast.error('Error al agregar el producto', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            toast.error('Error en la solicitud', { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Nombre del producto:</label>
                <input
                    type="text"
                    name="nombre_producto"
                    value={productoData.nombre_producto}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    className='form-control'
                    required
                />
                <label>Precio del producto:</label>
                <input
                    type="number"
                    name="precio_producto"
                    value={productoData.precio_producto}
                    onChange={handleChange}
                    placeholder="Precio del producto"
                    className='form-control'
                    required
                />
                <label>Reseña del producto:</label>
                <select
                    type="text"
                    name="resena_producto"
                    value={productoData.resena_producto}
                    onChange={handleChange}
                    placeholder="Reseña del producto"
                    className='form-control'
                    required
                >
                    <option value="">Selecciona</option>
                    <option value="Deshebrada, Prensado, Picadillo rojo/verde, Discada, Frijoles c/queso, Rajas c/queso, Bistek">Guisos</option>
                    <option value="Verdes y Rojos c/frijoles" >Chilaquiles sencillos</option>
                    <option value="Verdes y Rojos c/frijoles Guisos: Deshebrada, Prensado, Picadillo rojo/verde, Discada, Frijoles c/queso, Rajas c/queso, Bistek" >Chilaquiles con guiso</option>
                    <option value="Jamon Pollo con chipotle" >Cuernitos</option>
                    <option value="Jamon, Pizza, Salchicha, Peperoni" >Pastes</option>
                    <option value="otro" >otro</option>
                </select>
                <label>Tiempo de espera:</label>
                <select
                    type="number"
                    name="tiempo_espera"
                    value={productoData.tiempo_espera}
                    onChange={handleChange}
                    placeholder="Tiempo de espera"
                    className='form-control'
                    required
                >
                    <option value="">Selecciona</option>
                    <option value="0">Inmediato</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="20" >20 min</option>
                </select>
                <label>Tipo de producto</label>
                <select
                    name="tipo_producto"
                    value={productoData.tipo_producto}
                    onChange={handleChange}
                    placeholder="Tipo de producto"
                    className='form-control'
                    required
                >
                    <option value="">Selecciona</option>
                    <option value="comida">Comida</option>
                    <option value="bebida">Bebida</option>
                    <option value="fritura">Fritura</option>
                </select>
                <label>Ruta de la foto:</label>
                <input
                    className='form-control'
                    type="file"
                    onChange={handleFileChange}
                    required
                />
                <br></br>
                <button type="submit" className='text-right btn btn-primary'>Guardar</button>
            </form>
        </div>
    );
}

export default ProductForm;
