// App.tsx

import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaBoxes } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import ProductDetailsPage from './assets/ProductDetailsPage';
import FavoritesPage from './assets/FavoritesPage'; // Importe a página de favoritos

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [cartItems]);

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

  const handleAddToFavorites = (product: Product) => {
    setFavorites([...favorites, product]);
  };

  const products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, image: "/img/teste.webp", quantity: 0 },
    { id: 2, name: 'Produto 2', price: 15, image: "/img/teste.webp", quantity: 0 },
    { id: 3, name: 'Produto 3', price: 20, image: "/img/teste.webp", quantity: 0 }
  ];

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="text-black p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div style={{ border: '2px solid white', borderRadius: '50%', padding: '10px' }}>
                <div style={{ fontSize: '34px' }}><FaBoxes /></div>
              </div>
              <Link to="/"><h1 className="text-xl font-semibold" style={{ fontSize: '34px' }}>FastSale</h1></Link>
            </div>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-400 font-semibold" style={{ fontSize: '24px' }}>Home</Link></li>
              <li><Link to="/produtos" className="hover:text-gray-400 font-semibold" style={{ fontSize: '24px' }}>Produtos</Link></li>
              <li><Link to="/contato" className="hover:text-gray-400 font-semibold" style={{ fontSize: '24px' }}>Contato</Link></li>
            </ul>
            <div className="flex items-center space-x-4">
              <Link to="/favoritos" style={{ fontSize: '24px' }}><FaHeart /></Link>
              <div className="relative">
                <div style={{ border: '2px solid white', borderRadius: '50%', padding: '10px' }}>
                  <FaShoppingCart style={{ cursor: 'pointer', fontSize: '24px' }} onClick={() => setIsCartOpen(!isCartOpen)} />
                </div>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs" >{cartItemCount}</span>
                )}
                {isCartOpen && (
                  <div className="absolute right-0 mt-8 w-64 bg-white shadow-lg rounded-lg">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center p-2">
                          <div className="flex items-center space-x-2">
                            <img src={item.image} alt={item.name} className="w-8 h-8" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{item.quantity}</span>
                            {/* Implementação da função handleRemoveFromCart */}
                            <button onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))} className="text-gray-600 hover:text-gray-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <button onClick={() => handleAddToCart(item)} className="text-gray-600 hover:text-gray-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {cartItems.length > 0 && (
                      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
                        Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="relative h-screen">
          <img src="/img/Frame 1.png" alt="Imagem de fundo" className="absolute inset-0 mx-auto object-cover" style={{ borderRadius: '80px', width: '80%', height: '60%', marginTop: '1%' }} />
          <div className="absolute inset-0 mx-auto flex justify-center items-center" style={{ backgroundColor: '#FFEBC1', marginTop: '6%', width: '70%', height: '65%', borderRadius: '80px', backdropFilter: 'blur(2px)', opacity: '0.8' }}>
            <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full overflow-hidden">
              <img src="/caminho/para/sua/imagem.jpg" alt="Imagem" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 flex" style={{ marginTop: '2%' }}>
            <div className="container mx-auto flex justify-between text-black" style={{ width: '65%' }}>
              <h1 className="text-3xl mb-4">Comprar</h1>
              <h1 className="text-4xl font-bold mb-4">Produto</h1>
              <h1 className="text-3xl mb-4">Proximo</h1>
            </div>
          </div>
        </div>


        <Routes>
          <Route path="/produtos/:productId" element={<ProductDetailsPage products={products} handleAddToCart={handleAddToCart} />} />
          <Route
            path="/favoritos"
            element={<FavoritesPage favorites={favorites} />}
          />
          <Route
            path="/"
            element={
              <div>
                <section className="container mx-auto py-8">
                  <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white p-4 rounded-lg shadow cursor-pointer">
                        <Link to={`/produtos/${product.id}`}>
                          <img src={product.image} alt={product.name} className="w-full h-100 object-cover mb-4 rounded-lg" />
                          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-600">R$ {product.price}</p>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Comprar
                        </button>
                        <button
                          onClick={() => handleAddToFavorites(product)}
                          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          <FaHeart />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
