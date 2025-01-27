import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartWidget.css';

const CartWidget = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = savedCart.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-link">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
          alt="Carrito"
          className="cart-icon"
        />
        <span className="cart-count">{cartCount}</span>
      </Link>
    </div>
  );
};

export default CartWidget;