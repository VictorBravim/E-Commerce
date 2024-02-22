import React from 'react';

// Defina o tipo Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

// Defina as propriedades esperadas pelo componente FavoritesPage
interface FavoritesPageProps {
  favorites: Product[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites }) => {
  return (
    <div>
      {/* Renderize a lista de favoritos aqui */}
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <div>
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
