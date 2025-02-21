import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.nombre}</h3>
          <p>Precio: ${item.precio}</p>
          <p>Cantidad: {item.quantity}</p>
          <div className="cart-buttons">
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <div className="cart-actions">
        <button onClick={clearCart}>Vaciar Carrito</button>
        <Link to="/checkout">Finalizar Compra</Link>
      </div>
    </div>
  );
};

export default Cart;