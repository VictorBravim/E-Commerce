import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetailsPage from './assets/ProductDetailsPage';

// Defina o tipo Product com a propriedade description
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; 
  description?: string; // Propriedade description opcional
}

const App: React.FC = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleCartClick = () => {
    setCartVisible(!cartVisible);
  };

  const handleAddToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity--;

    if (updatedCartItems[index].quantity === 0) {
      updatedCartItems.splice(index, 1);
    }

    setCartItems(updatedCartItems);
  };

  const handleCloseCart = () => {
    setCartVisible(false);
  };

  const products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, image: "/img/teste.webp", quantity: 0 },
    { id: 2, name: 'Produto 2', price: 15, image: "/img/teste.webp", quantity: 0 },
    { id: 3, name: 'Produto 3', price: 20, image: "/img/teste.webp", quantity: 0 }
  ];

  return (
    <Router>
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
    
        {cartVisible && (
          <div className="fixed top-16 right-0 h-full w-1/3 bg-white z-50 shadow p-4">
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
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-8 h-8 mr-2" />
                    <span>{item.name} - R$ {item.price}</span>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => handleRemoveFromCart(index)} className="text-gray-600 hover:text-gray-800 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAddToCart(item)} className="text-gray-600 hover:text-gray-800 ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Condicional para renderizar o botão de checkout somente se houver itens no carrinho */}
            {cartItems.length > 0 && (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Checkout
              </button>
            )}
          </div>
        )}

        {/* Defina as rotas para a página de detalhes do produto */}
        <Routes>
          <Route path="/produtos/:productId" element={<ProductDetailsPage products={products} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
