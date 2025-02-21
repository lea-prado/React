import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
  };

  return (
    <div className="item-count">
      <div className="controls">
        <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement} disabled={quantity >= stock}>+</button>
      </div>
      <button
        className="add-to-cart"
        onClick={handleAddToCart}
        disabled={stock === 0}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ItemCount;