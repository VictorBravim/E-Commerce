import React from 'react';
import { Product } from './contexts/CartContext'; // Importe o tipo Product

interface ProductDetailsProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      {/* Outras informações sobre o produto */}
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
