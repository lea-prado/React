import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <h3>{item.nombre}</h3>
            <p>Precio: {item.precio}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
