import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import { Product } from './contexts/CartContext'; // Importe o tipo Product

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Suponho que você defina selectedProduct em algum lugar

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      {/* Verifique se selectedProduct não é nulo antes de renderizar ProductDetails */}
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onAddToCart={() => handleAddToCart(selectedProduct)} />
      )}
    </div>
  );
};

export default Cart;
