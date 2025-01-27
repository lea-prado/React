import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosMock = [
      { id: 1, nombre: 'Producto A', precio: '$100', categoria: 'ropa' },
      { id: 2, nombre: 'Producto B', precio: '$150', categoria: 'electronica' },
      { id: 3, nombre: 'Producto C', precio: '$200', categoria: 'hogar' },
    ];

    const filteredProductos = categoriaId
      ? productosMock.filter((producto) => producto.categoria === categoriaId)
      : productosMock;

    setTimeout(() => setProductos(filteredProductos), 1000);
  }, [categoriaId]);

  return (
    <div className="item-list-container">
      <h1>{greeting}</h1>
      <div className="product-list">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <h3>{producto.nombre}</h3>
            <p><strong>{producto.precio}</strong></p>
            <button className="details-button">
              <a href={`/item/${producto.id}`}>Ver Detalles</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
