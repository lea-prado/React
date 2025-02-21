import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ producto }) => {
  const { id, nombre, precio } = producto;

  return (
    <div className="product-card">
      <h3>{nombre}</h3>
      <p><strong>${precio}</strong></p>
      <Link to={`/item/${id}`} className="details-button">
        Ver Detalles
      </Link>
    </div>
  );
};

export default Item;