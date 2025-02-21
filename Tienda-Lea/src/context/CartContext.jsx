import { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Si deseas persistir el carrito en localStorage, puedes usar un effect:
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está, aumentamos la cantidad
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si no existe en el carrito, lo agregamos con la cantidad seleccionada
      setCartItems((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Actualizar cantidad (botones + y - en el carrito)
  const updateQuantity = (id, delta) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      })
    );
  };

  // Vaciar el carrito (por ejemplo, al finalizar compra)
  const clearCart = () => {
    setCartItems([]);
  };

  // Cantidad total de productos (para mostrar en CartWidget)
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cálculo de total $ (opcional, si tienes un campo precio numérico en DB)
  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(item.precio); // asumiendo que precio viene como string "100"
    return acc + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsInCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};