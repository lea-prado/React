import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ItemListContainer = ({ greeting }) => {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productsCollection = collection(db, 'products');
    let q;

    if (categoriaId) {
      q = query(productsCollection, where('categoria', '==', categoriaId));
    } else {
      q = productsCollection;
    }

    getDocs(q)
      .then((res) => {
        const fetchedProducts = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(fetchedProducts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoriaId]);

  return (
    <div className="item-list-container">
      <h1>{greeting}</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ItemListContainer;