import React from 'react';
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
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems }) => {
  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>R$ {item.price}</div>
          </div>
        ))}
      </div>
      <div>
        <Link to="/">Voltar para a Loja</Link>
        <button>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
