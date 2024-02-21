import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
}

// Aqui, o componente ProductDetailsPage é tipado para aceitar a propriedade products
const ProductDetailsPage: React.FC<{ products: Product[] }> = ({ products }) => {
    const { productId } = useParams<{ productId?: string }>();
    const parsedProductId = productId ? parseInt(productId) : undefined;
    const product = parsedProductId !== undefined ? products.find((p) => p.id === parsedProductId) : undefined;
    

  if (!product) {
    return <div>Produto não encontrado!</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Preço: R$ {product.price}</p>
    </div>
  );
};

export default ProductDetailsPage;
