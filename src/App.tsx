import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaBoxes, FaRegHeart } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import ProductDetailsPage from './assets/ProductDetailsPage';
import FavoritesPage from './assets/FavoritesPage';
import CheckoutPage from './assets/CheckoutPage';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const initialFavoriteStatus: { [key: number]: boolean } = {};
    favorites.forEach((favorite) => {
      initialFavoriteStatus[favorite.id] = true;
    });
    setFavoriteStatus(initialFavoriteStatus);
  }, [favorites]);

  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);

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
    setIsCartOpen(false);
  };
  
  const handleAddToFavorites = (product: Product) => {
    const isProductInFavorites = favorites.some((favProduct) => favProduct.id === product.id);

    if (isProductInFavorites) {
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== product.id);
      setFavorites(updatedFavorites);
      setFavoriteStatus({ ...favoriteStatus, [product.id]: false });
    } else {
      setFavorites([...favorites, product]);
      setFavoriteStatus({ ...favoriteStatus, [product.id]: true });
      setIsFavoriteAdded(true);

      setTimeout(() => {
        setIsFavoriteAdded(false);
      }, 1000);
    }
  };

  const handleRemoveFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
  };

  const products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, image: "/img/tenis.png", quantity: 0 },
    { id: 2, name: 'Produto 2', price: 15, image: "/img/tenis.png", quantity: 0 },
    { id: 3, name: 'Produto 3', price: 20, image: "/img/tenis.png", quantity: 0 }
  ];

  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Router>
      <div className="min-h-screen">
        {/* Nav */}
        <nav className="text-black p-8 bg-white" style={{ width: '100%', position: 'fixed', top: 0, zIndex: 999, padding: '10px 10% 0 10%' }}>
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
            <div className="flex items-center space-x-4" style={{ paddingLeft: '5%' }}>
              <Link to="/favoritos" style={{ fontSize: '24px' }}>
                <FaHeart className={isFavoriteAdded ? 'heart-icon animated' : 'heart-icon'} />
              </Link>
              <div className="relative">
                <div style={{ border: '2px solid white', borderRadius: '50%', padding: '10px' }}>
                  <FaShoppingCart style={{ cursor: 'pointer', fontSize: '24px' }} onClick={() => setIsCartOpen(!isCartOpen)} />
                </div>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs" >{cartItemCount}</span>
                )}
                {isCartOpen && (
                  <div className="absolute right-0 mt-8 w-64 bg-white shadow-lg rounded-lg z-10">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center p-2">
                          <div className="flex items-center space-x-2">
                            <img src={item.image} alt={item.name} className="w-8 h-8" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{item.quantity}</span>
                            <button onClick={() => handleRemoveFromCart(index)} className="text-gray-600 hover:text-gray-800">
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
                       <Link to="/checkout">Comprar</Link>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Seção de descrição do produto */}
                <div className="relative h-screen" style={{ marginTop: '8%' }}>
                  <img src="/img/Frame 1.png" alt="Imagem de fundo" className="absolute inset-0 mx-auto object-cover" style={{ borderRadius: '80px', width: '80%', height: '60%', marginTop: '1%' }} />
                  <div className="absolute inset-0 mx-auto flex justify-center items-center" style={{ backgroundColor: '#fff', marginTop: '8%', width: '70%', height: '65%', borderRadius: '80px', opacity: '1' }}>
                    {/* Descrição do Produto */}
                    <div className="container mx-auto w-1/4 text-center text-black">
                      <h2 className="text-2xl font-semibold mb-4">Descrição do Produto</h2>
                      <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque ex ut augue congue.</p>
                    </div>
                    {/* Imagem do Produto */}
                    <div className="flex justify-center items-center w-1/3">
                      <div className="w-50 h-50 rounded-full overflow-hidden" style={{ background: '#' }}>
                        <img src="/img/tenis.png" alt="Imagem" className="object-cover" />
                      </div>
                    </div>
                    {/* Informações adicionais do Produto */}
                    <div className="w-1/3 flex flex-col justify-center items-center">
                      <h2 className="text-2xl font-semibold mb-4">Preço</h2>
                      <p className="text-lg mb-4">R$ 99,99</p>
                      {/* Seletor de cores */}
                      <div className="flex items-center justify-between w-32">
                        <div
                          className={`bg-red-500 w-8 h-8 rounded-full ${selectedColor === 'red' ? 'border-2 border-black' : ''}`}
                          onClick={() => handleColorSelect('red')}
                        ></div>
                        <div
                          className={`bg-blue-500 w-8 h-8 rounded-full ${selectedColor === 'blue' ? 'border-2 border-black' : ''}`}
                          onClick={() => handleColorSelect('blue')}
                        ></div>
                        <div
                          className={`bg-green-500 w-8 h-8 rounded-full ${selectedColor === 'green' ? 'border-2 border-black' : ''}`}
                          onClick={() => handleColorSelect('green')}
                        ></div>
                      </div>
                      <div className="w-1/3 text-center">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                          onClick={() => handleAddToCart({ id: 1, name: 'Produto 1', price: 10, image: "/img/tenis.png", quantity: 0 })}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex" style={{ width: '100%', marginTop: '3.5%' }}>
                    <div className="container mx-auto flex justify-between text-black" style={{ width: '65%' }}>
                      <h1 className="text-3xl mb-4">Comprar</h1>
                      <h1 className="text-4xl font-bold mb-4">Produto</h1>
                      <h1 className="text-3xl mb-4">Proximo</h1>
                    </div>
                  </div>
                </div>
                <section className="container mx-auto py-8" style={{ width: '80%' }}>
                  <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer flex flex-col justify-center items-center">
                        <Link to={`/produtos/${product.id}`} className="block">
                          <img src={product.image} alt={product.name} className="w-64 h-64 mb-4 rounded-lg" />
                          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-600">R$ {product.price}</p>
                        </Link>
                        <div className="flex justify-between w-full items-center mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                          >
                            Comprar
                          </button>
                          <button
                            onClick={() => handleAddToFavorites(product)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                          >
                            {favoriteStatus[product.id] ? <FaHeart /> : <FaRegHeart />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
          {/* rotas */}
          <Route
          path="/produtos/:productId"
          element={<ProductDetailsPage products={products} handleAddToCart={handleAddToCart} handleAddToFavorites={handleAddToFavorites} favoriteStatus={favoriteStatus} />}
        />
          <Route
            path="/favoritos"
            element={<FavoritesPage favorites={favorites} onRemoveFavorite={handleRemoveFavorite} onAddToCart={handleAddToCart} />}
          />
          
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} closeCart={handleCloseCart} />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
