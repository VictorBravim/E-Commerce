import React from 'react';
import { useCart, Product } from './contexts/CartContext'; // Importe o hook useCart e o tipo Product

const ProductList: React.FC = () => {
  const { dispatch } = useCart();

  const products: Product[] = [
    // Aqui você teria a lista de produtos disponíveis.
    // Por enquanto, vamos criar alguns produtos fictícios para demonstração.
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };  

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
