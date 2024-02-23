import React, { useState } from 'react';

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
  // Utilize um conjunto para manter o controle dos IDs já adicionados
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  // Função para adicionar um ID ao conjunto de IDs adicionados
  const addId = (id: number) => {
    setAddedIds((prevIds) => new Set(prevIds).add(id));
  };

  return (
    <div>
      {/* Renderize a lista de favoritos aqui */}
      <ul>
        {favorites.map((favorite) => (
          // Verifica se o ID já foi adicionado antes de renderizar o item
          !addedIds.has(favorite.id) && (
            <li key={favorite.id}>
              {/* Ao clicar em um favorito, adicione o ID aos IDs adicionados */}
              <div onClick={() => addId(favorite.id)}>
                <img src={favorite.image} alt={favorite.name} style={{ width: '100px', height: '100px' }} />
              </div>
              <div>
                <p>{favorite.name}</p>
                <p>Preço: R$ {favorite.price}</p>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
