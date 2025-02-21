import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { totalItemsInCart } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-link">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
          alt="Carrito"
          className="cart-icon"
        />
        {totalItemsInCart > 0 && <span className="cart-count">{totalItemsInCart}</span>}
      </Link>
    </div>
  );
};

export default CartWidget;