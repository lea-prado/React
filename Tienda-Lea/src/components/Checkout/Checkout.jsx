import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.nombre || !buyer.email || !buyer.telefono) {
      alert('Por favor completa todos los campos');
      return;
    }

    const order = {
      buyer,
      items: cartItems,
      total: totalPrice,
      date: serverTimestamp()
    };

    try {
      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-container">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={buyer.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={buyer.telefono}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;