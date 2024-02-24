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
    <div style={{ marginTop: '8%', backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {favorites.map((favorite) => (
          <li key={favorite.id} style={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', alignItems: 'center' }}>
            <div onClick={() => onRemoveFavorite(favorite.id)} style={{ cursor: 'pointer' }}> 
              <img src={favorite.image} alt={favorite.name} style={{ width: '100px', height: '100px', borderRadius: '10px', marginRight: '20px' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '18px' }}>{favorite.name}</p>
              <p style={{ margin: 0 }}>Preço: R$ {favorite.price}</p>
              <button onClick={() => onRemoveFavorite(favorite.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' }}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
