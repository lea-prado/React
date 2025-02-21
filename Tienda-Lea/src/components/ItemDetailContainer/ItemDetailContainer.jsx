import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const docRef = doc(db, 'products', itemId);
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducto({ id: snapshot.id, ...snapshot.data() });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return <p>Cargando detalle...</p>;
  }

  if (!producto) {
    return <p>El producto no existe.</p>;
  }

  return (
    <ItemDetail producto={producto} />
  );
};

export default ItemDetailContainer;