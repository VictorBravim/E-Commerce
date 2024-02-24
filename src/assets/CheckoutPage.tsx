import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CheckoutPageProps {
  cartItems: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    description?: string;
  }[];
  closeCart?: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, closeCart }) => {
  useEffect(() => {
    // Verifica se closeCart está definido antes de chamá-lo
    if (closeCart) {
      // Fecha o carrinho quando o componente é montado
      closeCart();
    }
  }, [closeCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Itens no Carrinho</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 rounded-md" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">R$ {item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Resumo da Compra</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>R$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frete:</span>
            <span>Grátis</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">R$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">Voltar para a Loja</Link>
        <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
