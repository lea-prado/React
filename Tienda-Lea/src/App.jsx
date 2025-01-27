import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer';
import CartPage from './componentes/CartPage/CartPage'; // Importa el componente del carrito

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenidos al Ecommerce de Lea!" />} />
          <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartPage />} /> {/* Nueva ruta para el carrito */}
          <Route path="*" element={<h2>Página no encontrada (404)</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

