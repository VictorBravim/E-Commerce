import React, { useState } from 'react';
import { FaUser, FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import './index.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const App: React.FC = () => {
  const [cartVisible, setCartVisible] = useState(false); // Estado para controlar a visibilidade do carrinho
  const [cartItems, setCartItems] = useState<Product[]>([]); // Estado do carrinho

  const handleCartClick = () => {
    setCartVisible(!cartVisible); // Alternar visibilidade do carrinho
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]); // Adicionar item ao carrinho
  };

  const handleCloseCart = () => {
    setCartVisible(false); // Fechar o carrinho
  };

  // Exemplo de dados de produtos
  const products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, image: "/img/teste.webp" },
    { id: 2, name: 'Produto 2', price: 15, image: "/img/teste.webp" },
    { id: 3, name: 'Produto 3', price: 20, image: "/img/teste.webp" }
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Minha Loja</h1>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="px-10 pl-2 py-1 bg-gray-700 text-white rounded focus:outline-none text-left"
              />
            </div>
          </div>

          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/produtos" className="hover:text-gray-400">Produtos</a></li>
          </ul>
          <div className="flex items-center space-x-4">
            <FaUser />
            <FaHeart />
            <FaShoppingCart onClick={handleCartClick} style={{ cursor: 'pointer' }} />
            <FaSignInAlt />
          </div>
        </div>
      </nav>

      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <img src={product.image} alt={product.name} className="w-full h-100 object-cover mb-4 rounded-lg" />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">R$ {product.price}</p>
              <button onClick={() => handleAddToCart(product)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Comprar</button>
            </div>
          ))}
        </div>
      </section>

      {/* Exibição do Carrinho */}
      {cartVisible && (
        <div className="fixed top-0 right-0 h-full w-1/3 bg-white z-50 shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Carrinho</h2>
            <button onClick={handleCloseCart} className="text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} className="w-8 h-8 mr-2" />
                {item.name} - R$ {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
