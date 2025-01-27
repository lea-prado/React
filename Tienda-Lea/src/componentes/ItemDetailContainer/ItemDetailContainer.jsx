import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css';


const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productosMock = [
      { id: 1, nombre: 'Producto A', precio: '$100', descripcion: 'Descripción del Producto A', quantity: 1 },
      { id: 2, nombre: 'Producto B', precio: '$150', descripcion: 'Descripción del Producto B', quantity: 1 },
      { id: 3, nombre: 'Producto C', precio: '$200', descripcion: 'Descripción del Producto C', quantity: 1 },
    ];

    const productoEncontrado = productosMock.find((prod) => prod.id === parseInt(itemId));
    setTimeout(() => setProducto(productoEncontrado), 1000);
  }, [itemId]);

  const agregarAlCarrito = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productoExistente = savedCart.find((item) => item.id === producto.id);

    if (productoExistente) {
      productoExistente.quantity += 1;
    } else {
      savedCart.push({ ...producto, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert('Producto añadido al carrito');
  };

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="item-detail-container">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><strong>{producto.precio}</strong></p>
      <button onClick={agregarAlCarrito}>Agregar al Carrito</button>
    </div>
  );
};

export default ItemDetailContainer;
