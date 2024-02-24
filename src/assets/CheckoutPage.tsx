import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

interface FavoritesPageProps {
  favorites: Product[];
  onRemoveFavorite: (id: number) => void; 
  onAddToCart: (product: Product) => void; // Adicionando a propriedade onAddToCart
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onRemoveFavorite, onAddToCart }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {favorites.map((favorite) => (
        <div key={favorite.id} style={{ margin: '10px', textAlign: 'center' }}>
          <div onClick={() => onRemoveFavorite(favorite.id)}> 
            <img src={favorite.image} alt={favorite.name} style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <p>{favorite.name}</p>
            <p>Preço: R$ {favorite.price}</p>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => onAddToCart(favorite)} style={{ marginRight: '10px' }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Comprar
            </button>
            <button onClick={() => onRemoveFavorite(favorite.id)}>
              <FaHeart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
