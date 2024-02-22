import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  quantity: number; 
}

interface ProductDetailsPageProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ products, handleAddToCart }) => {
    const { productId } = useParams<{ productId?: string }>();
    const parsedProductId = productId ? parseInt(productId) : undefined;
    const product = parsedProductId !== undefined ? products.find((p) => p.id === parsedProductId) : undefined;
  
    if (!product) {
      return <div>Produto não encontrado!</div>;
    }
  
    const handleClickAddToCart = () => {
      handleAddToCart(product);
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px', width: '900px', height: '52%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <img src={product.image} alt={product.name} style={{ width: '450px', height: '450px', marginRight: '20px' }} />
            <div>
              <h2>{product.name}</h2>
              <p>Preço: R$ {product.price}</p>
              <button
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                onClick={handleClickAddToCart}
              >
                Comprar
              </button>
            </div>
          </div>
          <p>{product.description}</p>
        </div>
      </div>
    );
  };

export default ProductDetailsPage;
