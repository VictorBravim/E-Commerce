import React from 'react';

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
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <div onClick={() => onRemoveFavorite(favorite.id)}> 
              <img src={favorite.image} alt={favorite.name} style={{ width: '100px', height: '100px' }} />
            </div>
            <div>
              <p>{favorite.name}</p>
              <p>Preço: R$ {favorite.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
