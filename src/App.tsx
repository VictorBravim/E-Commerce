// src/App.tsx

import React from 'react';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Minha Loja</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/produtos" className="hover:text-gray-400">Produtos</a></li>
            <li><a href="/contato" className="hover:text-gray-400">Contato</a></li>
          </ul>
        </div>
      </nav>


      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card de exemplo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Produto 1</h3>
            <p className="text-gray-600">Descrição do produto 1</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Comprar</button>
          </div>

          {/* Card de exemplo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Produto 2</h3>
            <p className="text-gray-600">Descrição do produto 2</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Comprar</button>
          </div>

          {/* Card de exemplo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Produto 3</h3>
            <p className="text-gray-600">Descrição do produto 3</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Comprar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
