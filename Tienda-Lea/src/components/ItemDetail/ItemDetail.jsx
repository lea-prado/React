import React, { useState, useContext } from 'react';
import '../ItemDetail/ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ItemDetail = ({ producto }) => {
  const { id, nombre, descripcion, precio, stock } = producto;
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useContext(CartContext);

  const handleAdd = (quantity) => {
    // Agregamos al carrito usando el context
    addToCart(producto, quantity);
    setAddedToCart(true);
  };

  return (
    <div className="item-detail-container">
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p><strong>${precio}</strong></p>

      {!addedToCart ? (
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
      ) : (
        <div>
          <Link to="/cart">Ir al Carrito</Link>
          <br />
          <Link to="/">Seguir Comprando</Link>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;